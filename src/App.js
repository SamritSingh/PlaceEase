import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/counter/userSlice';
import { auth } from './firebase';
import Login from './Components/Login';
import Register from './Components/Register';
import Quora from './Components/Quora';
import StudentDetails from './Components/StudentDetails'; // Import StudentDetails component
import './App.css';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          displayName: authUser.displayName,
          photo: authUser.photoURL,
          email: authUser.email
        }));
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe; // Cleanup subscription on unmount
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/quora" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/quora" /> : <Register />} />
          <Route path="/quora" element={!user ? <Navigate to="/login" /> : <Quora />} />
          <Route path="/studentDetails/:rollNumber" element={<StudentDetails />} /> {/* New route for StudentDetails */}
          <Route path="/" element={user ? <Navigate to="/quora" /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
