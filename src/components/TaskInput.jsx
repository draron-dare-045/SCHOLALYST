// components/TaskInput.jsx
import React from 'react';

function TaskInput({ title, setTitle, deadline, setDeadline, handleAddTask }) {
  return (
    <div className="max-w-xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-lg space-y-4">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />
      <button
        onClick={handleAddTask}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
      >
        ➕ Add Task
      </button>
    </div>
  );
}

export default TaskInput;
