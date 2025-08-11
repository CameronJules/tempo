import React, { useEffect, useMemo, useRef, useState } from "react";
import type{ LapTimer, Lap, LapType as lapTypeType } from "../lib/stopwatch"; // adjust path"
import { LapType } from "../lib/stopwatch";
type Props = { timer: LapTimer };

/* This component was created using AI */

export function LapSplitBar({ timer }: Props) {
  const [elapsed, setElapsed] = useState<number>(timer.elapsed);
  const [laps, setLaps] = useState<readonly Lap[]>(timer.allLaps);
  const rafRef = useRef<number | null>(null);

  // Drive the UI – tick while running so the current segment grows smoothly
  useEffect(() => {
    let mounted = true;

    const loop = () => {
      timer.tick(); // updates internal elapsed if running
      if (!mounted) return;
      setElapsed(timer.elapsed);
      setLaps(timer.allLaps);
      rafRef.current = requestAnimationFrame(loop);
    };

    // Always keep it “live”; very cheap since state only changes when elapsed moves
    rafRef.current = requestAnimationFrame(loop);
    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [timer]);

  // Build segments: completed laps + the current in-progress lap
  const segments = useMemo(() => {
    const total = Math.max(1, elapsed); // avoid divide-by-zero
    const items: Array<{
      type: lapTypeType;
      ms: number;
      widthPct: number;
      isCurrent?: boolean;
      key: string | number;
    }> = laps.map((lap) => ({
      type: lap.type,
      ms: lap.lapTime,
      widthPct: (lap.lapTime / total) * 100,
      key: lap.timestamp,
    }));

    // Add current, growing segment
    const currentMs = timer.currentLapTime;
    if (currentMs > 0) {
      items.push({
        type: timer.lapType as lapTypeType, // current type
        ms: currentMs,
        widthPct: (currentMs / total) * 100,
        isCurrent: true,
        key: "current",
      });
    }
    return items;
  }, [laps, elapsed, timer]);

  return (
    <div className="splitbar" role="progressbar" aria-valuemin={0} aria-valuemax={elapsed} aria-valuenow={elapsed}>
      {segments.map((seg) => (
        <div
          key={seg.key}
          className={`splitbar__seg ${seg.type === LapType.Work ? "is-work" : "is-break"} ${
            seg.isCurrent ? "is-current" : ""
          }`}
          style={{ width: `${seg.widthPct}%` }}
          aria-label={`${seg.type} – ${Math.round(seg.ms / 1000)}s`}
          title={`${seg.type}: ${Math.round(seg.ms / 1000)}s`}
        />
      ))}
    </div>
  );
}
