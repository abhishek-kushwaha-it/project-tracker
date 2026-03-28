import { useState } from 'react';

export default function Login({ onLogin, onSwitchToSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    // Simulate login - in real app, this would call a backend
    const storedUsers = JSON.parse(localStorage.getItem('project-tracker-users') || '{}');
    
    if (!storedUsers[email]) {
      setError('User not found. Please sign up first.');
      return;
    }

    if (storedUsers[email].password !== password) {
      setError('Invalid password');
      return;
    }

    // Login successful
    const user = {
      email,
      username: storedUsers[email].username,
    };

    localStorage.setItem('project-tracker-current-user', JSON.stringify(user));
    onLogin(user);
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">Project Tracker</div>
        <h2>Login</h2>
        
        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-submit">Login</button>
        </form>

        <p className="auth-toggle">
          Don't have an account? 
          <button 
            type="button" 
            className="auth-toggle-btn" 
            onClick={onSwitchToSignUp}
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
}
