
import React, { useState } from 'react';


const Feedback = () => {
  const [formData, setFormData] = useState({ name: '', email: '', rating: '', comments: '' });
  const [submitted, setSubmitted] = useState(false);


  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));


  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setFormData({ name: '', email: '', rating: '', comments: '' });
  };


  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>Feedback</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          <label style={styles.label}>
            Name
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              placeholder="Your full name"
            />
          </label>
          <label style={styles.label}>
            Email
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              placeholder="you@example.com"
            />
          </label>
          <label style={styles.label}>
            Rating
            <select
              name="rating"
              required
              value={formData.rating}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="" disabled>Select rating</option>
              <option value="5">⭐️⭐️⭐️⭐️⭐️ Excellent</option>
              <option value="4">⭐️⭐️⭐️⭐️ Good</option>
              <option value="3">⭐️⭐️⭐️ Average</option>
              <option value="2">⭐️⭐️ Poor</option>
              <option value="1">⭐️ Bad</option>
            </select>
          </label>
          <label style={styles.label}>
            Comments
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Share your thoughts..."
              rows={5}
            />
          </label>
          <button type="submit" style={styles.button}>
            Submit Feedback
          </button>
        </form>
      ) : (
        <div style={styles.thankYou}>
          <h2>Thanks for your feedback!</h2>
          <p>We appreciate your help in improving ZCoder.</p>
          <button onClick={() => setSubmitted(false)} style={styles.buttonSecondary}>
            Submit Another
          </button>
        </div>
      )}
    </div>
  );
};


const styles = {
  wrapper: {
    maxWidth: '600px',
    margin: '3rem auto',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 12px 28px rgba(0,0,0,0.12)',
    fontFamily: 'sans-serif',
    color: '#1e293b',
    animation: 'fadeInUp 0.7s ease forwards',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#2563eb',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#334155',
  },
  input: {
    marginTop: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1.5px solid #cbd5e1',
    backgroundColor: '#f9fafb',
    color: '#1e293b',
    transition: 'border-color 0.3s ease',
  },
  select: {
    marginTop: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1.5px solid #cbd5e1',
    backgroundColor: '#f9fafb',
    color: '#1e293b',
    appearance: 'none',
    cursor: 'pointer',
    transition: 'border-color 0.3s ease',
  },
  textarea: {
    marginTop: '0.5rem',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1.5px solid #cbd5e1',
    backgroundColor: '#f9fafb',
    color: '#1e293b',
    resize: 'vertical',
    transition: 'border-color 0.3s ease',
  },
  button: {
    marginTop: '1rem',
    padding: '0.85rem',
    fontSize: '1.1rem',
    fontWeight: '700',
    backgroundColor: '#2563eb',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  buttonSecondary: {
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '600',
    backgroundColor: 'transparent',
    border: '2px solid #2563eb',
    borderRadius: '10px',
    color: '#2563eb',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  thankYou: {
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease forwards',
  },
};


// Add animations (inject once)
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 8px #2563eb;
}
button:hover {
  background-color: #1e40af;
  transform: scale(1.05);
}
buttonSecondary:hover {
  background-color: #2563eb;
  color: #fff;
}
`;
document.head.appendChild(styleSheet);


export default Feedback;
