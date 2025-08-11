// Example React component usage
import { useState, useEffect, useRef } from 'react';
import {LapTimer, Lap} from '../lib/stopwatch'

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

  const formatTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="app">
        <div>
            <h1 className="time-display">{formatTime(elapsed)}</h1>
            <p className='status-text'>{lapType}: {formatTime(currentLap)}</p>
        </div>

        <div className='laps'>
            <table>
                <thead>
                    <tr><th className="num">Lap No.</th><th className="split">Split</th><th className="total">Total</th></tr>
                </thead>
                <tbody>
                    {laps.map((lap) => (
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
