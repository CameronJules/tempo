// Example React component usage
import { useState, useEffect, useRef } from 'react';
import {LapTimer, Lap} from '../lib/stopwatch'
import { LapSplitBar } from './time_split_bar';

export function LapStopwatch() {
  const [elapsed, setElapsed] = useState(0);
  const [currentLap, setCurrentLap] = useState(0);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<LapTimer>(new LapTimer());
  const [nextLapType, setNextLapType] = useState("")
  const [lapType, setLapType] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      timerRef.current.tick();
      setElapsed(timerRef.current.elapsed);
      setCurrentLap(timerRef.current.currentLapTime);
      setIsRunning(timerRef.current.isRunning);
      setNextLapType(timerRef.current.nextLapType);
      setLapType(timerRef.current.lapType)
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    timerRef.current.start();
  };

  const handleStop = () => {
    timerRef.current.stop();
  };

  const handleReset = () => {
    timerRef.current.reset();
    setLaps([]);
  };

  const handleLap = () => {
    timerRef.current.recordLap();
    setLaps([...timerRef.current.allLaps]);
  };
  // The internal components which need to be displayed get copied to the react use state or ref

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

  return (
    <div className="app">
        <div>
            <h1 className="time-display">{formatTime(elapsed)}</h1>
            <LapSplitBar timer={timerRef.current}/>
            <p className='status-text'>{lapType}: {formatTime(currentLap)}</p>
        </div>
        <div className='laps'>
            <table>
                <thead>
                    <tr><th className="num">Lap Type</th><th className="split">Split</th><th className="total">Total</th></tr>
                </thead>
                <tbody>
                    {[...laps].reverse().map((lap) => (
                    <tr key={lap.lapNumber}>
                        <td className='num'>{lap.type}</td>
                        <td className='split'>{formatTime(lap.lapTime)}</td>
                        <td className='total'>{formatTime(lap.totalTime)}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <div className='controls'>
            <button className='btn btn-reset' onClick={isRunning ? handleLap : handleReset}>
                {isRunning ? nextLapType : 'Reset'}
            </button>
            <button className={isRunning ? 'btn btn-stop' : 'btn btn-start'} onClick={isRunning ? handleStop : handleStart}>
                {isRunning ? 'Stop' : 'Start'}
            </button>
        </div>
        
    </div>
  );
};
