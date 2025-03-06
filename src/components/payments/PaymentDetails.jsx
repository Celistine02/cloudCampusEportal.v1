import { useEffect } from 'react';
import { motion } from 'framer-motion';
import useFeeStore from './../../../production/zustand/features/fees/feeStore';

const PaymentDetails = () => {
  const { fees, loading, error } = useFeeStore();

  useEffect(() => {
    // Animation logic can be added here
  }, []);

  if (loading) {
    return <p>Loading payment details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (fees.length === 0) {
    return <p>No payment details available.</p>;
  }

  const latestFee = fees[0]; // Assuming the latest fee is the first in the array

  return (
    <div className="relative bg-white text-gray-800">
      <div className="py-4 bg-gray-100 sm:py-16 lg:py-4">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 py-4 border-t border-b border-gray-300 xl:grid-cols-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="pb-10 lg:pb-0"
            >
              <p className="text-sm font-medium">Fees Due</p>
              <div className="inline-flex items-center mt-3">
                <motion.p 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  className="text-2xl font-bold bg-gray-200 rounded-xl px-2.5 py-1.5 text-red-500"
                >
                  - ${latestFee.balance}
                </motion.p>
              </div>
              <p className="mt-4 text-xs font-medium">
                {latestFee.period.toUpperCase()}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="pb-10 pl-10 border-gray-300 xl:pb-0 xl:border-l"
            >
              <p className="text-sm font-medium">
                Method of Payment
              </p>
              <div className="inline-flex items-center mt-3">
                <p className="text-2xl font-bold">{latestFee.methodOfPayment.toUpperCase()}</p>
              </div>
              <p className="mt-4 text-xs font-medium">
                {latestFee.currency.toUpperCase()}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-10 border-t xl:border-l xl:py-0 lg:border-gray-300 xl:pl-10 xl:border-t-0"
            >
              <p className="text-sm font-medium">
                Amount Paid
              </p>
              <div className="inline-flex items-center mt-3">
                <p className="text-2xl font-bold">${latestFee.tuitionFee}</p>
              </div>
              <p className="mt-4 text-xs font-medium">
                {latestFee.currency.toUpperCase()}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="py-10 pl-10 border-t border-gray-300 xl:py-0 xl:border-l xl:border-t-0"
            >
              <p className="text-sm font-medium">
                Boarding Fee
              </p>
              <div className="inline-flex items-center mt-3">
                <p className="text-xl font-bold">${latestFee.boardingFee}</p>
              </div>
              <p className="mt-4 text-xs font-medium">
                {latestFee.currency.toUpperCase()}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-1 sm:col-span-2 pt-10 border-t xl:col-span-1 xl:py-0 xl:border-l xl:border-t-0 xl:border-gray-300 xl:pl-10"
            >
              <p className="text-sm font-medium">
                This Terms Fees is 
              </p>
              <div className="inline-flex items-center mt-3">
                <p className="text-xl font-bold">${latestFee.isSupposedToPay}</p>
              </div>
              <p className="mt-4 text-xs font-medium">
                {latestFee.currency.toUpperCase()}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
