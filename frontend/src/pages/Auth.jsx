import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();


  const handleAuth = async () => {
    const endpoint = isLogin ? 'login' : 'signup';


    const body = isLogin
      ? { email, password }
      : { email, password, username };


    const res = await fetch(`https://server-5mcy.onrender.com/api/users/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });


    const data = await res.json();


    if (res.ok) {
      localStorage.setItem('zcoder-user-token', data.token);
      localStorage.setItem('zcoder-user-name', data.username || username);
      await login();
      navigate('/profile');
    } else {
      alert(data.message || 'Authentication failed');
    }
  };


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>{isLogin ? 'Login' : 'Sign Up'}</h2>


        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        )}


        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />


        <button onClick={handleAuth} style={styles.button}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>


        <p style={styles.toggleText}>
          {isLogin ? "Don't have an account?" : 'Already registered?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} style={styles.toggleButton}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};


const styles = {
  page: {
    minHeight: '100vh',
    background: '#f1f5f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '400px',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    color: '#111827',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    transition: 'border-color 0.2s ease',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
  toggleText: {
    textAlign: 'center',
    marginTop: '1rem',
    fontSize: '0.95rem',
    color: '#374151',
  },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#2563eb',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginLeft: '4px',
  },
};


// Optional animation keyframe
const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleTag);


export default Auth;
