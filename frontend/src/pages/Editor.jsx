import React, { useState } from "react";
import Editor from "@monaco-editor/react";


export default function EditorPage() {
  const [code, setCode] = useState("print('Hello, ZCoder!')");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);


  const handleRun = () => {
    setIsRunning(true);
    setOutput("Running...");


    const ws = new WebSocket("https://executor-q8ke.onrender.com/ws");


    ws.onopen = () => {
      ws.send(code);
    };


    ws.onmessage = (event) => {
      setOutput(event.data);
      setIsRunning(false);
      ws.close();
    };


    ws.onerror = () => {
      setOutput("WebSocket connection error.");
      setIsRunning(false);
    };
  };


  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <h1 style={styles.logo}>🧠 ZCoder Editor</h1>
        <button
          onClick={handleRun}
          style={{
            ...styles.runBtn,
            backgroundColor: isRunning ? "#94a3b8" : "#2563eb",
            cursor: isRunning ? "not-allowed" : "pointer",
          }}
          disabled={isRunning}
        >
          {isRunning ? "Running..." : "Run Code ▶"}
        </button>
      </div>


      <div style={styles.editorSection}>
        <Editor
          height="55vh"
          defaultLanguage="python"
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-light"
          options={{
            fontSize: 15,
            minimap: { enabled: false },
            lineNumbers: "on",
            wordWrap: "on",
            fontFamily: "Fira Code, monospace",
          }}
        />
      </div>


      <div style={styles.outputSection}>
        <div style={styles.outputHeader}>🔍 Output</div>
        <pre style={styles.outputText}>{output}</pre>
      </div>
    </div>
  );
}


const styles = {
  page: {
    minHeight: "100vh",
    background: "#f1f5f9",
    padding: "2rem 1rem",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    maxWidth: "900px",
    margin: "0 auto",
    animation: "fadeIn 0.4s ease",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#fff",
    padding: "1rem 1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },
  logo: {
    fontSize: "1.5rem",
    color: "#1e3a8a",
    fontWeight: 600,
    fontFamily: "monospace",
    margin: 0,
  },
  runBtn: {
    padding: "0.5rem 1.5rem",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    transition: "background 0.3s ease",
  },
  editorSection: {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    background: "#fff",
  },
  outputSection: {
    background: "#fff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  },
  outputHeader: {
    fontSize: "1.1rem",
    color: "#1e3a8a",
    marginBottom: "0.75rem",
    fontWeight: 600,
  },
  outputText: {
    background: "#f3f4f6",
    color: "#111827",
    padding: "1rem",
    fontSize: "1rem",
    fontFamily: "'Fira Code', monospace",
    borderRadius: "10px",
    whiteSpace: "pre-wrap",
    minHeight: "120px",
  },
};


// Fade-in animation
const styleTag = document.createElement("style");
styleTag.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(styleTag);
