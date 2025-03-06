import React, { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const CLOUDINARY_UPLOAD_PRESET = 'unsigned_upload';
const CLOUDINARY_CLOUD_NAME = 'dxbnujjmw';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image`;

const HomeworkTable = () => {
    const [formFilter, setFormFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState(null);
    const [termFilter, setTermFilter] = useState('all');
    const [loadMore, setLoadMore] = useState(4);
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [tempFiles, setTempFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [uploadErrors, setUploadErrors] = useState([]);

    const handleLoadMore = () => setLoadMore(loadMore + 4);

    // Fetch documents from Cloudinary
    useEffect(() => {
        const fetchUploadedFiles = async () => {
            try {
                const response = await axios.get(CLOUDINARY_API_URL, {
                    params: {
                        max_results: 50, // Adjust this based on how many you want to fetch
                    }
                });
                const files = response.data.resources.map(file => ({
                    name: file.public_id,
                    url: file.secure_url,
                    description: 'Homework document'
                }));
                setUploadedFiles(files);
            } catch (error) {
                console.error("Error fetching Cloudinary resources:", error);
            }
        };
        fetchUploadedFiles();
    }, []);

    const onDrop = useCallback(async (acceptedFiles) => {
        const tempFileList = acceptedFiles.map(file => ({
            file,
            name: file.name,
            description: 'Homework document',
            uploadedBy: 'Teacher',
            progress: 0
        }));
        setTempFiles(tempFileList);

        tempFileList.forEach(async (tempFile) => {
            const formData = new FormData();
            formData.append('file', tempFile.file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

            try {
                const response = await axios.post(CLOUDINARY_UPLOAD_URL, formData, {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(prev => ({ ...prev, [tempFile.name]: percentCompleted }));
                    }
                });

                const fileUrl = response.data.secure_url;
                setUploadedFiles(prevFiles => [...prevFiles, { name: tempFile.name, description: tempFile.description, url: fileUrl }]);

            } catch (err) {
                console.error("Upload error:", err);
                setUploadErrors(prevErrors => [...prevErrors, { name: tempFile.name, error: err.message }]);
            }
        });

        setIsDragging(false);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        onDragEnter: () => setIsDragging(true),
        onDragLeave: () => setIsDragging(false),
    });

    const filteredFiles = uploadedFiles.filter(file => 
        (formFilter === 'all' || file.level === formFilter) && 
        (statusFilter === 'all' || file.status === statusFilter) &&
        (dateFilter === null || new Date(file.date).toDateString() === dateFilter.toDateString()) &&
        (termFilter === 'all' || file.term === termFilter)
    );

    return (
        <div className="overflow-hidden bg-white border border-gray-200 shadow rounded-xl p-4">
            {/* Render components and file upload elements */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.length > 0 ? (
                    filteredFiles.slice(0, loadMore).map((file, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                                {file.name}
                            </a>
                            <p className="text-gray-500 text-xs mt-2">{file.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-full">There is no content at this time.</p>
                )}
            </div>

            {loadMore < filteredFiles.length && (
                <div className="text-center mt-4">
                    <button onClick={handleLoadMore} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Load More
                    </button>
                </div>
            )}

            {uploadErrors.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-red-500 text-lg font-medium">Upload Errors:</h3>
                    <ul className="list-disc list-inside text-red-500">
                        {uploadErrors.map((error, index) => (
                            <li key={index}>{error.name}: {error.error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HomeworkTable;
