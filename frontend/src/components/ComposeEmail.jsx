import React, { useState } from "react";

const ComposeEmail = ({ onSend, onCancel }) => {
    const [email, setEmail] = useState({ to: "", subject: "", content: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmail((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSend(email);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Compose Email</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="to" className="block text-sm font-medium">
                        To
                    </label>
                    <input
                        type="email"
                        id="to"
                        name="to"
                        required
                        value={email.to}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium">
                        Subject
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        value={email.subject}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        rows="5"
                        required
                        value={email.content}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-lg">
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ComposeEmail;
