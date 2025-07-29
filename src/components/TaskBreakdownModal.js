import React from 'react';

const TaskBreakdownModal = ({ task, subtasks, isLoading, onClose }) => {
  if (!task) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Subtasks for: {task.name}</h2>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="ml-4 text-gray-700">Generating subtasks...</p>
          </div>
        ) : (
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {subtasks.length > 0 ? (
              subtasks.map((subtask, index) => (
                <li key={index}>{subtask}</li>
              ))
            ) : (
              <li>No subtasks generated.</li>
            )}
          </ul>
        )}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TaskBreakdownModal;
