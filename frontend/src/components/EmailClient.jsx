import React, { useState, useEffect } from "react";
import Settings from "./Settings";

const API_URL = "/api";

export default function EmailClient() {
  const [emails, setEmails] = useState([]);
  const [view, setView] = useState("inbox");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    fetchEmails("inbox");
  }, []);

  const fetchEmails = async (folder) => {
    const res = await fetch(`${API_URL}/emails?folder=${folder}`);
    const data = await res.json();
    setEmails(data);
    setView(folder);
  };

  return (
    <div>
      <header>
        <h1>LightMail</h1>
        <button onClick={() => setShowSettings(true)}>⚙️</button>
      </header>
      {showSettings ? (
        <Settings onClose={() => setShowSettings(false)} />
      ) : (
        <main>
          {emails.map((email) => (
            <div key={email.id} onClick={() => setSelectedEmail(email)}>
              <h2>{email.subject}</h2>
              <p>{email.content}</p>
            </div>
          ))}
        </main>
      )}
    </div>
  );
}
