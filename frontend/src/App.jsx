import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Inbox from './components/Inbox';
import ComposeEmail from './components/ComposeEmail';
import './App.css'; // Ensure this file exists for minimal styling

const API_URL = 'http://localhost:5000';

function App() {
    const [view, setView] = useState('inbox'); // Current folder view
    const [emails, setEmails] = useState([]); // Emails to display
    const [selectedEmail, setSelectedEmail] = useState(null); // Selected email for detailed view
    const [showCompose, setShowCompose] = useState(false); // Show compose email form
    const [isDarkMode, setIsDarkMode] = useState(false); // Light/Dark mode toggle

    // Fetch emails whenever `view` changes
    useEffect(() => {
        fetchEmails(view);
    }, [view]);

    // Check and apply system default theme on initial load
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
        document.documentElement.classList.toggle('dark', prefersDark);
    }, []);

    // Fetch emails from backend
    const fetchEmails = async (folder) => {
        try {
            const response = await fetch(`${API_URL}/emails?folder=${folder}`);
            if (!response.ok) throw new Error(`Error fetching emails: ${response.statusText}`);
            const data = await response.json();
            setEmails(data);
        } catch (error) {
            console.error(error);
            setEmails([]); // Clear emails on error
        }
    };

    // Toggle dark mode
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.documentElement.classList.toggle('dark');
    };

    // Send email handler
    const sendEmail = async (email) => {
        try {
            const response = await fetch(`${API_URL}/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(email),
            });
            if (!response.ok) throw new Error('Failed to send email');
            alert('Email sent successfully!');
            setShowCompose(false);
            setView('sent'); // Switch to sent folder
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4 bg-gray-100 dark:bg-gray-800 shadow">
                <h1 className="text-2xl font-bold">LightMail</h1>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleTheme}
                        className="bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex flex-1">
                {/* Sidebar */}
                <Sidebar view={view} setView={setView} setShowCompose={setShowCompose} />

                {/* Main Content */}
                <main className="flex-1 p-6">
                    {showCompose ? (
                        <ComposeEmail onSend={sendEmail} />
                    ) : selectedEmail ? (
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                            <button
                                onClick={() => setSelectedEmail(null)}
                                className="mb-4 text-blue-500 hover:text-blue-600"
                            >
                                ← Back
                            </button>
                            <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
                            <p className="mt-4">{selectedEmail.content}</p>
                            <span className="text-sm text-gray-500">{selectedEmail.time}</span>
                        </div>
                    ) : (
                        <Inbox emails={emails} setSelectedEmail={setSelectedEmail} />
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;
