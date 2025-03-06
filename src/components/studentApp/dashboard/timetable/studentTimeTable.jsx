import React, { useState, useEffect, useRef } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import useStudentTimetableStore from './../../../../../production/zustand/features//students/timetable';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

const StudentTimeTable = () => {
    const [subjects, setSubjects] = useState([]);
    const calendarRef = useRef(null);
    const { studentTimetables, fetchTimetablesForStudent } = useStudentTimetableStore();

    useEffect(() => {
        const fetchSubjects = async () => {
            const fetchedSubjects = await fetch('/api/subjects').then(res => res.json());
            setSubjects(fetchedSubjects);
        };

        const studentId = 'someStudentId'; // Replace with actual student ID
        fetchSubjects();
        fetchTimetablesForStudent(studentId);
    }, [fetchTimetablesForStudent]);

    const getColorForSubject = (subjectName) => {
        const colors = [
            '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#FF8C33', 
            '#33FFF5', '#8C33FF', '#FF3333', '#33FF8C', '#FF5733'
        ];
        const index = subjects.findIndex(subject => subject.name === subjectName);
        return colors[index % colors.length];
    };

    const addEvent = async (newEvent) => {
        newEvent.color = getColorForSubject(newEvent.title);
        await fetch('/api/timetables', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newEvent),
        });
    };

    const handleSelectSlot = (slotInfo) => {
        // Removed modal opening logic
    };

    const handleSelectEvent = async (event) => {
        await fetch(`/api/timetables/${event._id}`, { method: 'DELETE' });
    };

    const eventPropGetter = (event) => {
        return {
            style: { backgroundColor: event.color || '#3788d8' },
        };
    };

    const exportToPDF = () => {
        if (calendarRef.current) {
            html2canvas(calendarRef.current).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('landscape');
                pdf.addImage(imgData, 'PNG', 10, 10, 280, 150);
                pdf.save("timetable.pdf");
            });
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex justify-center">
                <button 
                    onClick={exportToPDF} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Export Timetable
                </button>
            </div>

            <div ref={calendarRef}>
                <Calendar
                    localizer={localizer}
                    events={studentTimetables.map(schedule => ({
                        ...schedule,
                        start: new Date(schedule.start),
                        end: new Date(schedule.end),
                        title: schedule.title
                    }))}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 600 }}
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={eventPropGetter}
                    views={['month', 'week', 'day']}
                    defaultView="month"
                />
            </div>
        </div>
    );
};

export default StudentTimeTable;
