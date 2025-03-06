import React, { useState, useEffect, useRef } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from 'date-fns';
import Modal from './Modal';
import enUS from 'date-fns/locale/en-US';
import useSubjectStore from './../../../../production/zustand/features/teachers/createSubjects';
import useTimetableStore from './../../../../production/zustand/features/teachers/timetable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const locales = { 'en-US': enUS };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

const TeacherTimeTable = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [formFilter, setFormFilter] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { subjects, getSubjectsByTeacher } = useSubjectStore();
    const { timetables, fetchTimetables, createTimetable, deleteTimetable } = useTimetableStore();
    const calendarRef = useRef(null);

    useEffect(() => {
        getSubjectsByTeacher();
        fetchTimetables();
    }, [getSubjectsByTeacher, fetchTimetables]);

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
        await createTimetable(newEvent);
        setModalOpen(false);
    };

    const handleSelectSlot = (slotInfo) => {
        setSelectedSlot(slotInfo);
        setModalOpen(true);
    };

    const handleSelectEvent = async (event) => {
        setSelectedEvent(event);
        await deleteTimetable(event._id);
    };

    const eventPropGetter = (event) => {
        return {
            style: { backgroundColor: event.color || '#3788d8' },
        };
    };

    const filteredSchedules = timetables.filter(schedule => 
        (formFilter ? schedule.form === formFilter : true)
    );

    const uniqueForms = Array.from(new Set(subjects.flatMap(subject => subject.form)));

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
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Create Your Timetable</h1>
            </div>

            <div className="mb-4">
                <label className="mr-2">Form:</label>
                <select 
                    value={formFilter} 
                    onChange={(e) => setFormFilter(e.target.value)} 
                    className="border p-1"
                >
                    <option value="">All Forms</option>
                    {uniqueForms.map((form, index) => (
                        <option key={index} value={form}>{form}</option>
                    ))}
                </select>
            </div>

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
                    events={filteredSchedules.map(schedule => ({
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

            {modalOpen && (
                <Modal 
                    slotInfo={selectedSlot} 
                    onAddSubject={addEvent} 
                    onClose={() => setModalOpen(false)}
                />
            )}
        </div>
    );
};

export default TeacherTimeTable;
