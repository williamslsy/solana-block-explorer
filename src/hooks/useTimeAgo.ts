import { useState, useEffect } from 'react';

export const useTimeAgo = (timestamp: string) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTimeAgo = () => {
    const blockTime = new Date(timestamp);
    const diffInMs = currentTime.getTime() - blockTime.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);

    const seconds = diffInSeconds % 60;
    const minutes = Math.floor(diffInSeconds / 60) % 60;
    const hours = Math.floor(diffInSeconds / 3600) % 24;
    const days = Math.floor(diffInSeconds / 86400) % 30;
    const months = Math.floor(diffInSeconds / (86400 * 30)) % 12;
    const years = Math.floor(diffInSeconds / (86400 * 365));

    if (years > 0) return `${years}y ${months}mo ago`;
    if (months > 0) return `${months}mo ${days}d ago`;
    if (days > 0) return `${days}d ${hours}h ${minutes}m ${seconds}s ago`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s ago`;
    if (minutes > 0) return `${minutes}m ${seconds}s ago`;
    return `${seconds}s ago`;
  };

  return formatTimeAgo();
};
