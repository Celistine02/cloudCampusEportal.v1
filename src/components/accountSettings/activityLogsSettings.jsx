import React from 'react'
import { Key, Mail, Image, Bell } from "lucide-react";

function activityLogsSettings() {
  const data = [
    {
      id: '#29345',
      description: 'Account password changed',
      date: '07 January, 2022',
      status: 'Complete',
      icon: <Key />
    },
    {
      id: '#23848',
      description: 'Updated user email',
      date: '07 January, 2022',
      status: 'Complete',
      icon: <Mail />
    },
    {
      id: '#29346',
      description: 'Profile photo updated',
      date: '07 January, 2022',
      status: 'Complete',
      icon: <Image />
    },
    {
      id: '#29347',
      description: 'Missed 13 notifications',
      date: '07 January, 2022',
      status: 'Active',
      icon: <Bell />
    },
    // ... more data
  ];

  return (
    <div className="py-12 bg-gray-100 text-gray-800 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-800">Activity Logs</p>

          <div className="inline-flex items-center justify-end">
            <label htmlFor="sort" className="text-sm font-medium text-gray-800"> Sort: </label>
            <select id="sort" name="sort" className="block w-full py-2 pl-1 pr-10 text-base border-gray-300 border-none rounded-lg focus:outline-none focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm">
              <option>Popularity</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col mt-4 lg:mt-8">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <table className="min-w-full lg:divide-y lg:divide-gray-300">
                <thead className="hidden lg:table-header-group">
                  <tr>
                    <th className="py-3.5 pl-4 pr-3 text-left text-sm whitespace-nowrap font-medium text-gray-800 sm:pl-6 md:pl-0">
                      <div className="flex items-center">
                        ID
                        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                    </th>

                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-800">
                      <div className="flex items-center">
                        Description
                        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                    </th>

                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-800">
                      <div className="flex items-center">
                        Date
                        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                    </th>

                    <th className="py-3.5 px-3 text-left text-sm whitespace-nowrap font-medium text-gray-800">
                      <div className="flex items-center">
                        Status
                        <svg className="w-4 h-4 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                      </div>
                    </th>

                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6 md:pr-0">
                      <span className="sr-only"> Actions </span>
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-300">
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td className="hidden py-4 pl-4 pr-3 text-sm font-medium text-gray-800 lg:table-cell whitespace-nowrap sm:pl-6 md:pl-0">{item.id}</td>

                      <td className="px-4 py-4 text-sm font-bold text-gray-800 whitespace-nowrap">
                        <div className="inline-flex items-center">
                          {item.icon}
                          {item.description}
                        </div>
                        <div className="space-y-1 lg:hidden pl-11">
                          <p className="text-sm font-medium text-gray-800">{item.id}</p>
                          <p className="text-sm font-medium text-gray-800">{item.date}</p>
                        </div>
                      </td>

                      <td className="hidden px-4 py-4 text-sm font-medium text-gray-800 lg:table-cell whitespace-nowrap">{item.date}</td>

                      <td className="hidden px-4 py-4 text-sm font-medium text-gray-800 lg:table-cell whitespace-nowrap">{item.status}</td>

                      <td className="px-4 py-4 text-sm font-medium text-right text-gray-800 whitespace-nowrap">
                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-gray-400 transition-all duration-200 bg-gray-100 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600">
                          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                          </svg>
                        </button>
                        <div className="mt-1 lg:hidden">
                          <p>{item.status}</p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default activityLogsSettings