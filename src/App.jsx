import { useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import './index.css';

function App() {
    const [birthday, setBirthday] = useState("");
    const [result, setResult] = useState(null);

    const calculateAge = () => {
        if (!birthday) {
            alert("No way you are born without a birthday!");
            return;
        }

        const birthDate = new Date(birthday);
        const now = new Date();

        let years = now.getFullYear() - birthDate.getFullYear();
        let months = now.getMonth() - birthDate.getMonth();
        let days = now.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += lastMonth.getDate();
        }

        if (months < 0) {
            years--;
            months += 12;
        }

        const diffMs = now - birthDate;
        const totalSeconds = Math.floor(diffMs / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);
        const totalWeeks = Math.floor(totalDays / 7);
        const remainingDays = totalDays % 7;

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
            <h1>How Long Have I Been on This Beautiful Earth? 🌍</h1>

            <input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
            />
            <button onClick={calculateAge}>Calculate</button>

            {result && (
                <div className="result">
                    <h2>Age:</h2>
                    <p className="age">
                        {result.years} years {result.months} months {result.days} days
                    </p>

                    <h3>or</h3>
                    <p>{result.totalWeeks} weeks {result.remainingDays} days</p>
                    <p>{result.totalDays.toLocaleString()} days</p>
                    <p>{result.totalHours.toLocaleString()} hours</p>
                    <p>{result.totalMinutes.toLocaleString()} minutes</p>
                    <p>{result.totalSeconds.toLocaleString()} seconds</p>
                </div>
            )}
            <p>Every second counts, make the most of it!</p>
            <SpeedInsights />
            <Analytics />
        </div>
    );
}

export default App;
