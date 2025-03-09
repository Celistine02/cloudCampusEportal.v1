import {
    ChevronFirst,
    ChevronLast,
    LogOut,
    Settings,
  } from "lucide-react";
  import { createContext, useContext, useState } from "react";
  import { Link } from "react-router-dom";
  import { useMediaQuery } from '@mui/material';

  const SidebarContext = createContext();
  
  export default function Sidebar({ children }) {
    const [expanded, setExpanded] = useState(true);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const isMobile = useMediaQuery('(max-width:768px)');

    const handleMenuItemClick = () => {
      if (isMobile) {
        setExpanded(false);
      }
    };

    return (
      <SidebarContext.Provider value={{ expanded }}>
        <aside
          className={`h-screen transition-all duration-300 ease-in-out ${
            expanded ? "w-56" : "w-16"
          } bg-white text-gray-800`}
        >
          <nav className="h-full flex flex-col bg-gray-100 border-r shadow-sm">
            <div className="p-4 pb-2 flex justify-between items-center">
              <img
                src=""
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expanded ? "w-24" : "w-0"
                }`}
              />
              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-1.5 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                {expanded ? <ChevronFirst /> : <ChevronLast />}
              </button>
            </div>

            <ul className="flex-1 px-3">{children}</ul>

            <div className="border-t flex flex-col p-3">
              <Link to="/my-portal/student/settings" onClick={handleMenuItemClick}>
                <SidebarItem icon={<Settings size={20} />} text="Settings" />
              </Link>
              <button
                onClick={() => {
                  setShowLogoutModal(true);
                  handleMenuItemClick();
                }}
                className="flex items-center w-full text-left hover:bg-gray-300"
              >
                <SidebarItem icon={<LogOut size={20} />} text="Logout" alert />
              </button>
            </div>
          </nav>
        </aside>
        {isMobile && (
          <div className="fixed top-0 left-0 w-full bg-white z-10 flex items-center justify-between p-4 border-b border-gray-200">
            <button onClick={() => setExpanded((curr) => !curr)} aria-label="Toggle Menu">
              <ChevronFirst size={24} />
            </button>
            <Link to="/my-portal" aria-label="Dashboard" onClick={handleMenuItemClick}>
              <LayoutDashboard size={24} />
              <span className="ml-2">Dashboard</span>
            </Link>
            <Link to="/my-portal/student/paymenthistory" aria-label="Payment History" onClick={handleMenuItemClick}>
              <SquareUserRound size={24} />
              <span className="ml-2">Payment History</span>
            </Link>
            <Link to="/my-portal/student/myresults" aria-label="Class Results" onClick={handleMenuItemClick}>
              <CalendarCheck size={24} />
              <span className="ml-2">Class Results</span>
            </Link>
            <Link to="/my-portal/student/studynotes" aria-label="Resources" onClick={handleMenuItemClick}>
              <BookOpen size={24} />
              <span className="ml-2">Resources</span>
            </Link>
            <Link to="/my-portal/student/timetable" aria-label="Time Table" onClick={handleMenuItemClick}>
              <Layers size={24} />
              <span className="ml-2">Time Table</span>
            </Link>
          </div>
        )}
      </SidebarContext.Provider>
    );
  }
  
  export function SidebarItem({ icon, text, active, alert }) {
    const context = useContext(SidebarContext);
    const expanded = context ? context.expanded : false;
  
    return (
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors duration-300 ease-in-out group ${
          active
            ? "bg-gray-200 text-gray-800"
            : "hover:bg-gray-300 text-gray-800"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            expanded ? "w-40 ml-3" : "w-0"
          } text-gray-800`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}
  
        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-200 text-gray-800 text-sm invisible opacity-20 -translate-x-3 transition-all duration-300 ease-in-out group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    );
  }