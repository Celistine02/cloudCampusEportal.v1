import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useStudentStore from './../../../production/zustand/features/students/studentStore';
import useStudentAttendanceStore from './../../../production/zustand/features/teachers/attendcaeStudent';
import { FaEdit } from 'react-icons/fa'; // Import edit icon

const AttendanceTable = () => {
    const [formFilter, setFormFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState(null);
    const [termFilter, setTermFilter] = useState('all');
    const [loadMore, setLoadMore] = useState(4);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const { students, fetchStudents } = useStudentStore();
    const { updateStudentAttendance, error } = useStudentAttendanceStore();

    useEffect(() => {
        fetchStudents();
    }, [fetchStudents]);

    useEffect(() => {
        const unsubscribe = useStudentStore.subscribe(
            (state) => state.students,
            (students) => {
                // This will be called whenever the students state changes
                console.log('Students updated:', students);
            }
        );

        return () => unsubscribe();
    }, []);

    const statusBadge = (attendanceRecord) => {
        if (!attendanceRecord || attendanceRecord.length === 0) return null;
        const latestRecord = attendanceRecord[attendanceRecord.length - 1];
        const badgeColor = latestRecord.status === 'present' ? 'green' : 'red';
        return (
            <span
                className={`text-xs font-semibold text-${badgeColor}-800 bg-${badgeColor}-100 rounded-full inline-flex items-center px-3 py-1`}
            >
                {latestRecord.status.charAt(0).toUpperCase() + latestRecord.status.slice(1)}
            </span>
        );
    };

    const handleLoadMore = () => {
        setLoadMore(loadMore + 4);
    };

    const openModal = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setIsModalOpen(false);
    };

    const updateAttendanceStatus = async (status) => {
        if (selectedStudent) {
            try {
                const currentDate = new Date().toISOString().split('T')[0] + "T00:00:00.000Z";
                await updateStudentAttendance(selectedStudent._id, currentDate, status);
                setIsSuccessModalOpen(true);
                closeModal();
            } catch (error) {
                console.error('Error updating attendance:', error);
                setIsErrorModalOpen(true);
            }
        }
    };

    const filtered = students.filter(student => 
        (formFilter === 'all' || student.level === formFilter) && 
        (statusFilter === 'all' || student.attendanceRecord.some(record => record.status === statusFilter)) &&
        (dateFilter === null || student.attendanceRecord.some(record => new Date(record.date).toDateString() === dateFilter.toDateString())) &&
        (termFilter === 'all' || student.term === termFilter)
    );

    return (
        <div className="overflow-hidden bg-white border border-gray-200 shadow rounded-xl">
            <div className="flex flex-wrap justify-end mb-4">
                <select
                    value={formFilter}
                    onChange={(e) => setFormFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm mr-4 mb-2 sm:mb-0"
                >
                    <option value="all">All Forms</option>
                    <option value="form 1">Form 1</option>
                    <option value="form 2">Form 2</option>
                    <option value="form 3">Form 3</option>
                    <option value="form 4">Form 4</option>
                    <option value="form 5">Form 5</option>
                    <option value="form 6">Form 6</option>
                </select>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm mr-4 mb-2 sm:mb-0"
                >
                    <option value="all">All Statuses</option>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
                <DatePicker
                    selected={dateFilter}
                    onChange={date => setDateFilter(date)}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm mr-4 mb-2 sm:mb-0"
                />
                <select
                    value={termFilter}
                    onChange={(e) => setTermFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm mb-2 sm:mb-0"
                >
                    <option value="all">All Terms</option>
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Term 3">Term 3</option>
                </select>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance Record</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit Attendance</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filtered.slice(0, loadMore).map((student, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {statusBadge(student.attendanceRecord)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <FaEdit className="text-blue-500 cursor-pointer" onClick={() => openModal(student)} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {loadMore < filtered.length && (
                <div className="text-center mt-4">
                    <button onClick={handleLoadMore} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Load More
                    </button>
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Edit Attendance for {selectedStudent.name}</h2>
                        <button className="px-4 py-2 mb-4 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => updateAttendanceStatus('present')}>
                            Mark Present
                        </button>
                        <button className="px-4 py-2 mb-4 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => updateAttendanceStatus('absent')}>
                            Mark Absent
                        </button>
                        <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={closeModal}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {isSuccessModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Attendance Updated Successfully</h2>
                        <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => setIsSuccessModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {isErrorModalOpen && error && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Error</h2>
                        <p className="text-red-500">{error}</p>
                        <button className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => setIsErrorModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AttendanceTable;
