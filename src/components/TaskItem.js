import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, onBreakdownTask }) => {
  return (
    <div className="task-item bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3 flex flex-col gap-2 shadow-sm">
      <div className="task-item-header flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">{task.name}</h3>
        <div className="task-actions flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="edit-button bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="delete-button bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => onBreakdownTask(task)}
            className="breakdown-button bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200"
          >
            ✨ Break Down Task
          </button>
        </div>
      </div>
      <p className="text-gray-700">{task.description}</p>
    </div>
  );
};

export default TaskItem;
