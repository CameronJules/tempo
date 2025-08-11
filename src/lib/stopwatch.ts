/*
Base stopwatch functionality

Idea is to use composition of the base class to add functionality later.

The original design wrapped function with the ticker and caused lots
of background updates which could only be controlled by toching stopwatch
internals. By changing to a staic design the update rate will be defined by
a ticker instead allowing for decoupled control.

The process:
1) Create interfaces and types restrict and guide functionality.
2) Implement the base functionalities and any supporting functions.

Clock counts up milliseconds and is unformatted in its return values. 
There for all return values of time are in milliseconds.
*/
// Interfaces and types
export interface Stopwatch {
    start(): void;
    stop(): void;
    reset(): void;
    tick(): void;
    get elapsed(): number;
    get isRunning(): boolean;
};

export interface Lap {
  lapNumber: number;
  lapTime: number;      // Time for this specific lap
  totalTime: number;    // Total elapsed time when lap was recorded
  timestamp: number;    // When the lap was recorded
  type: LapType;
};

export enum LapType {
    Work = "Work",
    Break = "Break"
}

/// Base Stopwatch class (assuming this is your existing implementation)
class BaseStopwatch implements Stopwatch {
  private _elapsed: number = 0;
  private _isRunning: boolean = false;
  private _startTime: number = 0;

  start(): void {
    if (!this._isRunning) {
      this._startTime = Date.now() - this._elapsed;
      this._isRunning = true;
    }
  }

  stop(): void {
    if (this._isRunning) {
      this._elapsed = Date.now() - this._startTime;
      this._isRunning = false;
    }
  }

  reset(): void {
    this._elapsed = 0;
    this._isRunning = false;
    this._startTime = 0;
  }

  tick(): void {
    if (this._isRunning) {
      this._elapsed = Date.now() - this._startTime;
    }
  }

  get elapsed(): number {
    return this._elapsed;
  }

  get isRunning(): boolean {
    return this._isRunning;
  }
}

// LapTimer class using composition
export class LapTimer {
  private stopwatch: Stopwatch;
  private laps: Lap[] = [];
  private lastLapTime: number = 0;
  private currentLapType: LapType;
  private defaultLapType: LapType;

  constructor(defaultLapType: LapType = LapType.Work) {
    this.stopwatch = new BaseStopwatch();
    this.currentLapType = defaultLapType;
    this.defaultLapType = defaultLapType;
  }

  // Delegate basic functions
  start(): void {
    this.stopwatch.start();
  }

  stop(): void {
    this.stopwatch.stop();
  }

  reset(): void {
    this.stopwatch.reset();
    this.laps = [];
    this.lastLapTime = 0;
    this.currentLapType = this.defaultLapType;
  }

  tick(): void {
    this.stopwatch.tick();
  }

  lapTypeSwitcher(): void {
    if (this.currentLapType == LapType.Work) {
        this.currentLapType = LapType.Break
    } else {
        this.currentLapType = LapType.Work
    }
  }

  // Lap-specific functions
  recordLap(): Lap {
    const currentTime = this.stopwatch.elapsed;
    const lapTime = currentTime - this.lastLapTime;
    
    const lap: Lap = {
      lapNumber: this.laps.length + 1,
      lapTime: lapTime,
      totalTime: currentTime,
      timestamp: Date.now(),
      type: this.currentLapType
    };

    this.laps.push(lap);
    this.lastLapTime = currentTime;
    this.lapTypeSwitcher();

    
    return lap;
  }

  // Getters for accessing data
  get elapsed(): number {
    return this.stopwatch.elapsed;
  }

  get isRunning(): boolean {
    return this.stopwatch.isRunning;
  }

  get allLaps(): readonly Lap[] {
    return [...this.laps];
  }

  get currentLapTime(): number {
    return this.stopwatch.elapsed - this.lastLapTime;
  }

  get lapCount(): number {
    return this.laps.length;
  }

  get lapType(): string {
    return this.currentLapType;
  }

  get nextLapType(): string {
    if (this.currentLapType == LapType.Work) return LapType.Break;
    return LapType.Work;
  }

  // Utility methods
  getLastLap(): Lap | null {
    return this.laps.length > 0 ? this.laps[this.laps.length - 1] : null;
  }

  getFastestLap(): Lap | null {
    if (this.laps.length === 0) return null;
    return this.laps.reduce((fastest, current) => 
      current.lapTime < fastest.lapTime ? current : fastest
    );
  }

  getSlowestLap(): Lap | null {
    if (this.laps.length === 0) return null;
    return this.laps.reduce((slowest, current) => 
      current.lapTime > slowest.lapTime ? current : slowest
    );
  }

  getAverageLapTime(): number {
    if (this.laps.length === 0) return 0;
    const totalLapTime = this.laps.reduce((sum, lap) => sum + lap.lapTime, 0);
    return totalLapTime / this.laps.length;
  }
}

