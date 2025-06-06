import React, { useState, useRef, useEffect } from "react";

const ChatbotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Optional: Focus input when modal opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const inputEl = modalRef.current.querySelector("input");
      if (inputEl) inputEl.focus();
    }
  }, [isOpen]);

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
      <div
        ref={modalRef}
        style={styles.modal}
        className="chatbot-modal-resizable"
      >
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
      <style>
        {`
          .chatbot-modal-resizable {
            resize: both;
            overflow: auto;
            min-width: 400px;
            min-height: 400px;
            max-width: 98vw;
            max-height: 98vh;
          }
        `}
      </style>
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
    width: "900px",
    height: "700px",
    maxWidth: "98vw",
    maxHeight: "98vh",
    minWidth: "400px",
    minHeight: "400px",
    boxShadow: "0 2px 32px rgba(0,0,0,0.25)",
    display: "flex",
    flexDirection: "column",
    resize: "both",
    overflow: "auto"
  },
  header: {
    padding: "18px 24px",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "1.4rem"
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "2rem",
    cursor: "pointer",
    color: "#888"
  },
  messagesArea: {
    flex: 1,
    padding: "24px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#fafbfc"
  },
  message: {
    padding: "12px 18px",
    borderRadius: "20px",
    maxWidth: "80%",
    fontSize: "1.15rem",
    marginBottom: "4px"
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #eee",
    padding: "16px"
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "24px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "1.15rem"
  },
  sendBtn: {
    marginLeft: "12px",
    padding: "12px 28px",
    borderRadius: "24px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.1rem",
    cursor: "pointer"
  }
};

export default ChatbotModal;
