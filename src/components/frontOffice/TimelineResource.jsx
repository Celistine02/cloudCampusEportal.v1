import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay, addHours } from 'date-fns'; // Added addHours
import Modal from './../frontOffice/Modal'; // Assuming you have a separate Modal component
import enUS from 'date-fns/locale/en-US';
import useScheduleStore from '../../../production/zustand/features/notices/schedualeStore';

// Localizer for the calendar (using date-fns)
const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

const TimelineResource = () => {
    const { schedules, fetchSchedules, createSchedule } = useScheduleStore();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        fetchSchedules();
    }, [fetchSchedules]);

    // Handle adding an event from the modal
    const addEvent = (newEvent) => {
        createSchedule(newEvent);
        setModalOpen(false);
    };

    // Handle slot selection to open modal
    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot(slotInfo);
        setModalOpen(true);
    };

    // Handle different event priorities for styling
    const eventPropGetter = (event) => {
        let backgroundColor = '#3788d8'; // Default color
        if (event.priority === 'High') backgroundColor = '#ff0000'; // High priority (Red)
        if (event.priority === 'Medium') backgroundColor = '#ff9900'; // Medium priority (Orange)
        if (event.priority === 'Low') backgroundColor = '#00cc00'; // Low priority (Green)
        
        return {
            style: { backgroundColor },
        };
    };

    // Close modal
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className="p-4">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">School Scheduling Calendar</h1>
            </div>

            {/* Calendar */}
            <Calendar
                localizer={localizer}
                events={schedules.map(schedule => ({
                    ...schedule,
                    start: new Date(schedule.start),
                    end: schedule.end ? new Date(schedule.end) : addHours(new Date(schedule.start), 1), // Default to 1-hour event if no end time
                    title: schedule.title
                }))}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={(event) => alert(event.title)}
                eventPropGetter={eventPropGetter} // Apply colors based on priority
                views={['month', 'week', 'day']}
                defaultView="month"
            />

            {/* Modal for scheduling event */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center" onClick={closeModal}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <Modal 
                            slotInfo={selectedSlot} 
                            onAddEvent={addEvent} 
                            onClose={closeModal}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimelineResource;
