import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const ProblemDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked } = useAuth();
  const [problem, setProblem] = useState(null);


  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`https://server-5mcy.onrender.com/api/problems/${slug}`);
        if (!res.ok) throw new Error('Problem not found');
        const data = await res.json();
        setProblem(data);
      } catch (err) {
        console.error(err);
        setProblem(null);
      }
    };


    fetchProblem();
  }, [slug]);


  if (!problem) {
    return (
      <div style={styles.page}>
        <div style={styles.errorBox}>❌ Problem not found.</div>
      </div>
    );
  }


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>{problem.title}</h2>


        <div style={styles.section}>
          <strong>Description:</strong>
          <p style={styles.text}>{problem.description}</p>
        </div>


        <div style={styles.section}>
          <strong>Input:</strong>
          <p style={styles.text}>{problem.input}</p>
        </div>


        <div style={styles.section}>
          <strong>Output:</strong>
          <p style={styles.text}>{problem.output}</p>
        </div>


        {problem.constraints?.length > 0 && (
          <div style={styles.section}>
            <strong>Constraints:</strong>
            <ul style={styles.list}>
              {problem.constraints.map((c, i) => (
                <li key={i} style={styles.text}>{c}</li>
              ))}
            </ul>
          </div>
        )}


        {problem.tags?.length > 0 && (
          <div style={styles.section}>
            <strong>Tags:</strong>
            <div style={styles.tags}>
              {problem.tags.map((tag, i) => (
                <span key={i} style={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>
        )}


        <div style={styles.actions}>
          <button
            onClick={() => navigate(`/editor?slug=${problem.slug}`)}
            style={styles.solveBtn}
          >
            💻 Solve Now
          </button>
          <button
            onClick={() => toggleBookmark(problem._id)}
            style={styles.bookmarkBtn}
          >
            {isBookmarked(problem._id) ? '🔖 Bookmarked' : '📑 Bookmark'}
          </button>
        </div>
      </div>
    </div>
  );
};


const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '2rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 12px 30px rgba(0,0,0,0.08)',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  title: {
    fontSize: '2rem',
    color: '#1e40af',
    marginBottom: '1.5rem',
  },
  section: {
    marginBottom: '1.2rem',
  },
  text: {
    fontSize: '1rem',
    color: '#374151',
    lineHeight: 1.5,
    marginTop: '0.25rem',
  },
  list: {
    paddingLeft: '1.2rem',
    marginTop: '0.5rem',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  tag: {
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    padding: '0.35rem 0.75rem',
    fontSize: '0.8rem',
    borderRadius: '8px',
  },
  actions: {
    marginTop: '2rem',
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  solveBtn: {
    backgroundColor: '#2563eb',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
  },
  bookmarkBtn: {
    backgroundColor: '#e5e7eb',
    color: '#111827',
    padding: '0.75rem 1.2rem',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    cursor: 'pointer',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '1rem 2rem',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: '500',
    textAlign: 'center',
  },
};


// Add animation
const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleTag);


export default ProblemDetails;
