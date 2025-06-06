import React, { useState, useRef, useEffect } from "react";

const ChatbotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate bot response (replace with real API call if needed)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "I'm a bot! You said: " + userMessage.text }
      ]);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <span>Chatbot</span>
          <button style={styles.closeBtn} onClick={onClose}>&times;</button>
        </div>
        <div style={styles.messagesArea}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                ...styles.message,
                alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                background: msg.from === "user" ? "#d1e7dd" : "#f1f1f1"
              }}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form style={styles.inputArea} onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            style={styles.input}
          />
          <button type="submit" style={styles.sendBtn}>Send</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    borderRadius: "10px",
    width: "350px",
    maxWidth: "90vw",
    boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    maxHeight: "80vh"
  },
  header: {
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "1.1rem"
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#888"
  },
  messagesArea: {
    flex: 1,
    padding: "16px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    background: "#fafbfc"
  },
  message: {
    padding: "8px 12px",
    borderRadius: "16px",
    maxWidth: "80%",
    fontSize: "0.98rem",
    marginBottom: "2px"
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #eee",
    padding: "10px"
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "1.08rem"
  },
  sendBtn: {
    marginLeft: "8px",
    padding: "8px 16px",
    borderRadius: "20px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default ChatbotModal;
