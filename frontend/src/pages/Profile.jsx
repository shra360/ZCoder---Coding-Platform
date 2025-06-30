import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';


const Profile = () => {
  const { user } = useAuth();


  if (!user) {
    return (
      <div style={styles.page}>
        <div style={styles.messageBox}>🔒 Please log in to view your profile.</div>
      </div>
    );
  }


  return (
    <div style={styles.page}>
      <div style={styles.layout}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.avatar}>
            <span style={styles.avatarIcon}>👤</span>
          </div>
          <div>
            <h2 style={styles.name}>{user.username || 'ZCoder'}</h2>
            <p style={styles.email}>{user.email}</p>
            {user.createdAt && (
              <p style={styles.joined}>
                Joined: {new Date(user.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </aside>


        {/* Main Content */}
        <main style={styles.main}>
          {/* Bookmarked Problems */}
          <section style={styles.card}>
            <h3 style={styles.cardTitle}>🔖 Bookmarked Problems</h3>
            {(!user.bookmarks || user.bookmarks.length === 0) ? (
              <p style={styles.empty}>You haven’t bookmarked anything yet.</p>
            ) : (
              <ul style={styles.list}>
                {user.bookmarks.map((problem, i) =>
                  problem?.title && problem?.slug ? (
                    <li key={i} style={styles.item}>
                      <Link to={`/problems/${problem.slug}`} style={styles.link}>
                        {problem.title}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            )}
          </section>


          {/* Solved Problems */}
          <section style={styles.card}>
            <h3 style={styles.cardTitle}>🏆 Solved Problems</h3>
            {(!user.solved || user.solved.length === 0) ? (
              <p style={styles.empty}>No problems solved yet.</p>
            ) : (
              <ul style={styles.list}>
                {user.solved.map((title, i) => (
                  <li key={i} style={styles.item}>✅ {title}</li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};


const styles = {
  page: {
    minHeight: '100vh',
    background: '#f1f5f9',
    padding: '2rem 1rem',
    fontFamily: 'sans-serif',
  },
  layout: {
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'row',
    gap: '2rem',
    flexWrap: 'wrap',
    animation: 'fadeIn 0.4s ease',
  },
  sidebar: {
    flex: '1 1 260px',
    background: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: '#dbeafe',
    margin: '0 auto 1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
  },
  avatarIcon: {
    fontSize: '2rem',
  },
  name: {
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '0.3rem',
    color: '#1e3a8a',
  },
  email: {
    fontSize: '0.9rem',
    color: '#475569',
    marginBottom: '0.25rem',
  },
  joined: {
    fontSize: '0.85rem',
    color: '#64748b',
  },
  main: {
    flex: '2 1 600px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
  },
  cardTitle: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#111827',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
  },
  item: {
    background: '#f3f4f6',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    color: '#111827',
  },
  link: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 500,
  },
  empty: {
    fontSize: '0.95rem',
    color: '#64748b',
  },
  messageBox: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    maxWidth: '500px',
    margin: '0 auto',
    textAlign: 'center',
    fontSize: '1.1rem',
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
  },
};


// Fade-in animation
const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleTag);


export default Profile;
