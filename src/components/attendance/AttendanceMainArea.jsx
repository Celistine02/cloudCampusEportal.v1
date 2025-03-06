import React, { useState, useEffect } from 'react';
import AttendanceTable from './AttendanceTable';
import useStudentStore from './../../../production/zustand/features/students/studentStore';

const AttendanceMainArea = () => {
  const [mostAbsentStudent, setMostAbsentStudent] = useState('');
  const [perfectAttendanceStudents, setPerfectAttendanceStudents] = useState([]);
  const { students, updateAttendance } = useStudentStore();  // Assuming there's a function to update attendance

  const fetchAttendanceData = () => {
    // Placeholder logic to determine most absent and perfect attendance students
    if (students.length > 0) {
      const attendanceCounts = students.reduce((acc, student) => {
        const presentCount = student.attendanceRecord.filter(record => record.attendanceRecord === 'present').length;
        const absentCount = student.attendanceRecord.filter(record => record.attendanceRecord === 'absent').length;
        acc.present += presentCount;
        acc.absent += absentCount;
        if (absentCount > (acc.mostAbsentCount || 0)) {
          acc.mostAbsentStudent = student.name;
          acc.mostAbsentCount = absentCount;
        }
        if (absentCount === 0) {
          acc.perfectAttendanceStudents.push(student.name);
        }
        return acc;
      }, { present: 0, absent: 0, mostAbsentStudent: '', perfectAttendanceStudents: [] });

      setMostAbsentStudent(attendanceCounts.mostAbsentStudent);
      setPerfectAttendanceStudents(attendanceCounts.perfectAttendanceStudents);
    }
  };

  // Effect hook to fetch attendance data whenever attendance records change
  useEffect(() => {
    fetchAttendanceData();
  }, [students]);  // Ensures that attendance data is re-fetched whenever students or their attendance records are updated

  // Optional: handle attendance change if required (marking attendance)
  const handleAttendanceChange = (studentId, status) => {
    // This would trigger the store to update attendance for the student
    updateAttendance(studentId, status);
  };

  return (
    <div className="overflow-hidden bg-white border border-gray-200 shadow rounded-xl ml-4 sm:ml-8 md:ml-12 lg:ml-16 xl:ml-20">
      <AttendanceTable onAttendanceChange={handleAttendanceChange} />
    </div>
  );
};

export default AttendanceMainArea;
