import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { FaCalendar, FaUpload } from 'react-icons/fa';
import useTimetableStore from '../../../production/zustand/features/teachers/uploads';
import useTeacherStore from '../../../production/zustand/auth/teacherstore';

const ExaminationTimeTable = () => {
    const [filteredExams, setFilteredExams] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [form, setForm] = useState('');
    const [name, setName] = useState('');
    const { uploadTimetable, timetables } = useTimetableStore();
    const { token: teacherToken } = useTeacherStore();

    useEffect(() => {
        if (typeof useTimetableStore.getState().getTimetablesByTeacher === 'function') {
            useTimetableStore.getState().getTimetablesByTeacher();
        } else {
            console.error('getTimetablesByTeacher is not a function');
        }
    }, []);

    useEffect(() => {
        if (timetables) {
            setFilteredExams(timetables);
        } else {
            setFilteredExams([]);
        }
    }, [timetables]);

    const filterExams = (filter) => {
        if (filter === 'all') {
            setFilteredExams(timetables);
        } else if (filter === 'thisMonth') {
            const thisMonth = new Date();
            thisMonth.setMonth(thisMonth.getMonth());
            thisMonth.setDate(0);
            const nextMonth = new Date();
            nextMonth.setMonth(thisMonth.getMonth() + 1);
            nextMonth.setDate(0);
            const filtered = timetables.filter(exam => new Date(exam.date) >= thisMonth && new Date(exam.date) <= nextMonth);
            setFilteredExams(filtered);
        } else if (filter === 'nextMonth') {
            const nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            nextMonth.setDate(0);
            const nextNextMonth = new Date();
            nextNextMonth.setMonth(nextMonth.getMonth() + 1);
            nextNextMonth.setDate(0);
            const filtered = timetables.filter(exam => new Date(exam.date) >= nextMonth && new Date(exam.date) <= nextNextMonth);
            setFilteredExams(filtered);
        }
    };

    const handleUpload = async () => {
        if (file && form && name) {
            await uploadTimetable(form, name, file);
            console.log('Uploaded file:', file);
            setIsModalOpen(false);
        } else {
            alert('Please fill in all fields and select a file.');
        }
    };

    return (
        <section className="py-12 sm:py-16 lg:py-20 bg-white text-gray-800">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Timetables
                    </h2>
                </div>

                <div className="flex justify-center items-center gap-4 mt-8">
                    <button type="button" onClick={() => filterExams('all')} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-800 uppercase transition-all duration-200 bg-gray-200 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 hover:bg-gray-300">
                        All
                    </button>
                    <button type="button" onClick={() => filterExams('thisMonth')} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-800 uppercase transition-all duration-200 bg-gray-200 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 hover:bg-gray-300">
                        This Month
                    </button>
                    <button type="button" onClick={() => filterExams('nextMonth')} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-800 uppercase transition-all duration-200 bg-gray-200 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 hover:bg-gray-300">
                        Next Month
                    </button>
                </div>

                {teacherToken && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button type="button" onClick={() => setIsModalOpen(true)} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-800 uppercase transition-all duration-200 bg-gray-200 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 hover:bg-gray-300">
                            Upload Timetable
                        </button>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Upload Timetable</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700">Form</label>
                                <input type="text" value={form} onChange={(e) => setForm(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">File</label>
                                <input type="file" onChange={(e) => setFile(e.target.files[0])} className="w-full px-3 py-2 border rounded-lg" />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg">Cancel</button>
                                <button type="button" onClick={handleUpload} className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2">
                                    <FaUpload />
                                    Upload
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-5 gap-4 mt-10">
                    {filteredExams && filteredExams.map(exam => (
                        <div key={exam._id} className="overflow-hidden bg-gray-100 shadow rounded-xl hover:shadow-lg transition-shadow duration-300 hover:scale-105 transition-transform duration-300">
                            <div className="p-6 sm:p-8">
                                <div>
                                    <img className="object-cover w-full h-auto rounded-xl hover:scale-105 transition-transform duration-300" src={exam.icon} alt=""/>
                                </div>

                                <div className="mt-6 space-y-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-base font-medium text-gray-800 hover:text-gray-600 transition-colors duration-300">
                                            {exam.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <FaCalendar className="text-gray-600" />
                                        <span className="text-sm font-medium text-gray-600">
                                            {format(new Date(exam.date), 'Pp')}
                                        </span>
                                    </div>

                                    <button type="button"
                                            className="inline-flex items-center justify-center w-full px-6 py-4 text-xs font-bold tracking-widest text-gray-800 uppercase transition-all duration-200 bg-gray-200 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 hover:bg-gray-300">
                                        View
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExaminationTimeTable;
