import { useState, useEffect } from "react";
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths } from "date-fns";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import './index.css';

function App() {
    const [birthday, setBirthday] = useState("");
    const [result, setResult] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const calculateAge = () => {
        if (!birthday) {
            alert("No way you can be born without a birthday!?");
            return;
        }

        const birthDate = new Date(birthday);
        const now = new Date();

        const years = differenceInYears(now, birthDate);
        const adjustedBirthDate = addYears(birthDate, years);

        let months = differenceInMonths(now, adjustedBirthDate);
        const adjustedBirthDateWithMonths = addMonths(adjustedBirthDate, months);

        let days = differenceInDays(now, adjustedBirthDateWithMonths);

        if (days < 0) {
            months -= 1;
            days = differenceInDays(now, addMonths(adjustedBirthDate, months));
        }

        const totalDays = differenceInDays(now, birthDate);
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;

        const totalHours = totalDays * 24;
        const totalMinutes = totalHours * 60;
        const totalSeconds = totalMinutes * 60;

        setResult({
            years,
            months,
            days,
            totalWeeks,
            remainingDays,
            totalDays,
            totalHours,
            totalMinutes,
            totalSeconds
        });
    };

    return (
        <div className="container">
            <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
            <h1>How Long Have I Been on This Earth? 🌍</h1>

            <div className="input-section">
                <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
                <button onClick={calculateAge}>Calculate</button>
            </div>

            {result && (
                <div className="results-container">
                    <div className="result-box primary">
                        <h2>Your Age</h2>
                        <p>{result.years} years {result.months} months {result.days} days</p>
                    </div>

                    <div className="result-box">
                        <h3>In Weeks</h3>
                        <p>{result.totalWeeks} weeks and {result.remainingDays} days</p>
                    </div>

                    <div className="result-box">
                        <h3>In Days</h3>
                        <p>{result.totalDays.toLocaleString()} days</p>
                    </div>

                    <div className="result-box">
                        <h3>In Hours</h3>
                        <p>{result.totalHours.toLocaleString()} hours</p>
                    </div>

                    <div className="result-box">
                        <h3>In Minutes</h3>
                        <p>{result.totalMinutes.toLocaleString()} minutes</p>
                    </div>

                    <div className="result-box">
                        <h3>In Seconds</h3>
                        <p>{result.totalSeconds.toLocaleString()} seconds</p>
                    </div>
                </div>
            )}

            <p className="moti">Every second counts, make the most of it!</p>
            <Footer />
        </div>
    );
}

export default App;