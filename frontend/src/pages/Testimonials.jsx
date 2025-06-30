import React from 'react';

const testimonials = [
  {
    name: "Riya Sharma",
    role: "Frontend Developer",
    message: "ZCoder helped me improve my problem-solving skills and collaborate with peers. The real-time editor is a game-changer!",
  },
  {
    name: "Arjun Patel",
    role: "CS Student",
    message: "The problems are well-curated and the platform has a smooth UI. It made coding practice fun and consistent for me.",
  },
  {
    name: "Priya Desai",
    role: "Full Stack Engineer",
    message: "Loved the Rooms feature! Solving challenges with friends in real-time really boosted my confidence before interviews.",
  },
];

const Testimonials = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>💬 What Users Say</h2>
      <div style={styles.grid}>
        {testimonials.map((t, i) => (
          <div key={i} style={{ ...styles.card, animationDelay: `${i * 0.1}s` }}>
            <p style={styles.message}>“{t.message}”</p>
            <h3 style={styles.name}>{t.name}</h3>
            <p style={styles.role}>{t.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f1f5f9',
    padding: '4rem 1rem',
    fontFamily: 'sans-serif',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    color: '#111827',
    marginBottom: '2rem',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem 1.25rem',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
    maxWidth: '320px',
    flex: '1 1 280px',
    animation: 'fadeUp 0.5s ease forwards',
    opacity: 0,
    transform: 'translateY(20px)',
  },
  message: {
    fontSize: '1rem',
    color: '#374151',
    marginBottom: '1rem',
    fontStyle: 'italic',
  },
  name: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '0.25rem',
  },
  role: {
    fontSize: '0.95rem',
    color: '#6b7280',
  },
};

// Inject animation keyframes
const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes fadeUp {
  to {
    transform: translateY(0);
    opacity: 1;
  }
}`;
document.head.appendChild(styleTag);

export default Testimonials;
