import React from 'react';


const ContactUs = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Contact Us</h1>
      <p style={styles.subtitle}>Feel free to reach out via any of the methods below!</p>


      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Email</h2>
        <p style={styles.cardText}>ashmitrawat44@gmail.com</p>
      </div>


      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Phone</h2>
        <p style={styles.cardText}>+91 9892765476</p>
      </div>




      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Social</h2>
        <p style={styles.cardText}>
          <a href="https://www.linkedin.com/in/ashmit-rawat/" target="_blank" rel="noreferrer" style={styles.link}>
            LinkedIn
          </a> |{' '}
          <a href="https://github.com/ashmit-a-rawat" target="_blank" rel="noreferrer" style={styles.link}>
            GitHub
          </a>
        </p>
      </div>
    </div>
  );
};


const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    fontFamily: 'sans-serif',
    padding: '2rem 1rem',
    maxWidth: '800px',
    margin: '0 auto',
    animation: 'fadeIn 0.6s ease forwards',
  },
  title: {
    fontSize: '2.5rem',
    color: '#111827',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#374151',
    marginBottom: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
    marginBottom: '1.5rem',
    transition: 'transform 0.3s ease',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#1f2937',
    marginBottom: '0.75rem',
  },
  cardText: {
    fontSize: '1rem',
    color: '#4b5563',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500',
  },
};


// Animation keyframes injection
const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleTag);


export default ContactUs;
