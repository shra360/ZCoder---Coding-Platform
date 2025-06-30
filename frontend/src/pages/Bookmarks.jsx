   import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';


const Bookmarks = () => {
  const { user } = useAuth();
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem('zcoder-user-token');
        const res = await fetch('https://server-5mcy.onrender.com/api/bookmarks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBookmarkedProblems(data);
      } catch (err) {
        setError('Failed to load bookmarks.');
      } finally {
        setLoading(false);
      }
    };


    fetchBookmarks();
  }, [user]);


  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📌 Bookmarked Problems</h2>


        {!user ? (
          <p style={styles.message}>🔒 Please log in to view your bookmarks.</p>
        ) : loading ? (
          <p style={styles.message}>Loading bookmarks...</p>
        ) : error ? (
          <p style={styles.message}>{error}</p>
        ) : bookmarkedProblems.length === 0 ? (
          <p style={styles.message}>You haven’t bookmarked any problems yet.</p>
        ) : (
          <ul style={styles.list}>
            {bookmarkedProblems.map((problem) => (
              <li key={problem._id} style={styles.listItem}>
                <a href={`/problems/${problem._id}`} style={styles.link}>
                  {problem.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};


const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #111827, #1f2937)',
    padding: '2rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '600px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    animation: 'fadeIn 0.5s ease',
  },
  heading: {
    fontSize: '1.8rem',
    marginBottom: '1.5rem',
    color: '#1f2937',
    textAlign: 'center',
  },
  message: {
    fontSize: '1rem',
    color: '#555',
    textAlign: 'center',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  listItem: {
    background: '#f3f4f6',
    padding: '1rem',
    borderRadius: '8px',
    transition: 'transform 0.2s ease, background 0.2s',
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: '#1e40af',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
};


// Append fadeIn animation globally (once)
const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleTag);


export default Bookmarks;
