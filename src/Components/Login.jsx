import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { auth, provider } from '../firebase';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        setEmail("");
        setPassword("");
        navigate('/quora');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => {
      alert(err.message);
    });
    console.log(auth);
  };

  const signUp = () => {
    navigate('/register');
  };

  return (
    <div className='Login'>
      <div className="login-box">
        <h2>Sign In To PlacEase</h2>
        <form>
          <div className="user-box">
            <label className="label_email" htmlFor="username">Email Address</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="username"
            />
          </div>
          <div className="user-box">
            <label className="label_pass" htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <button type='submit' onClick={login}>Login</button>
          <button type='button' onClick={signUp}>Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
