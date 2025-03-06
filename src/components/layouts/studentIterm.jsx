import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, SquareUserRound, CalendarCheck, BookOpen, Layers } from 'lucide-react';
import { SidebarItem } from './mainLayout';

const StudentItems = ({ setIsMobileMenuOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

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
      <Link to="/my-portal/student/timetable" onClick={() => setIsMobileMenuOpen(false)}>
        <SidebarItem
          icon={<Layers size={20} />}
          text="Time Table"
          active={currentPath === "/my-portal/student/timetable"}
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
};

export default StudentItems;
