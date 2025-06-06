import React, { useState } from 'react'
// import layout

// import components
import MainDashboardArea from '../../components/studentApp/dashboard/mainDashboardArea'
import ChatbotModal from '../../pages/ClassResults/chatbot'

function Dashboard() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => setIsChatOpen(true);
  const handleCloseChat = () => setIsChatOpen(false);

  return (
    <div>
      <button
        style={{
          margin: "16px 0",
          padding: "10px 20px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          fontSize: "1rem",
          cursor: "pointer"
        }}
        onClick={handleOpenChat}
      >
        Online Chat
      </button>
      <MainDashboardArea />
      <ChatbotModal isOpen={isChatOpen} onClose={handleCloseChat} />
    </div>
  )
}

export default Dashboard