import { useState } from 'react';

function ThemeToggle() {
    // 1. STATE SETUP
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 2. THE TOGGLE FUNCTION
    function handleToggle() {
        setIsDarkMode(!isDarkMode);
    }

    // 3. THE UI (JSX)
    return (
        <div className={`p-10 text-center rounded-xl transition-all ${
            isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}>
            <h2 className="text-2xl font-bold mb-4">
                Current Mode: {isDarkMode ? 'Dark 🌙' : 'Light ☀️'}
            </h2>

            <button 
                onClick={handleToggle}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
                Switch to {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
        </div>
    );
}

export default ThemeToggle;