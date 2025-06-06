// import layout


// import components
import MainDashboardArea from '../../components/studentApp/dashboard/mainDashboardArea'

function Dashboard() {
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
      >
        Online Chat
      </button>
      <MainDashboardArea />
    </div>
  )
}

export default Dashboard