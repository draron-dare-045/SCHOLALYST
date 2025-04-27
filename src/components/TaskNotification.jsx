// components/TaskNotification.jsx
import React from 'react';

function TaskNotification({ task }) {
  if (Notification.permission === 'granted') {
    new Notification('⏰ Upcoming Deadline!', {
      body: `${task.title} is due soon!`,
      icon: '/notification-icon.png', // Optional icon
    });
  }

  return (
    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
      Soon!
    </div>
  );
}

export default TaskNotification;
