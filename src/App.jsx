import { useState } from "react";
import './index.css';

function App() {
    const [birthday, setBirthday] = useState("");
    const [result, setResult] = useState(null);

    const calculateAge = () => {
        if (!birthday) {
            alert("No way you can be born without a birthday!?");
            return;
        }

        const birthDate = new Date(birthday);
        const now = new Date();

        const ageInMilliseconds = now - birthDate;

        const seconds = Math.floor(ageInMilliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let remainingDays = now.getDate() - birthDate.getDate();

        if (remainingDays < 0) {
            months--;
            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            remainingDays += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        setResult({
            years,
            months,
            days: remainingDays,
            totalWeeks: weeks,
            remainingDays: days % 7,
            totalDays: days,
            totalHours: hours,
            totalMinutes: minutes,
            totalSeconds: seconds
        });
    };

    return (
        <div className="container">
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
        </div>
    );
}

export default App;
