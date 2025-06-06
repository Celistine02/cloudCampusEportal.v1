import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const OPENROUTER_API_KEY =
  "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";

const SYSTEM_PROMPT = "You are a helpful assistant.";

const ChatbotModal = ({ isOpen, onClose }) => {
  // Store messages in OpenAI format for API, and also for UI rendering
  const [messages, setMessages] = useState([
    { role: "system", content: SYSTEM_PROMPT }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const modalRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const inputEl = modalRef.current.querySelector("input");
      if (inputEl) inputEl.focus();
    }
  }, [isOpen]);

  // For UI, filter out the system message and map roles to "user"/"bot"
  const getDisplayMessages = () =>
    messages
      .filter((msg) => msg.role !== "system")
      .map((msg) => ({
        from: msg.role === "user" ? "user" : "bot",
        text: msg.content
      }));

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "deepseek/deepseek-r1:free",
          messages: newMessages
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      const botReply = response.data.choices[0].message.content;
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: botReply }
      ]);
    } catch (error) {
      let errorMsg = "Sorry, there was an error. Please try again.";
      if (error.response && error.response.data && error.response.data.error) {
        errorMsg = error.response.data.error.message || errorMsg;
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errorMsg }
      ]);
    } finally {
      setIsLoading(false);
    }
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
          {/* Initial greeting if no user messages yet */}
          {getDisplayMessages().length === 0 && (
            <div
              style={{
                ...styles.message,
                alignSelf: "flex-start",
                background: "#f1f1f1"
              }}
            >
              Hello! How can I help you today?
            </div>
          )}
          {getDisplayMessages().map((msg, idx) => (
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
          {isLoading && (
            <div
              style={{
                ...styles.message,
                alignSelf: "flex-start",
                background: "#f1f1f1",
                opacity: 0.7,
                fontStyle: "italic"
              }}
            >
              Bot is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form style={styles.inputArea} onSubmit={handleSend}>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            style={styles.input}
            disabled={isLoading}
          />
          <button type="submit" style={styles.sendBtn} disabled={isLoading || !input.trim()}>
            {isLoading ? "Sending..." : "Send"}
          </button>
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
