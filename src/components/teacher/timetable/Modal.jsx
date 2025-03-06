import React, { useState } from 'react';
import useSubjectStore from './../../../../production/zustand/features/teachers/createSubjects';
import useTimetableStore from './../../../../production/zustand/features/teachers/timetable';

const Modal = ({ slotInfo, onClose }) => {
    const { subjects } = useSubjectStore();
    const { createTimetable } = useTimetableStore();
    const [selectedSubject, setSelectedSubject] = useState('');
    const [description, setDescription] = useState('');
    const [subjectLevel, setSubjectLevel] = useState('');
    const [availableLevels, setAvailableLevels] = useState([]);

    const getColorForSubject = (subjectName) => {
        const colors = [
            '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C33', 
            '#33FFF5', '#8C33FF', '#FF3333', '#33FF8C', '#FF5733'
        ];
        const index = subjects.findIndex(subject => subject.name === subjectName);
        return colors[index % colors.length];
    };

    const handleSubjectChange = (e) => {
        const subjectName = e.target.value;
        setSelectedSubject(subjectName);
        const selected = subjects.find(subject => subject.name === subjectName);
        if (selected) {
            setAvailableLevels(selected.form); // Assuming form is an array of levels
            setSubjectLevel(selected.form[0]); // Set the first level as default
        } else {
            setAvailableLevels([]);
            setSubjectLevel('');
        }
    };

    const handleLevelChange = (e) => {
        setSubjectLevel(e.target.value);
    };

    const handleSubmit = async () => {
        if (!selectedSubject || !subjectLevel) {
            alert('Please select a subject and a level.');
            return;
        }

        const newTimetableEntry = {
            title: selectedSubject,
            start: new Date(slotInfo.start),
            end: new Date(slotInfo.end),
            description,
            allDay: false,
            color: getColorForSubject(selectedSubject),
            level: subjectLevel, // Include the selected level in the entry
        };

        await createTimetable(newTimetableEntry);
        onClose();
    };

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50" onClick={handleClose}>
            <div className="bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Schedule Subject</h2>
                
                <div className="mb-4">
                    <label className="block mb-2">Subject Name</label>
                    <select 
                        className="border p-2 w-full"
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        required
                    >
                        <option value="">Select a subject</option>
                        {subjects.map(subject => (
                            <option key={subject._id} value={subject.name}>{subject.name}</option>
                        ))}
                    </select>
                </div>

                {availableLevels.length > 0 && (
                    <div className="mb-4">
                        <label className="block mb-2">Level</label>
                        <select 
                            className="border p-2 w-full"
                            value={subjectLevel}
                            onChange={handleLevelChange}
                            required
                        >
                            {availableLevels.map((level, index) => (
                                <option key={index} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <input 
                        type="text"
                        className="border p-2 w-full"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="flex justify-end space-x-2">
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>Add Subject</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
