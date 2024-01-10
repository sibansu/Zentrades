// Task3.js
import React, { useState } from 'react';
import './Task3.css';
import logo from '../Assets/download.png';

const Task3 = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateUsername = (username) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(username);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@]+$/;
    return passwordRegex.test(password);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (!validateUsername(username)) {
      setErrorMessage('Invalid username format (must be an email)');
    } else if (!validatePassword(password)) {
      setErrorMessage(
        'Invalid password format. Password must contain at least one uppercase letter, one number, and only allow "@" as a special character.'
      );
    } else {
      setErrorMessage('');
      if (password === 'SmartServTest@123') {
        console.log('Login successful');
        window.location.href = '/dashboard';
      } else {
        setErrorMessage('Incorrect password');
      }
    }
  };
  

  return (
    <div className="homewrapper">
      <div className="formwrapper">
        <img
          src={logo}
          alt=""
          style={{ width: '300px', height: '50px', backgroundColor: 'white', marginBottom: '20px' }}
        />
        <div className="input">
          <input
            className='inputBox'
            type="text"
            placeholder='Username'
            value={username}
            onChange={handleUsernameChange}
          />
          <input
            className='inputBox'
            type="password"
            placeholder='Password'
            value={password}
            onChange={handlePasswordChange}
          />
          <button className="btn" onClick={handleLogin}>
            Login
          </button>
          <span className="create">
            <a href="" className='createBtn'>
              Forgot password?
            </a>
          </span>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Task3;
