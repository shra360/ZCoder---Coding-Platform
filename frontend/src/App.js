import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Editor from './pages/Editor';
import Rooms from './pages/Rooms';
import Bookmarks from './pages/Bookmarks';
import NotFound from './pages/NotFound';
import Problem from './pages/Problem';
import ProblemDetails from './pages/ProblemDetails';
import Feedback from './pages/Feedback';
import ContactUs from './pages/ContactUs';


function App() {
  return (
    <div style={styles.appContainer}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/:slug" element={<Rooms />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/problems" element={<Problem />} />
          <Route path="/problems/:slug" element={<ProblemDetails />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}


const styles = {
  appContainer: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",  // light gray background for entire app
    fontFamily: "'Inter', sans-serif",
    color: "#111827",             // default text color (dark gray)
    padding: "0",                 // reset padding if needed
    margin: "0",                  // reset margin
  },
};


export default App;
