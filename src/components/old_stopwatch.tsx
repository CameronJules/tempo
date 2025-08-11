import { useState, useEffect, useRef } from "react";

type StopwatchState = "idle" | "running" | "stopped";
type LapType = "work" | "break"

interface Lap {
    id: string,
    type: LapType,
    duration: number,
    startTime: number,
};


export function Stopwatch() {
    const [state, setState] = useState<StopwatchState>("idle");
    const [elapseTime, setElapseTime] = useState(0);
    const [time, setTime] = useState("00:00.00");

    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(0);

    // Format millisecond time into timer format
    const formatTime = (milliseconds: number): string => {
        const totalMs = Math.floor(milliseconds);
        const totalSeconds = Math.floor(milliseconds / 1000);

        const ms = Math.floor((totalMs % 1000) / 10);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const hours = Math.floor(totalSeconds / 3600);
        if (hours == 0) {
            return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
        } else {
            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
        }

    };

    // Timer handling functions
    const handleStart = () => {
        if (state !== "running") {
            setState("running");
            // adjust for resume
            startTimeRef.current = performance.now() - elapseTime; 
        }

    };

    const handleStop = () => {
        if (state === "running") {
            setState("stopped");
        }
    };

    const handleReset = () => {
        setState("idle");
        setElapseTime(0);
        setTime("00:00.00");
    };

    const handleLap = (type: LapType) => {
        const now = elapseTime;
        
    };

    // Running loop for timer
    useEffect(() => {
        if (state === "running") {
        intervalRef.current = window.setInterval(() => {
            const now = performance.now();
            const elapsed = now - startTimeRef.current;
            setElapseTime(elapsed);
            setTime(formatTime(elapsed));

        }, 10);
        } else if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        }

        return () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        };
    }, [state]);

    // Render
    return (
        <div>
        <h1>{time}</h1>
        <div>
            <button onClick={() => {handleLap("work")}}>Work</button>
            <button onClick={() => {handleLap("break")}}>Break</button>
        </div>
        <div>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
        </div>
        </div>
    );
}
