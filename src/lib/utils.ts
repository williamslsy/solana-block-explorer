import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDistanceToNow } from 'date-fns';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);

  try {
    return formatDistanceToNow(date, {
      addSuffix: true,
      includeSeconds: true,
    });
  } catch {
    return 'Invalid date';
  }
};

export const truncateHash = (hash: string): string => {
  if (!hash) return '';
  if (hash.length <= 12) return hash;

  const start = hash.slice(0, 6);
  const end = hash.slice(-4);
  return `${start}...${end}`;
};

export function formatDateUTC(timestamp: string | number | Date): string {
  return new Date(timestamp).toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
    hourCycle: 'h23',
  });
}
