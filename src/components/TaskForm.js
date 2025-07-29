import React, { useState } from 'react';

const TaskForm = ({ onAddTask }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      alert('Task name cannot be empty!'); // Consider a custom modal for real apps
      return;
    }
    onAddTask({ name, description });
    setName('');
    setDescription('');
  };

  return (
    <div className="mb-8 p-6 bg-blue-50 rounded-lg shadow-inner">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Task Description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
