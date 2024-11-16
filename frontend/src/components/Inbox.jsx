import React from 'react';

const Inbox = ({ emails, setSelectedEmail }) => {
    return (
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Inbox</h2>
            {emails.length > 0 ? (
                <div className="space-y-4">
                    {emails.map((email) => (
                        <div
                            key={email.id}
                            onClick={() => setSelectedEmail(email)}
                            className="p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md cursor-pointer"
                        >
                            <h3 className="font-bold text-gray-800 dark:text-gray-100">{email.subject}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                {email.content.slice(0, 50)}...
                            </p>
                            <span className="text-xs text-gray-500">{email.time}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 dark:text-gray-400">No emails found.</p>
            )}
        </div>
    );
};

export default Inbox;
