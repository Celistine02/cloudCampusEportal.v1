import { useState } from "react"

// import the tabs forms
import AccountInformationSettings from "./accountInformationSettings"
import SecurityandPasswordSettings from "./securityandPasswordSettings"
import NotificationsAndAlertsSettings from "./notificationsAndAlertsSettings"
import ActivityLogsSettings from "./activityLogsSettings"
import LogoutHeader from "./../../components/logout/logOutHeader" // Import the LogoutHeader component
const SettingsTabs = () => {
    const tabItems = ["Account Information", "Security and Password", "Notifications and Alerts", "Activity Logs", "Logout"]
    const [selectedItem, setSelectedItem] = useState(0)

    // Define a function to render the content based on the selected tab
    const renderTabContent = () => {
        if (selectedItem === 0) {
            return <div>
                <AccountInformationSettings />
            </div>;

        } else if (selectedItem === 1) {
            return <div>
                <SecurityandPasswordSettings />
            </div>;

        } else if (selectedItem === 2) {
            return <div>
                <NotificationsAndAlertsSettings />
            </div>;

        } else if (selectedItem === 3) {
            return <div>
                <ActivityLogsSettings />
            </div>;

        } else if (selectedItem === 4) {
            // Directly render the LogoutHeader component
            return <div>
                <LogoutHeader />
            </div>;

        } else {
            return null; // No content for other tabs
        }
    };

    return (
        <div className="bg-white text-black">
            <div className="flex flex-col sm:flex-row pt-8 font-mainFont">
                <div className="inline-block sm:mr-10">
                    <div>
                        <ul role="tablist" className="hidden max-w-screen-xl border-l-2 flex-col gap-y-3 text-sm sm:flex">
                            {
                                tabItems.map((item, idx) => (
                                    <li key={idx} className={`border-l-4 ${selectedItem === idx ? "border-gray-300 " : "border-gray-200 text-gray-500"}`}>
                                        <button
                                            role="tab"
                                            aria-selected={selectedItem === idx ? true : false}
                                            aria-controls={`tabpanel-${idx + 1}`}
                                            className="py-2.5 px-4 rounded-lg duration-150 hover:text-black hover:bg-gray-200 active:bg-gray-200 font-medium"
                                            onClick={() => setSelectedItem(idx)}
                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>

                        <div className="relative text-gray-500 sm:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none w-5 h-5 absolute right-2 inset-y-0 my-auto">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                            <select value={tabItems[selectedItem]} className="p-3 w-full bg-transparent appearance-none outline-none border rounded-lg shadow-sm focus:border-indigo-600"
                                onChange={(e) => setSelectedItem(tabItems.indexOf(e.target.value))}
                            >
                                {
                                    tabItems.map((item, idx) => (
                                        <option key={idx} idx={idx}>
                                            {item}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <div className="inline-block mt-1">
                    {renderTabContent()}
                </div>
            </div>
        </div>

    )
}

export default SettingsTabs

