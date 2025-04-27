import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from './firebase'; 

import Landing from './pages/Landing'; 
import Login from './pages/Login';  

function App() {
  const [user, setUser] = useState(null); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); 
      } else {
        setUser(null); 
      }
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} /> 
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/home" element={user ? <Home /> : <Login />} /> 

      </Routes>
    </Router>
  );
}

export default App;
