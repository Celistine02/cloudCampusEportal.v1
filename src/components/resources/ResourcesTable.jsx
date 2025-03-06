import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import useSubjectStore from './../../../production/zustand/features/subjects/subjectStore';

const ResourcesTable = () => {
  // State to track number of resources displayed
  const [displayedResources, setDisplayedResources] = useState(8);
  const { subjects, loading, error } = useSubjectStore();

  // Function to load more resources
  const loadMoreResources = () => {
    // Increase the number of displayed resources by 8
    setDisplayedResources((prevCount) => prevCount + 8);
  };

  const allFiles = subjects.flatMap(subject => subject.files);

  return (
    <div className="py-4 sm:py-4 bg-white text-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <p className="text-base font-bold text-gray-800">Recently Uploaded Resources</p>
          </div>
        </div>

        {loading && <p>Loading resources...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && allFiles.length === 0 && <p>You don't have anything from your teachers yet.</p>}
        {!loading && !error && allFiles.length > 0 && (
          <div className="flex flex-col mt-4 lg:mt-8">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
                {/* table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                    {/* table titles */}
                    <thead className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
                      <tr>
                        <th className="py-3 px-6 text-left">
                          <div className="flex items-center">Resource Title</div>
                        </th>

                        <th className="py-3 px-6 text-left">
                          <div className="flex items-center">Date Added</div>
                        </th>

                        <th className="py-3 px-6 text-left">
                          <div className="flex items-center">Due Date</div>
                        </th>

                        <th className="py-3 px-6 text-left">
                          <div className="flex items-center">Action</div>
                        </th>
                      </tr>
                    </thead>

                    {/* table body */}
                    <tbody className="text-gray-800 text-sm font-light">
                      {allFiles
                        .slice(0, displayedResources)
                        .map((file, index) => (
                          <tr key={index} className="border-b border-gray-200 hover:bg-gray-200">
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {file.title}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {new Date(file.dateAdded).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-6 text-left whitespace-nowrap">
                              {file.dueDate ? new Date(file.dueDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td>
                              <div className="inline-flex items-center">
                                <FaDownload className="mr-1.5 h-2.5 w-2.5 text-gray-800" />
                                <a href={file.filePath} download className="text-gray-800">
                                  Download
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                {/* Show more button */}
                {displayedResources < allFiles.length && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                      onClick={loadMoreResources}
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

export default ResourcesTable;
