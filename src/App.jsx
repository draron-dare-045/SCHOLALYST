import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Firebase auth instance
import NavBar from './components/NavBar'; // Import NavBar

import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import AcademicFiles from './pages/AcademicFiles';
import UniversityBasket from './pages/UniversityBasket';
import StudyPlan from './pages/StudyPlan'; // Add this if needed

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Set the current user if logged in
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  // Private route component for routing protected pages
  const ProtectedRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" replace />;
  };

  return (
    <Router>
      <NavBar user={user} />  {/* Pass user to NavBar */}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={user ? <Navigate to="/home" replace /> : <Login />} />
        
        {/* Protected routes */}
        <Route 
          path="/home" 
          element={<ProtectedRoute><Home /></ProtectedRoute>} 
        />
        <Route 
          path="/academic-files" 
          element={<ProtectedRoute><AcademicFiles /></ProtectedRoute>} 
        />
        <Route 
          path="/university-basket" 
          element={<ProtectedRoute><UniversityBasket /></ProtectedRoute>} 
        />
        <Route 
          path="/study-plan" 
          element={<ProtectedRoute><StudyPlan /></ProtectedRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
