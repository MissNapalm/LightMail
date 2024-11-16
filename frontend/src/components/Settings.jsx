import React, { useState } from "react";

export default function Settings({ onClose }) {
  const [domains, setDomains] = useState(["localhost"]);

  const addDomain = () => {
    const newDomain = prompt("Enter new domain:");
    if (newDomain) setDomains([...domains, newDomain]);
  };

  const removeDomain = (domain) => {
    setDomains(domains.filter((d) => d !== domain));
  };

  return (
    <div>
      <h2>Settings</h2>
      <button onClick={onClose}>Close</button>
      <ul>
        {domains.map((domain) => (
          <li key={domain}>
            {domain}
            <button onClick={() => removeDomain(domain)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addDomain}>Add Domain</button>
    </div>
  );
}
