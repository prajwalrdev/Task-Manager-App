import React, { useState, useEffect } from 'react';
import * as api from './api'; // Import all functions from the api module
import TaskItem from './components/TaskItem';
import TaskForm from './components/TaskForm';
import EditTaskModal from './components/EditTaskModal';
import TaskBreakdownModal from './components/TaskBreakdownModal';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null); // State to hold the task being edited

  // New states for Gemini API integration
  const [breakingDownTask, setBreakingDownTask] = useState(null); // Task for which breakdown is requested
  const [generatedSubtasks, setGeneratedSubtasks] = useState([]); // LLM generated subtasks
  const [isGeneratingBreakdown, setIsGeneratingBreakdown] = useState(false); // Loading state for LLM call

  // Function to fetch and render tasks
  const refreshTasks = async () => {
    const fetchedTasks = await api.fetchTasks();
    setTasks(fetchedTasks);
  };

  // Initial fetch of tasks when the component mounts
  useEffect(() => {
    refreshTasks();
  }, []);

  const handleAddTask = async (newTaskData) => {
    await api.addTask(newTaskData);
    refreshTasks();
  };

  const handleDeleteTask = async (id) => {
    await api.deleteTask(id);
    refreshTasks();
  };

  const handleEditTask = (task) => {
    setEditingTask(task); // Set the task to be edited
  };

  const handleSaveEditedTask = async (updatedTask) => {
    await api.updateTask(updatedTask.id, updatedTask);
    setEditingTask(null); // Clear editing task
    refreshTasks();
  };

  const handleCloseEditModal = () => {
    setEditingTask(null); // Clear editing task without saving
  };

  // Handler for breaking down a task using Gemini API
  const handleBreakdownTask = async (task) => {
    setBreakingDownTask(task);
    setIsGeneratingBreakdown(true);
    setGeneratedSubtasks([]); // Clear previous subtasks

    const subtasks = await api.generateTaskBreakdown(task.name, task.description);
    setGeneratedSubtasks(subtasks);
    setIsGeneratingBreakdown(false);
  };

  const handleCloseBreakdownModal = () => {
    setBreakingDownTask(null);
    setGeneratedSubtasks([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-5 box-border">
      <div className="container max-w-4xl w-full bg-white rounded-xl shadow-2xl p-8 box-border">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center leading-tight">
          React Task Manager
        </h1>

        <TaskForm onAddTask={handleAddTask} />

        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-5">Your Tasks</h2>
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center text-lg py-8">No tasks yet. Add one above!</p>
            ) : (
              tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onBreakdownTask={handleBreakdownTask} // Pass the new handler
                />
              ))
            )}
          </div>
        </div>

        {editingTask && (
          <EditTaskModal
            task={editingTask}
            onClose={handleCloseEditModal}
            onSave={handleSaveEditedTask}
          />
        )}

        {breakingDownTask && (
          <TaskBreakdownModal
            task={breakingDownTask}
            subtasks={generatedSubtasks}
            isLoading={isGeneratingBreakdown}
            onClose={handleCloseBreakdownModal}
          />
        )}
      </div>
    </div>
  );
};

export default App;
