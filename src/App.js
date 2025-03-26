import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './App.css';

function MainApp({ username }) {
  const [message, setMessage] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((response) => response.json())
      .then((data) => setMessage(data.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input }),
    })
      .then((response) => response.json())
      .then((data) => setMessage(`Server says: ${data.received}`));
  };

  return (
    <div className="app-container">
      <h1>Welcome, {username}!</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            !loggedIn ? 
            <Login setLoggedIn={setLoggedIn} setUsername={setUsername} /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/register" 
          element={
            !loggedIn ? 
            <Register setLoggedIn={setLoggedIn} setUsername={setUsername} /> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/" 
          element={
            loggedIn ? 
            <MainApp username={username} /> : 
            <Navigate to="/login" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;