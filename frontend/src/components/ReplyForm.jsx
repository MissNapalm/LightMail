import React, { useState } from 'react';

const ReplyForm = ({ email, onSend, onCancel }) => {
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSending(true);

        const formData = new FormData(event.target);
        const replyEmail = {
            to: email.from, // Pre-filled with the sender's address
            subject: `Re: ${email.subject}`, // Pre-filled with "Re:" prefix
            content: formData.get('content'), // Message body
        };

        await onSend(replyEmail);
        setIsSending(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Reply to Email</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* To Field */}
                <div>
                    <label htmlFor="to" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        To
                    </label>
                    <input
                        type="email"
                        name="to"
                        id="to"
                        value={email.from} // Locked to the sender
                        readOnly
                        className="mt-1 block w-full p-3 border rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700"
                    />
                </div>

                {/* Subject Field */}
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Subject
                    </label>
                    <input
                        type="text"
                        name="subject"
                        id="subject"
                        value={`Re: ${email.subject}`} // Locked to "Re: <original subject>"
                        readOnly
                        className="mt-1 block w-full p-3 border rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700"
                    />
                </div>

                {/* Content Field */}
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Message
                    </label>
                    <textarea
                        name="content"
                        id="content"
                        rows="10"
                        placeholder="Write your reply here..."
                        required
                        className="mt-1 block w-full p-3 border rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSending}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSending ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ReplyForm;
