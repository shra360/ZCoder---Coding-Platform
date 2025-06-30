import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Problem = () => {
  const [problems, setProblems] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const { toggleBookmark, isBookmarked } = useAuth();


  useEffect(() => {
    fetch('https://server-5mcy.onrender.com/api/problems')
      .then(res => res.json())
      .then(data => setProblems(data))
      .catch(err => console.error('Failed to fetch problems', err));
  }, []);


  const tags = [...new Set(problems.flatMap(p => p.tags))];


  const filteredProblems = selectedTag
    ? problems.filter(p => p.tags.includes(selectedTag))
    : problems;


  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.heading}>🧩 Coding Problems</h2>


        <div style={styles.tagsBar}>
          <button
            style={selectedTag === null ? styles.activeTag : styles.tag}
            onClick={() => setSelectedTag(null)}
          >
            All
          </button>
          {tags.map((tag, i) => (
            <button
              key={i}
              style={selectedTag === tag ? styles.activeTag : styles.tag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>


        <div style={styles.grid}>
          {filteredProblems.map((problem, i) => (
            <div key={problem._id} style={{ ...styles.card, animationDelay: `${i * 0.08}s` }}>
              <h3 style={styles.cardTitle}>{problem.title}</h3>
              <p style={styles.cardDesc}>{problem.description}</p>
              <div style={styles.cardTags}>
                {problem.tags.map((tag, j) => (
                  <span key={j} style={styles.cardTag}>{tag}</span>
                ))}
              </div>
              <div style={styles.cardActions}>
                <Link to={`/problems/${problem.slug}`} style={styles.viewBtn}>
                  View
                </Link>
                <button
                  onClick={() => toggleBookmark(problem._id)}
                  style={styles.bookmarkBtn}
                >
                  {isBookmarked(problem._id) ? '🔖' : '📑'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


const styles = {
  page: {
    minHeight: '100vh',
    background: '#f3f4f6',
    padding: '2rem 1rem',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '2rem',
    color: '#111827',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  tagsBar: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
    marginBottom: '2rem',
    justifyContent: 'center',
  },
  tag: {
    padding: '0.5rem 1rem',
    background: '#e5e7eb',
    color: '#111827',
    borderRadius: '999px',
    border: '1px solid #d1d5db',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s ease',
  },
  activeTag: {
    padding: '0.5rem 1rem',
    background: '#2563eb',
    color: '#fff',
    borderRadius: '999px',
    border: '1px solid #1d4ed8',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    animation: 'fadeUp 0.4s ease forwards',
    opacity: 0,
    transform: 'translateY(20px)',
  },
  cardTitle: {
    fontSize: '1.2rem',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  cardDesc: {
    fontSize: '0.95rem',
    color: '#4b5563',
    marginBottom: '0.75rem',
    flexGrow: 1,
  },
  cardTags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  cardTag: {
    background: '#e0e7ff',
    color: '#3730a3',
    fontSize: '0.75rem',
    padding: '0.3rem 0.7rem',
    borderRadius: '8px',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  viewBtn: {
    background: '#2563eb',
    color: '#fff',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  bookmarkBtn: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.4rem',
    cursor: 'pointer',
  },
};


// Inject animation globally (once)
const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;
document.head.appendChild(styleTag);


export default Problem;
