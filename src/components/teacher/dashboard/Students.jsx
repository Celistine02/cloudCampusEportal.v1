import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { FaUserClock } from "react-icons/fa";
import { FaUserTimes } from "react-icons/fa";

const dummyStudents = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    phoneNumber: "123-456-7890",
    location: "New York",
    approvalStatus: "approved",
    color: "green",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phoneNumber: "987-654-3210",
    location: "Los Angeles",
    approvalStatus: "pending",
    color: "yellow",
  },
  {
    _id: "3",
    name: "Alice Johnson",
    email: "alice@example.com",
    phoneNumber: "555-555-5555",
    location: "Chicago",
    approvalStatus: "declined",
    color: "red",
  },
];

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showActivityDetailsModal, setShowActivityDetailsModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    setStudents(dummyStudents);
  }, []);

  const handleShowActivityDetailsModal = (student) => {
    setSelectedActivity(student);
    setShowActivityDetailsModal(true);
  };

  const handleCloseActivityDetailsModal = () => {
    setShowActivityDetailsModal(false);
  };

  //function to handle FlagSuspiciousActivity
  const handleFlagSuspiciousActivity = () => {
    console.log("Account flagged successfully");
    console.log(selectedActivity.status);

    // Find the index of the selected student in the students array
    const studentIndex = students.findIndex(
      (student) => student._id === selectedActivity._id
    );

    // Create a copy of the students array
    const updatedStudents = [...students];

    // Update the status of the selected student
    updatedStudents[studentIndex] = {
      ...updatedStudents[studentIndex],
      approvalStatus: "declined",
      color: "yellow",
    };

    // Update the students state with the modified array
    setStudents(updatedStudents);

    setShowActivityDetailsModal(false);
  };

  //function to activate account
  const handleActivateStudentAccount = () => {
    console.log("Account activated successfully");
    console.log(selectedActivity.status);

    // Find the index of the selected student in the students array
    const studentIndex = students.findIndex(
      (student) => student._id === selectedActivity._id
    );

    // Create a copy of the students array
    const updatedStudents = [...students];

    // Update the status of the selected student
    updatedStudents[studentIndex] = {
      ...updatedStudents[studentIndex],
      approvalStatus: "approved",
      color: "green",
    };

    // Update the students state with the modified array
    setStudents(updatedStudents);

    setShowActivityDetailsModal(false);
  };

  //function to handle the closeStudentAccount
  const handleCloseStudentAccount = () => {
    console.log("Account closed successfully");
    console.log(selectedActivity.status);

    // Find the index of the selected student in the students array
    const studentIndex = students.findIndex(
      (student) => student._id === selectedActivity._id
    );

    // Create a copy of the students array
    const updatedStudents = [...students];

    // Update the status of the selected student
    updatedStudents[studentIndex] = {
      ...updatedStudents[studentIndex],
      approvalStatus: "declined",
      color: "red",
    };

    // Update the students state with the modified array
    setStudents(updatedStudents);

    setShowActivityDetailsModal(false);
  };

  return (
    <div className="py-4 sm:py-4 font-mainFont bg-gray-100 text-gray-800">
      <div
        className={`px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 ${
          showActivityDetailsModal ? "filter blur-sm" : ""
        }`}
      >
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-gray-800">Students</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to="/admin/students"
              className="inline-flex items-center text-xs font-semibold tracking-widest text-gray-600 uppercase hover:text-gray-800"
            >
              See all Students
              <svg
                className="w-4 h-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {students.length === 0 ? (
            <p className="text-center col-span-full">You don't have any students at the moment.</p>
          ) : (
            students.map((student, index) => (
              <div key={index}>
                <Card
                  onClick={() => handleShowActivityDetailsModal(student)}
                  className="cursor-pointer max-w-sm bg-gray-200 hover:bg-gray-300"
                >
                  <div className="flex flex-col items-center pb-10">
                    {student.approvalStatus === "approved" && <FaUser className="text-4xl mb-4"/>}
                    {student.approvalStatus === "pending" && <FaUserClock className="text-4xl mb-4"/>}
                    {student.approvalStatus === "declined" && <FaUserTimes className="text-4xl mb-4"/>}
                    <h5 className="mb-1 text-md font-medium text-gray-800">
                      {student.name}
                    </h5>
                    <div className="inline-flex items-center">
                      <svg
                        className={`mr-1.5 h-2.5 w-2.5 text-${student.color}-500`}
                        fill="currentColor"
                        viewBox="0 0 8 8"
                      >
                        <circle cx="4" cy="4" r="3" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {student.approvalStatus}
                      </span>
                    </div>
                    <div className="mt-4 flex space-x-3 lg:mt-6">
                      <Link>
                        <button
                          onClick={handleShowActivityDetailsModal}
                          className="inline-flex items-center rounded-lg bg-blue-500 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-600 "
                        >
                          Register
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal to display student information */}
      {showActivityDetailsModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-sm">
        <div className="flex items-center justify-center min-h-screen px-4 py-6">
          <div className="bg-gray-100 rounded-lg shadow-lg max-w-md w-full">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-16 h-16 mx-auto text-gray-800"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  <p className="mt-5 text-xl font-bold text-gray-800">
                    {selectedActivity.name}
                  </p>
                  {/* email */}
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 mt-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="mt-2 text-md font-medium text-gray-600">
                        {selectedActivity.email}
                      </p>
                    </div>
                  </div>
                  {/* end email */}
                  {/* id */}
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 mt-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="mt-2 text-md font-medium text-gray-600">
                        {selectedActivity._id}
                      </p>
                    </div>
                  </div>
                  {/* end id */}

                  {/* phone number */}
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 mt-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="mt-2 text-md font-medium text-gray-600">
                        {selectedActivity.phoneNumber}
                      </p>
                    </div>
                  </div>
                  {/* end phone */}
                  {/* location */}
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-4 h-4 mt-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="mt-2 text-md font-medium text-gray-600">
                        {selectedActivity.location}
                      </p>
                    </div>
                  </div>
                  {/* end location */}
                  <div className="mt-8">
                    <button
                      onClick={handleCloseActivityDetailsModal}
                      type="button"
                      className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold leading-5 text-white transition-all duration-200 bg-red-500 border border-transparent rounded-md hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 hover:bg-red-600"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* end modal */}
    </div>
  );
};

export default Students;
