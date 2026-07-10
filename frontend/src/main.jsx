import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import { LanguageProvider } from "./language/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById("root")).render(

    <LanguageProvider>

        <AuthProvider>

            <App />

        </AuthProvider>

    </LanguageProvider>

);