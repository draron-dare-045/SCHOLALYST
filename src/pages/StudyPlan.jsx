import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue, remove } from 'firebase/database';
import { auth } from '../firebase';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

function StudyPlanPage() {
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
  }, [tasks]);

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
              icon: '/notification-icon.png',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 mb-8 tracking-wide animate-pulse">
        STUDY PLANS
      </h1>

      {/* Input Section */}
      <div className="w-full max-w-3xl mb-8">
        <TaskInput
          title={title}
          setTitle={setTitle}
          deadline={deadline}
          setDeadline={setDeadline}
          handleAddTask={handleAddTask}
        />
      </div>

      {/* Tasks List */}
      <div className="w-full max-w-3xl">
        <TaskList
          tasks={tasks}
          handleDeleteTask={handleDeleteTask}
          isDeadlineClose={isDeadlineClose}
        />
      </div>
    </div>
  );
}

export default StudyPlanPage;