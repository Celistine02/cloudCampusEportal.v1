import React, { useState, useEffect } from 'react';
import useFeeStore from './../../../production/zustand/features/fees/feeStore';

const Notification = () => {
    const [isOpen, setIsOpen] = useState(true);
    const { fees, loading, error } = useFeeStore();

    const handleClose = () => {
        setIsOpen(false);
    };

    const latestFee = fees[0]; // Assuming the latest fee is the first in the array

    useEffect(() => {
        if (latestFee && latestFee.balance <= 0) {
            handleClose(); // Close the modal if the balance is 0 or less
        }
    }, [latestFee]);

    return (
        <div className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md mx-auto ${isOpen ? 'block' : 'hidden'} sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl`}>
            <div className={`rounded-lg shadow-lg overflow-hidden p-4 ${latestFee && latestFee.balance === 0 ? 'bg-green-100' : 'bg-red-100'} animate-pulse`}>
                <div className="flex items-center justify-between">
                    <svg className={`flex-shrink-0 w-5 h-5 ${latestFee && latestFee.balance === 0 ? 'text-green-500' : 'text-red-500'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        {latestFee && latestFee.balance === 0 ? (
                            <p className="text-sm font-bold text-green-900">You're all caught up on your payments!</p>
                        ) : (
                            <p className="text-sm font-bold text-red-900">You have due fees.</p>
                        )}
                        {loading && <p>Loading fees...</p>}
                        {error && <p className="text-red-500">Error: {error}</p>}
                        {fees.length === 0 ? (
                            <p>No fees due.</p>
                        ) : (
                            <div>
                                {latestFee && latestFee.balance !== 0 && (
                                    <>
                                        <p className="mt-4 text-xl font-bold text-red-500">Balance: ${latestFee.balance}</p>
                                        <p className="mt-2 text-sm text-gray-600">Due Date: {latestFee.dueDate}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                    <button type="button" className={`ml-auto bg-transparent rounded-full p-2 ${latestFee && latestFee.balance === 0 ? 'text-green-500 hover:bg-green-200' : 'text-red-500 hover:bg-red-200'} transition-all duration-200 focus:outline-none focus:ring-2 ${latestFee && latestFee.balance === 0 ? 'focus:ring-green-500' : 'focus:ring-red-500'}`} onClick={handleClose}>
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Notification;
