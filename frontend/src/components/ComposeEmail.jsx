import React, { useState } from 'react';

const ComposeEmail = ({ onSend }) => {
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSending(true);
        const formData = new FormData(event.target);

        const newEmail = {
            to: formData.get('to'),
            subject: formData.get('subject'),
            content: formData.get('content'),
        };

        await onSend(newEmail);
        setIsSending(false);
    };

    return (
        <div className="compose-view">
            <form onSubmit={handleSubmit} className="compose-form">
                <input name="to" type="email" placeholder="To" required />
                <input name="subject" type="text" placeholder="Subject" required />
                <textarea name="content" placeholder="Message" required />
                <div className="compose-actions">
                    <button type="submit" disabled={isSending} className="send-button">
                        {isSending ? 'Sending...' : 'Send'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ComposeEmail;
