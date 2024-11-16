import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Import your global CSS if needed

// Create the root and render the App component
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
