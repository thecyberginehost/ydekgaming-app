// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";

// Import from aws-amplify v5
import { Amplify } from "aws-amplify";
// Config file generated by `amplify init` + `amplify add auth`
import awsExports from "./aws-exports";

// Tailwind global CSS
import "./styles/Tailwind.css";
import App from "./App";

// Configure Amplify with your backend resources
Amplify.configure(awsExports);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
