import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Rooms = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [rooms] = useState([
    { name: 'DP Discussions', slug: 'dp-discussions' },
    { name: 'Graph Theory', slug: 'graph-theory' },
    { name: 'Beginner Room', slug: 'beginner-room' },
    { name: 'JavaScript Coders', slug: 'javascript-coders' },
    { name: 'System Design', slug: 'system-design' },
  ]);
  const currentRoom = rooms.find((room) => room.slug === slug);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    if (!slug) return;

    socketRef.current = new WebSocket('wss://socket-dzk3.onrender.com');

    socketRef.current.onopen = () => {
      socketRef.current.send(JSON.stringify({ type: 'join', room: slug }));
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages((prev) => [...prev, data]);
      }
    };

    return () => {
      socketRef.current.close();
    };
  }, [slug]);

  const sendMessage = () => {
    if (input.trim() && socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({
          type: 'message',
          room: slug,
          text: input,
        })
      );
      setInput('');
    }
  };

  if (!slug) {
    return (
      <div style={styles.page}>
        <div style={styles.roomListWrapper}>
          <h2 style={styles.title}>💬 Choose a Room</h2>
          <div style={styles.roomGrid}>
            {rooms.map((room, i) => (
              <div key={i} style={{ ...styles.roomCard, animationDelay: `${i * 0.1}s` }}>
                <h3 style={styles.roomName}>{room.name}</h3>
                <p style={styles.roomDesc}>Join discussion on <b>{room.name}</b>.</p>
                <button
                  style={styles.joinBtn}
                  onClick={() => navigate(`/rooms/${room.slug}`)}
                >
                  Enter Room →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.chatWrapper}>
        <h2 style={styles.roomHeader}>💬 {currentRoom?.name || 'Room'}</h2>
        <div style={styles.chatBox}>
          {messages.map((msg, i) => (
            <div key={i} style={styles.message}>
              {msg.text}
            </div>
          ))}
        </div>
        <div style={styles.inputBox}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            style={styles.input}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} style={styles.sendBtn}>Send</button>
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
  roomListWrapper: {
    maxWidth: '960px',
    margin: '0 auto',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#1e3a8a',
    marginBottom: '2rem',
  },
  roomGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  roomCard: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.06)',
    animation: 'fadeInUp 0.4s ease forwards',
    transform: 'translateY(20px)',
    opacity: 0,
  },
  roomName: {
    fontSize: '1.2rem',
    marginBottom: '0.5rem',
    color: '#111827',
  },
  roomDesc: {
    fontSize: '0.95rem',
    color: '#4b5563',
    marginBottom: '1rem',
  },
  joinBtn: {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    fontSize: '0.95rem',
    cursor: 'pointer',
  },
  chatWrapper: {
    maxWidth: '800px',
    margin: '0 auto',
    background: '#fff',
    borderRadius: '10px',
    padding: '1.5rem',
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
  },
  roomHeader: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    color: '#1e3a8a',
  },
  chatBox: {
    background: '#f9fafb',
    height: '300px',
    overflowY: 'auto',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    border: '1px solid #e5e7eb',
  },
  message: {
    marginBottom: '0.75rem',
    fontSize: '0.95rem',
  },
  inputBox: {
    display: 'flex',
    gap: '0.5rem',
  },
  input: {
    flex: 1,
    padding: '0.6rem 1rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  sendBtn: {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

// Inject the fadeInUp animation once
const styleTag = document.createElement('style');
styleTag.innerHTML = `
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`;
document.head.appendChild(styleTag);

export default Rooms;
