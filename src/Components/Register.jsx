import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Importing 'auth' from firebase.js
import db from '../firebase'; // Importing 'db' as default export from firebase.js
import './Register.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [semester, setSemester] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [cgpa, setCgpa] = useState('');
  const navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        db.collection('students').doc(rollNumber).set({
          name: name,
          rollNumber: rollNumber,
          semester: semester,
          specialization: specialization,
          cgpa: cgpa,
          email: email,
        });
        navigate('/quora');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className='Register'>
      <div className="register-box">
        <h2>Register for PlacEase</h2>
        <form>
          <div className='cred1'>
            <div className="user-box">
            <label>Email Address</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="user-box">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          </div>
          <div className="user-box">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='cred2'>
          <div className="user-box">
            <label>University Roll Number</label>
            <input
              type="text"
              minLength={8}
              maxLength={8}
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
            />
          </div>
          <div className="user-box">
            <label>Semester</label>
            <input
              type="number"
              min={1}
              max={8}
              step={1}
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
          </div>
          </div>
          <div className='cred3'>
          <div className="user-box">
            <label>Specialization</label>
            <input
              type="text"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
          <div className="user-box">
            <label>CGPA</label>
            <input
              type="number"
              value={cgpa}
              max={10}
              min={0}
              step={0.1}
              onChange={(e) => setCgpa(e.target.value)}
            />
          </div>
          </div>
          <button type='submit' onClick={register}>Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
