import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Testimonials from './Testimonials';

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={styles.wrapper}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Level Up with ZCoder</h1>
          <p style={styles.heroSubtitle}>
            Collaborate. Practice. Grow. A coding space made for real devs.
          </p>
          {!user && (
            <Link to="/Auth">
              <button style={styles.heroButton}>Get Started</button>
            </Link>
          )}
        </div>
        <img
          src="./undraw_programming_65t2.svg"
          alt="hero"
          style={styles.heroImage}
        />
      </div>

      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>✨ Key Features</h2>
        <div style={styles.cardsContainer}>
          {features.map((feature, i) => (
            <div key={i} style={{ ...styles.card, animationDelay: `${i * 0.1}s` }}>
              <div style={styles.cardIcon}>{feature.icon}</div>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardText}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <Testimonials />
    </div>
  );
};

const features = [
  {
    icon: '🧠',
    title: 'Solve Coding Challenges',
    description: 'Sharpen your problem-solving skills with curated challenges.',
  },
  {
    icon: '🤝',
    title: 'Collaborate in Real-Time',
    description: 'Code live with friends and other developers in interactive rooms.',
  },
  {
    icon: '📌',
    title: 'Bookmark for Later',
    description: 'Save problems you like and revisit them anytime.',
  },
];

const styles = {
  wrapper: {
    minHeight: '100vh',
    backgroundColor: '#f1f5f9',
    fontFamily: 'sans-serif',
    padding: '2rem 1rem',
  },
  hero: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '0 auto 4rem',
  },
  heroContent: {
    maxWidth: '550px',
  },
  heroTitle: {
    fontSize: '2.8rem',
    color: '#111827',
    marginBottom: '1rem',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#374151',
    marginBottom: '2rem',
    lineHeight: 1.6,
  },
  heroButton: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background 0.3s ease',
  },
  heroImage: {
    maxWidth: '400px',
    width: '100%',
    animation: 'fadeIn 0.8s ease',
  },
  section: {
    maxWidth: '1100px',
    margin: '0 auto',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#111827',
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2rem',
    justifyContent: 'center',
  },
  card: {
    flex: '1 1 280px',
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    animation: 'popIn 0.6s ease forwards',
    transform: 'translateY(20px)',
    opacity: 0,
  },
  cardIcon: {
    fontSize: '2rem',
    marginBottom: '0.75rem',
  },
  cardTitle: {
    fontSize: '1.25rem',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  cardText: {
    fontSize: '1rem',
    color: '#4b5563',
    lineHeight: 1.5,
  },
};

// Inject animation keyframes once
if (!document.getElementById('home-keyframes')) {
  const styleTag = document.createElement('style');
  styleTag.id = 'home-keyframes';
  styleTag.innerHTML = `
    @keyframes popIn {
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(styleTag);
}

export default Home;
