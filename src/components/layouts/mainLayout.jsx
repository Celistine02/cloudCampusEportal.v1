import React, { useState, useEffect, createContext, useContext } from "react";
import {
  LayoutDashboard,
  Layers,
  Users,
  SquareUserRound,
  BookOpen,
  BookCheck,
  CircleDollarSign,
  CalendarCheck,
  Volume2,
  Menu,
  Settings,
  LogOut,
  FileText,
  ClipboardList,
  MessageSquare,
  ChevronFirst,
  ChevronLast,
  UserCheck,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import useAuthStore from "../../../production/zustand/auth/authStore"; // Import the auth store
import useTeacherStore from "../../../production/zustand/auth/teacherstore"; // Import the teacher store
import useHomeworkStore from "../../../production/zustand/features/homework/homeworkStore"; // Import the homework store
import useAttendanceStore from "../../../production/zustand/features/studentAttendance/studentAttendanceStore"; // Import the attendance store
import { searchEngine } from "../../../production/searchEngine"; // Import the search engine function
import NotificationModal from "./../notifications/notificationModal"; // Import the notification modal
import { useMediaQuery } from '@mui/material';
import Load from "./load";
import TeacherItems from "./teacherIterms";

const SidebarContext = createContext();

const MainLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [loading, setLoading] = useState(true);
  const { student, token, signin, signout } = useAuthStore(); // Correctly access student and token from the auth store
  const { teacher, token: teacherToken } = useTeacherStore(); // Correctly access teacher and token from the teacher store
  const { homeworks, fetchHomeworks } = useHomeworkStore(); // Correctly access homeworks and fetchHomeworks from the homework store  
  const { attendanceList, fetchAttendanceList, markAttendance } = useAttendanceStore(); // Correctly access attendanceList, fetchAttendanceList, and markAttendance from the attendance store
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // State to control the search modal
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to control the sidebar
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024); // State to check if the screen is mobile or tablet
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(true); // State to control the notification modal
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control the mobile menu
  const navigate = useNavigate(); // Use navigate hook to navigate programmatically

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a loading time of 2 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchDataForSearch = async () => {
      const data = [
        { id: 1, name: "Dashboard", path: "/my-portal" },
        { id: 2, name: "Registration", path: "/my-portal/student/registration" },
        { id: 3, name: "Payment History", path: "/my-portal/student/paymenthistory" },
        { id: 4, name: "Time Table", path: "/my-portal/student/timetable" },
        { id: 5, name: "Resources", path: "/my-portal/student/studynotes" },
        { id: 6, name: "Class Results", path: "/my-portal/student/myresults" },
        { id: 7, name: "Account Settings", path: "/my-portal/student/settings" },
      ];
      const results = searchEngine(data, searchTerm);
      setSearchResults(results.suggestions.concat(results.closeMatches));
    };

    if (searchTerm) {
      fetchDataForSearch();
    } else {
      setSearchResults([]); // Clear search results if search term is empty
    }
  }, [searchTerm]);

  useEffect(() => {
    console.log(student); // Check if student data is available
  }, [student]);

  useEffect(() => {
    fetchHomeworks(); // Fetch homeworks when the component mounts
  }, []);

  if (loading) {
    return <Load />
  }

  const renderSidebarItems = () => {
    if (teacherToken) {
      return <TeacherItems setIsMobileMenuOpen={setIsMobileMenuOpen} />
    } else {
      return (
        <>
          <Link to="/my-portal" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<LayoutDashboard size={20} />}
              text="Dashboard"
              active={currentPath === "/my-portal"}
            />
          </Link>
          <Link to="/my-portal/student/paymenthistory" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<SquareUserRound size={20} />}
              text="Payment History"
              active={currentPath === "/my-portal/student/paymenthistory"}
            />
          </Link>
          <Link to="/my-portal/student/myresults" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<CalendarCheck size={20} />}
              text="Class Results"
              active={currentPath === "/my-portal/student/myresults"}
            />
          </Link>
          <Link to="/my-portal/student/studynotes" onClick={() => setIsMobileMenuOpen(false)}>
            <SidebarItem
              icon={<BookOpen size={20} />}
              text="Resources"
              active={currentPath === "/my-portal/student/studynotes"}
            />
          </Link>
          <Link to="/my-portal/student-timetable" onClick={() => setIsMobileMenuOpen(false)}>
          <SidebarItem
              icon={<Layers size={20} />}
              text="Student Timetable"
              active={currentPath === "/my-portal/student-timetable"}
            />
          </Link>
        </>
      );
    }
  };

  return (
    <div className={`flex h-screen ${isMobile ? 'flex-col' : 'flex-row'}`}>
      {!isMobile && (
        <Sidebar className={`overflow-visible ${isMobile ? 'w-full' : 'w-64'}`}>
          {renderSidebarItems()}
        </Sidebar>
      )}
      {isMobile && (
        <div className="fixed top-0 left-0 w-full bg-white z-10 flex items-center justify-between p-4 border-b border-gray-200">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
            <Menu size={24} />
          </button>
          <Link to={teacherToken ? "/teacher-portal" : "/my-portal"} aria-label="Dashboard">
            <LayoutDashboard size={24} />
          </Link>
        </div>
      )}
      {isMobile && isMobileMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-20 flex flex-col p-4 overflow-y-auto">
          <button onClick={() => setIsMobileMenuOpen(false)} className="self-end mb-4" aria-label="Close Menu">
            <Menu size={24} />
          </button>
          {renderSidebarItems()}
        </div>
      )}
      <div className="flex flex-col flex-1">
        <header className="bg-gray-200 border-b border-gray-300 fixed w-full mx-10 lg:ml-10 lg:mr-0 top-0 z-10">
          <div className="px-4 ">
            <div className="flex items-center gap-x-64  h-16">
              <div className="flex items-center  space-x-6">
                <Link
                  to='/my-portal/student/settings'
                  className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
                  aria-label="Settings"
                >
                  <img
                    className="object-cover bg-gray-300 rounded-full w-9 h-9"
                    src={student && student.profilePicture ? student.profilePicture : "https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/dashboards/1/avatar-male.png"}
                    alt="Profile"
                  />
                </Link>
              </div>
              {!teacherToken && (
                <NotificationModal style={{ height: 'auto', position: 'absolute', bottom: '0', zIndex: '-1' }} isOpen={isNotificationModalOpen} onClose={() => setIsNotificationModalOpen(false)} />
              )}
              <div className="flex-1 hidden max-w-xs items-center justify-center lg:block">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                    placeholder="Type to search"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setIsSearchModalOpen(e.target.value.length > 0);
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end">
                <Link to="/my-portal/student/myresults" className="ml-4" aria-label="Results">
                  <svg
                    className="w-6 h-6 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 13H5v-2h14v2z" />
                    <path d="M17 3H7v18h10V3zm0 18a2 2 0 01-2 2H7a2 2 0 01-2-2V5a 2 2 0 012 2h10a2 2 0 012 2v10a2 2 0 01-2 2z" />
                  </svg>
                </Link>
                <div className="ml-4 text-gray-600">
                  {teacher && teacher.name ? `Welcome, ${teacher.name}` : student && student.name ? `Welcome, ${student.name}` : "Welcome, User"}
                </div>
              </div>
            </div>
          </div>
        </header>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-white bg-opacity-80 flex items-center justify-center lg:hidden" onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSidebarOpen(false);
            }
          }}>
            <div className="bg-gray-200 rounded-lg p-4 max-w-xs w-full">
              <Sidebar>
                {renderSidebarItems()}
              </Sidebar>
            </div>
          </div>
        )}
        {isSearchModalOpen && (
          <div className="fixed inset-0 z-50 bg-white bg-opacity-80 flex items-center justify-center" onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSearchModalOpen(false);
            }
          }}>
            <div className="bg-gray-200 rounded-lg p-4 max-w-4xl">
              <div className="search-results">
                <div className="flex items-center gap-x-4">
                  <div className="flex items-center space-x-4">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="search"
                      id="search-modal"
                      className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                      placeholder="Type to search"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsSearchModalOpen(e.target.value.length > 0);
                      }}
                          />
                          </div>
                          </div>
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Link key={result.id} to={result.path} className="block p-2 hover:bg-gray-100" onClick={() => setIsSearchModalOpen(false)}>
                      {result.name}
                    </Link>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No results found</p>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 p-4 mt-16 lg:mt-16 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Add this line

  return (
    <SidebarContext.Provider value={{ expanded }}>
      <aside
        className={`h-screen transition-all ${
          expanded ? "w-56" : "w-16"
        } bg-white text-gray-800`}
      >
        <nav className="h-full flex flex-col bg-gray-100 border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src=""
              className={`overflow-hidden transition-all ${
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
            <Link to="/my-portal/student/settings" onClick={() => setIsMobileMenuOpen(false)}>
              <SidebarItem icon={<Settings size={20} />} text="Settings" />
            </Link>
          </div>
        </nav>

      </aside>
      {isMobile && (
        <div className="fixed top-0 left-0 w-full bg-white z-10 flex items-center justify-between p-4 border-b border-gray-200">
          <button onClick={() => setExpanded((curr) => !curr)} aria-label="Toggle Menu">
            <ChevronFirst size={24} />
          </button>
          <Link to="/my-portal" aria-label="Dashboard">
            <LayoutDashboard size={24} />
            <span className="ml-2">Dashboard</span>
          </Link>
          <Link to="/my-portal/student/paymenthistory" aria-label="Payment History">
            <SquareUserRound size={24} />
            <span className="ml-2">Payment History</span>
          </Link>
          <Link to="/my-portal/student/myresults" aria-label="Class Results">
            <CalendarCheck size={24} />
            <span className="ml-2">Class Results</span>
          </Link>
          <Link to="/my-portal/student/studynotes" aria-label="Resources">
            <BookOpen size={24} />
            <span className="ml-2">Resources</span>
          </Link>
          <Link to="/my-portal/student/timetable" aria-label="Time Table">
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
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gray-200 text-gray-800"
          : "hover:bg-gray-300 text-gray-800"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
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
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-200 text-gray-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}

export default MainLayout;
