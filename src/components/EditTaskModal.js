import React, { useState, useEffect } from 'react';

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [editedName, setEditedName] = useState(task ? task.name : '');
  const [editedDescription, setEditedDescription] = useState(task ? task.description : '');

  // Update state when the 'task' prop changes (e.g., when a new task is selected for edit)
  useEffect(() => {
    if (task) {
      setEditedName(task.name);
      setEditedDescription(task.description);
    }
  }, [task]);

  const handleSave = () => {
    if (editedName.trim() === '') {
      alert('Task name cannot be empty!'); // Consider a custom modal for real apps
      return;
    }
    onSave({ ...task, name: editedName, description: editedDescription });
    onClose();
  };

  if (!task) return null; // Don't render if no task is provided

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit Task</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Task Description"
          rows="3"
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        ></textarea>
        <button
          onClick={handleSave}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditTaskModal;
