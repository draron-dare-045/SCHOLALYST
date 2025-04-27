// components/TaskItem.jsx
import React from 'react';
import TaskNotification from './TaskNotification';

function TaskItem({ task, handleDeleteTask, isDeadlineClose }) {
  return (
    <div
      key={task.id}
      className={`relative bg-white p-6 rounded-lg shadow-md transition ${
        isDeadlineClose(task.deadline) ? 'border-2 border-red-400' : ''
      }`}
    >
      <h2 className="text-2xl font-semibold mb-2">{task.title}</h2>
      <p className="text-gray-600 mb-4">
        🕒 {new Date(task.deadline).toLocaleString()}
      </p>

      {/* Show notification if deadline is close */}
      {isDeadlineClose(task.deadline) && <TaskNotification task={task} />}

      <button
        onClick={() => handleDeleteTask(task.id)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-4"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
