import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Home from './pages/Home';
import AcademicFiles from './pages/AcademicFiles';
import NavBar from './components/NavBar'; // Make sure this path is correct

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      {user && <NavBar />} {/* Show NavBar only if user is logged in */}
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/home" element={user ? <Home /> : <Login />} />
        <Route path="/academic-files" element={user ? <AcademicFiles /> : <Login />} />
       
      </Routes>
    </Router>
  );
}

export default App;
