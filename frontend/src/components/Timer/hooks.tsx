import { useEffect, useState } from 'react';

interface CountdownProps {
  initialMinutes: number;
  initialSeconds: number;
}

const useCountdown = ({ initialMinutes = 0, initialSeconds = 0 }: CountdownProps) => {
  const initialDuration = initialMinutes * 60 + initialSeconds;
  const [duration, setDuration] = useState(initialDuration); // duration in seconds
  const [isActive, setIsActive] = useState(false);
  // Date.now() gets time in MILLISECONDS since 1970.
  // if we want to get end time (i.e. 25 minutes from now, get current time + duration * 1000 milliseconds)
  const [endTime, setEndTime] = useState(Date.now() + initialDuration * 1000);

  useEffect(() => {
    let interval: Timer;
    if (isActive) {
      interval = setInterval(() => {
        const now = Date.now();
        const remainingTime = Math.max(0, Math.floor((endTime - now) / 1000)); // convert duration to seconds
        setDuration(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(interval);
          setIsActive(false);
        }
      }, 900); // run every 100ms to SYNC time and prevent drift!!
    }

    return () => clearInterval(interval);
  }, [isActive, endTime]);

  const toggleTimer = () => {
    if (isActive == false) {
      setEndTime(Date.now() + duration * 1000); // start timer from now
    }
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setDuration(initialDuration);
    setEndTime(Date.now() + initialDuration * 1000);
    setIsActive(false);
  };
  const setTimer = ({ initialMinutes, initialSeconds }: CountdownProps) => {
    const duration = initialMinutes * 60 + initialSeconds;
    setDuration(duration);
    setEndTime(Date.now() + duration * 1000);
  };
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return { isActive, toggleTimer, resetTimer, setTimer, minutes, seconds };
};

export { useCountdown };
