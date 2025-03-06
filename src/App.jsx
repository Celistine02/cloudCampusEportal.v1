import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import ProtectedRoute from "./ProtectedRoute"; // Import the ProtectedRoute component
console.log("%cDEVELOPER SECTION", "color: white; font-size: 18px; font-weight: bold; background-color: red; padding: 20px; border: 3px solid black;");

// import Landing Pages
import StudentTimeArea from "./components/studentApp/dashboard/timetable/StudentTimeArea"
// import not found page
import NotFoundPage from "./pages/notFound";

// import user account authentication pages
import Login from "./pages/auth/login";
import Reg from "./pages/auth/singup";

// student logged in areas
import Dashboard from "./pages/student/dashboard";

//Signup page
import Registration from "./pages/Registration/Registration";

//Payment page
import Payment from "./pages/Payments/Payments";

//deposit page
import TimeTable from "./pages/TimeTable/TimeTable";

//withdraw page
import Resources from "./pages/resources/Resources";

//ClassResults page
import ClassResults from "./pages/ClassResults/ClassResults";

//ClassResults page
import AccountSettings from "./pages/accountSettings/accountSettings";
import TeacherLogin from "./components/auth/teacherLogin";
import ParentLogin from "./components/auth/parentLogin";
//ClassResults page

import MainLayout from "./components/layouts/mainLayout";
import TeacherActivities from "./pages/admin/TeacherActivities";
import TeacherSubjects from "./pages/admin/TeacherSubjects";
import Teacherhomeworks from "./pages/admin/Teacherhomeworks"; // Corrected casing to match the actual file name
import Scheduale from "./components/frontOffice/scheduale";
import TeacherTimeArea from "./components/teacher/timetable/TeacherTimeArea";
import AttendanceMainArea from "./components/attendance/AttendanceMainArea";
import DashboardMainArea from "./components/teacher/dashboard/DashboardMainArea";
import HomeworkMainArea from "./components/teacher/homework/homeworkMainArea";
import LogoutMainArea from "./components/logout/logoutMainArea"; // Import LogoutMainArea
import AllActivities from "./components/clubs/AllActivities";
const history = createBrowserHistory();

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/my-portal" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            {/* <Route index element={<Login />} /> */}

            {/* logged in routes */}
            <Route index element={<Dashboard />} />

            {/* agents page */}
            <Route path="student/registration" element={<Registration />} />

            {/* Payment page */}
            <Route path="student/paymenthistory" element={<Payment />} />

            {/* deposit  page */}
            <Route path="student/timetable" element={<TimeTable />} />

            {/* withdraw  page */}
            <Route path="student/studynotes" element={<Resources />} />

            {/* ClassResults page */}
            <Route path="student/myresults" element={<ClassResults />} />
            <Route path="student/activities" element={<AllActivities />} />

            {/* account settings page */}
            <Route path="student/settings" element={<AccountSettings />} />
            <Route path="student-timetable" element={<StudentTimeArea />} /> {/* Added StudentTimeArea route */}

            {/* logout page */}
            <Route path="logout" element={<LogoutMainArea />} /> {/* Added Logout route */}

            {/* ClassResults page */}

            <Route path="register" element={<Reg />} />
            {/* not found page */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          {/* Add routes for teacher and parent login */}
          <Route path="/teacher-login" element={<TeacherLogin />} />
          <Route path="/parent-login" element={<ParentLogin />} />
          {/* Teacher routes */}
          <Route path="/teacher-portal" element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route index element={<DashboardMainArea />} />
            <Route path="activities" element={<TeacherActivities />} />
            <Route path="subjects" element={<TeacherSubjects />} />
            <Route path="homeworks" element={<Teacherhomeworks />} /> {/* Added TeacherHomeworks route */}
            <Route path="schedule" element={<Scheduale />} /> {/* Added Scheduale route */}
            <Route path="student-attendance" element={<AttendanceMainArea />} /> {/* Added StudentAttendance route */}
            <Route path="teacher-time-area" element={<TeacherTimeArea />} /> {/* Added TeacherTimeArea route */}
            <Route path="homeworks" element={<HomeworkMainArea />} /> {/* Added HomeworkMainArea route */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>   
  );
}

export default App;
