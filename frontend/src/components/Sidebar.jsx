import React from 'react';

function Sidebar({ view, setView, setShowCompose }) {
    return (
        <div className="w-64 p-4 bg-white dark:bg-gray-800 shadow-lg h-screen">
            <button
                onClick={() => setShowCompose(true)}
                className="w-full mb-4 py-3 px-4 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
            >
                ✏️ Compose
            </button>
            <div className="space-y-2">
                {['Inbox', 'Sent', 'Drafts', 'Archive'].map((folder) => (
                    <button
                        key={folder}
                        onClick={() => setView(folder.toLowerCase())}
                        className={`w-full px-4 py-2 text-left rounded-lg ${
                            view === folder.toLowerCase()
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                    >
                        {folder}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
