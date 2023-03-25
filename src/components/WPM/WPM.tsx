import { useEffect, useState } from "react";
import useTimeStore from "../../store/time";

export default function WPM({
  isTimerStarted,
  correctWords,
}: {
  isTimerStarted: boolean;
  correctWords: number;
}) {
  const { timeElapsed, increaseTimeElapsed } = useTimeStore();
  const minutes = timeElapsed / 60;
  const speed = (
    correctWords !== 0 && minutes !== 0 ? correctWords / minutes : 0
  ).toFixed(2);

  useEffect(() => {
    let interval: number;
    if (isTimerStarted) {
      interval = setInterval(() => {
        increaseTimeElapsed();
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isTimerStarted]);

  return (
    <span title="your word per minute score" className="wpm">
      WPM: <br /> {speed || 0}
    </span>
  );
}
