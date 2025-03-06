import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookCheck, Layers, BookOpen, UserCheck } from 'lucide-react';
import { SidebarItem } from './mainLayout';
const TeacherItems = ({ setIsMobileMenuOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <Link to="/teacher-portal" onClick={() => setIsMobileMenuOpen(false)}>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Home"
          active={currentPath === "/teacher-portal"}
        />
      </Link>
      <Link to="/teacher-portal/activities" onClick={() => setIsMobileMenuOpen(false)}>
        <SidebarItem
          icon={<LayoutDashboard size={20} />}
          text="Activities"
          active={currentPath === "/teacher-portal/activities"}
        />
      </Link>
      <Link to="/teacher-portal/subjects" onClick={() => setIsMobileMenuOpen(false)}>
        <SidebarItem
          icon={<BookCheck size={20} />}
          text="Subjects"
          active={currentPath === "/teacher-portal/subjects"}
        />
      </Link>
      <Link to="/teacher-portal/schedule" onClick={() => setIsMobileMenuOpen(false)}>
        <SidebarItem
          icon={<Layers size={20} />}
          text="Schedule"
          active={currentPath === "/teacher-portal/schedule"}
        />
      </Link>
      <Link to="/teacher-portal/teacher-time-area" onClick={() => setIsMobileMenuOpen(false)}>
        <SidebarItem
          icon={<Layers size={20} />}
          text="Timetable"
          active={currentPath === "/teacher-portal/teacher-time-area"}
        />
      </Link>
      <Link to="/teacher-portal/homeworks">
        <SidebarItem
          icon={<BookOpen size={20} />}
          text="Learning Resources"
          active={currentPath === "/teacher-portal/homeworks"}
        />
      </Link>
      <Link to="/teacher-portal/student-attendance" onClick={() => setIsMobileMenuOpen(false)}>
        <SidebarItem
          icon={<UserCheck size={20} />}
          text="Student Attendance"
          active={currentPath === "/teacher-portal/student-attendance"}
        />
      </Link>
    </>
  );
};

export default TeacherItems;
