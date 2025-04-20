import { format, parse, isWithinInterval, addMinutes } from 'date-fns';

interface SessionTime {
  date: string;
  time: string;
}

/**
 * Checks if the current time is within the session time window
 * @param sessionTime Object containing date and time of the session
 * @returns boolean indicating if the session is currently active
 */
export const isSessionActive = (sessionTime: SessionTime): boolean => {
  const now = new Date();
  
  // Handle "Today" and "Tomorrow" cases
  let sessionDate = sessionTime.date;
  if (sessionTime.date === 'Today') {
    sessionDate = format(now, 'MMM d, yyyy');
  } else if (sessionTime.date === 'Tomorrow') {
    sessionDate = format(addMinutes(now, 24 * 60), 'MMM d, yyyy');
  }

  // Parse the session time
  const [startTime] = sessionTime.time.split(' - ');
  const sessionDateTime = parse(
    `${sessionDate} ${startTime}`,
    'MMM d, yyyy h:mm a',
    new Date()
  );

  // Session is considered active 5 minutes before start time until 1 hour after start time
  const sessionStart = addMinutes(sessionDateTime, -5);
  const sessionEnd = addMinutes(sessionDateTime, 60);

  return isWithinInterval(now, { start: sessionStart, end: sessionEnd });
};