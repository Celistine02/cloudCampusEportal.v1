import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import DatePicker from 'react-datepicker';
import { BiLock } from 'react-icons/bi'; // Example import for lock icon
import { IoMdSchool } from 'react-icons/io'; // Example import for school icon
import { HiOutlineUserGroup } from 'react-icons/hi'; // Example import for user group icon
import { AiOutlineMail } from 'react-icons/ai'; // Example import for mail icon
import { FiPhone } from 'react-icons/fi'; // Example import for phone icon
import { MdLocationOn } from 'react-icons/md'; // Example import for location icon
import 'react-datepicker/dist/react-datepicker.css';
import { Modal, Button, Label, FileInput } from "flowbite-react";

const Register = () => {
    const [showModal, setShowModal] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [modalSize, setModalSize] = useState('sm');
    const [loadingEmail, setLoadingEmail] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [showSchoolModal, setShowSchoolModal] = useState(false);
    const [schoolFormLoading, setSchoolFormLoading] = useState(false);
    const [establishedYear, setEstablishedYear] = useState(new Date());

    const schoolTypes = ["Private", "Public"]; // Dropdown options for school type

    const handleSchoolTypeChange = (e) => {
        // Handle school type change logic here
    };

    useEffect(() => {
        let timer;
        if (loadingGoogle) {
            timer = setTimeout(() => {
                setLoadingGoogle(false);
            }, 3000); // Set timeout for Google auth loader to 3 seconds
        }
        return () => clearTimeout(timer);
    }, [loadingGoogle]);

    const handleEmailSignUp = async () => {
        setLoadingEmail(true);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate loading/waiting for 2 seconds
        setLoadingEmail(false);
        setShowModal(true);
        setModalSize('sm');
    };

    const handleRoleSelection = (role) => {
        setUserRole(role);
        if (role === 'school') {
            setShowModal(false);
            setShowSchoolModal(true);
        } else {
            setModalSize('lg');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalSize('sm');
    };

    const handleCloseSchoolModal = () => {
        setShowSchoolModal(false);
    };

    const handleSubmitSchoolForm = async (e) => {
        e.preventDefault();
        setSchoolFormLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate form submission
        setSchoolFormLoading(false);
        setShowSchool

Modal(false);
    };

    return (
        <>
            {showModal && (
                <Modal show={showModal} size={modalSize} onClose={handleCloseModal}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-4">
                            <Button onClick={() => handleRoleSelection('student')} color="gray">Student</Button>
                            <Button onClick={() => handleRoleSelection('school')} color="gray">School</Button>
                            <Button onClick={() => handleRoleSelection('teacher')} color="gray">Teacher</Button>
                        </div>
                    </Modal.Body>
                </Modal>
            )}

            {showSchoolModal && (
                <Modal show={showSchoolModal} size="lg" onClose={handleCloseSchoolModal}>
                    <Modal.Header />
                    <Modal.Body>
                        <form onSubmit={handleSubmitSchoolForm} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <Label htmlFor="schoolName">School Name</Label>
                                <input type="text" id="schoolName" name="schoolName" className="input-field" required />

                                <Label htmlFor="address">Address</Label>
                                <input type="text" id="address" name="address" className="input-field" required />

                                <Label htmlFor="contactEmail">Contact Email</Label>
                                <input type="email" id="contactEmail" name="contactEmail" className="input-field" required />

                                <Label htmlFor="contactNumber">Contact Number</Label>
                                <input type="tel" id="contactNumber" name="contactNumber" className="input-field" pattern="[0-9]{10}" required />

                                <Label htmlFor="principalName">Principal Name</Label>
                                <input type="text" id="principalName" name="principalName" className="input-field" required />

                                <Label htmlFor="establishedYear">Established Year</Label>
                                <DatePicker selected={establishedYear} onChange={date => setEstablishedYear(date)} showYearPicker dateFormat="yyyy" className="input-field" required />

                                <Label htmlFor="schoolType">School Type</Label>
                                <select id="schoolType" name="schoolType" className="input-field" onChange={handleSchoolTypeChange} required>
                                    <option value="" disabled>Select school type</option>
                                    {schoolTypes.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>

                                <Label htmlFor="numberOfStudents">Number of Students</Label>
                                <input type="number" id="numberOfStudents" name="numberOfStudents" className="input-field" min="0" required />

                                <Label htmlFor="numberOfTeachers">Number of Teachers</Label>
                                <input type="number" id="numberOfTeachers" name="numberOfTeachers" className="input-field" min="0" required />

                                <Label htmlFor="website">Website</Label>
                                <input type="url" id="website" name="website" className="input-field" required />

                                <Label htmlFor="password">Password</Label>
                                <input type="password" id="password" name="password" className="input-field" required />
                            </div>
                            <Button type="submit">
                                {schoolFormLoading ? <ClipLoader color="#ffffff" loading={schoolFormLoading} size={20} /> : 'Submit'}
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            )}
        </>
    );
};

export default Register;
