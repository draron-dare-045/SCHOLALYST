// components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, handleDeleteTask, isDeadlineClose }) {
  return (
    <div className="max-w-4xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            handleDeleteTask={handleDeleteTask}
            isDeadlineClose={isDeadlineClose}
          />
        ))
      ) : (
        <p className="text-center text-gray-700 col-span-2 text-lg font-semibold">
          No tasks yet. Add one! 
        </p>
      )}
    </div>
  );
}

export default TaskList;
