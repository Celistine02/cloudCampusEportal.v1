import { useState, useEffect } from "react";
import useFeeStore from './../../../production/zustand/features/fees/feeStore';

const PaymentTable = () => {
  const { fees, loading, error, getFeesByStudent } = useFeeStore();
  const [displayedPayments, setDisplayedPayments] = useState(8);

  useEffect(() => {
    // Replace with actual studentId and schoolId
    const studentId = "some-student-id";
    const schoolId = "some-school-id";
    getFeesByStudent(studentId, schoolId);
  }, [getFeesByStudent]);

  const loadMorePayments = () => {
    setDisplayedPayments((prevCount) => prevCount + 8);
  };

  return (
    <div className="py-4 sm:py-4 bg-white text-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-gray-800">All payments</p>
          </div>
        </div>

        {loading && <p>Loading payments...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && fees.length === 0 && <p>No payments found.</p>}
        {!loading && !error && fees.length > 0 && (
          <div className="flex flex-col mt-4 lg:mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
                <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                  <thead className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal hidden sm:table-header-group">
                    <tr>
                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Description</div>
                      </th>
                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Payment Method</div>
                      </th>
                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Payment Date</div>
                      </th>
                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Cashier</div>
                      </th>
                      <th className="py-3 px-6 text-left">
                        <div className="flex items-center">Amount</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800 text-sm font-light">
                    {fees.slice(0, displayedPayments).map((fee, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-200 flex flex-col sm:table-row">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {fee.period}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {fee.methodOfPayment}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {new Date(fee.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          {fee.cashier || "N/A"}
                        </td>
                        <td>
                          <div className="inline-flex items-center">
                            <svg
                              className={`mr-1.5 h-2.5 w-2.5 text-${fee.statusColor || "green-500"}`}
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <circle cx="4" cy="4" r="3" />
                            </svg>
                            {fee.currency} {fee.tuitionFee + fee.boardingFee}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {displayedPayments < fees.length && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                      onClick={loadMorePayments}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentTable;
