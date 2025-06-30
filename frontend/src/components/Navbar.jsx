import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();


  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', saved);
  }, []);


  if (location.pathname === '/auth') return null;


  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        ZCoder
      </Link>


      <div style={styles.right}>
        <NavLink to="/problems" label="Problems" />
        <NavLink to="/editor" label="Editor" />
        <NavLink to="/rooms" label="Rooms" />
        <NavLink to="/profile" label="Profile" />
        <NavLink to="/ContactUs" label="ContactUs" />
        <NavLink to="/Feedback" label="Feedback" />


        {user ? (
          <button onClick={logout} style={styles.logout}>
            Logout
          </button>
        ) : (
          <Link to="/auth" style={styles.authButton}>
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
};


const NavLink = ({ to, label }) => {
  return (
    <Link
      to={to}
      style={styles.link}
      onMouseEnter={e => (e.currentTarget.style.color = '#1e40af')}
      onMouseLeave={e => (e.currentTarget.style.color = '#2563eb')}
    >
      {label}
    </Link>
  );
};


const styles = {
  nav: {
    background: '#fff',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    fontFamily: 'sans-serif',
    animation: 'fadeIn 0.4s ease',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    color: '#1e3a8a',
    fontSize: '1.5rem',
    fontWeight: 600,
    textDecoration: 'none',
    userSelect: 'none',
  },
  right: {
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'center',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '1rem',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'color 0.3s ease',
  },
  logout: {
    background: 'none',
    color: '#2563eb',
    border: '1px solid #2563eb',
    padding: '6px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1rem',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  authButton: {
    backgroundColor: '#2563eb',
    color: '#fff',
    padding: '8px 18px',
    borderRadius: '12px',
    fontWeight: 600,
    fontSize: '1rem',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease',
  },
};


// Fade-in animation (injecting CSS via JS)
const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}


button:hover {
  background-color: #1e40af !important;
  color: #fff !important;
  border-color: #1e40af !important;
}


a[href]:hover {
  color: #1e40af !important;
}


a[href] {
  transition: color 0.3s ease;
}
`;
document.head.appendChild(styleTag);


export default Navbar;
