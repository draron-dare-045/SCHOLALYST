import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import { auth } from '../firebase';

function StudyPlan() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      const db = getDatabase();
      const tasksRef = ref(db, `studyPlans/${auth.currentUser.uid}`);

      onValue(tasksRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedTasks = Object.keys(data).map(key => ({
            id: key,
            ...data[key],
          }));

          // Sort tasks by deadline
          loadedTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
          setTasks(loadedTasks);
        } else {
          setTasks([]);
        }
      });
    }

    // Ask for notification permission
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    // Check deadlines every minute
    const interval = setInterval(checkDeadlines, 60000);
    return () => clearInterval(interval);

  }, []);

  const handleAddTask = () => {
    if (title.trim() !== '' && deadline.trim() !== '') {
      const db = getDatabase();
      const tasksRef = ref(db, `studyPlans/${auth.currentUser.uid}`);

      push(tasksRef, {
        title,
        deadline,
        isComplete: false,
      });

      setTitle('');
      setDeadline('');
    }
  };

  const handleDeleteTask = (taskId) => {
    const db = getDatabase();
    const taskRef = ref(db, `studyPlans/${auth.currentUser.uid}/${taskId}`);
    remove(taskRef);
  };

  const checkDeadlines = () => {
    const now = new Date();

    tasks.forEach(task => {
      if (!task.isComplete) {
        const taskDeadline = new Date(task.deadline);
        const diffMinutes = (taskDeadline - now) / (1000 * 60);

        if (diffMinutes > 0 && diffMinutes <= 10) {
          if (Notification.permission === 'granted') {
            new Notification('⏰ Upcoming Deadline!', {
              body: `${task.title} is due soon!`,
              icon: '/notification-icon.png', // Optional small bell icon
            });
          }
        }
      }
    });
  };

  const isDeadlineClose = (deadline) => {
    const now = new Date();
    const taskDeadline = new Date(deadline);
    const diffMinutes = (taskDeadline - now) / (1000 * 60);
    return diffMinutes > 0 && diffMinutes <= 60; // Within 1 hour
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-indigo-300 p-8"
    style={{ backgroundImage: `url('public/Todo.png')` }}>
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-800">📚 Study Plan</h1>

      {/* Input Section */}
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

      {/* Tasks List */}
      <div className="max-w-4xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
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

              {/* Highlight if deadline is close */}
              {isDeadlineClose(task.deadline) && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                  Soon!
                </span>
              )}

              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-4"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 col-span-2 text-lg font-semibold">No tasks yet. Add one! ✍️</p>
        )}
      </div>
    </div>
  );
}

export default StudyPlan;
