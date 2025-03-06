import React, { useState } from 'react';
import useScheduleStore from '../../../production/zustand/features/notices/schedualeStore';

const Modal = ({ slotInfo, onClose }) => {
    const [eventName, setEventName] = useState('');
    const [priority, setPriority] = useState('Medium'); // Default to Medium priority
    const createSchedule = useScheduleStore((state) => state.createSchedule);

    const handleSubmit = () => {
        const newEvent = {
            title: eventName, // type: String, required: true
            start: new Date(slotInfo.start), // type: Date, required: true
            end: new Date(slotInfo.end), // type: Date, required: true
            priority, // type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium'
            allDay: false, // type: Boolean, required: true
            resource: 'default', // type: String, required: true
        };
        createSchedule(newEvent);
        onClose(); // Close the modal after adding the event
    };

    const handleClose = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50" onClick={handleClose}>
            <div className="bg-white p-6 rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-xl font-semibold mb-4">Schedule Event</h2>
                
                <div className="mb-4">
                    <label className="block mb-2">Event Name</label>
                    <input 
                        type="text" 
                        className="border p-2 w-full"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Priority</label>
                    <select 
                        className="border p-2 w-full"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                <div className="flex justify-end space-x-2">
                    <button 
                        className="bg-red-500 text-white px-4 py-2 rounded" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded" 
                        onClick={handleSubmit}
                    >
                        Add Event
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
