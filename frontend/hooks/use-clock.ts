import { useState, useEffect } from "react";

export const useClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return formattedTime;
};
