import type {DayPart} from '@/constants/options';

export type ServiceWindow = {
  id: DayPart; // name is in strings.dayParts
  text: string;
  startHour: number; // inclusive, 0-24
  endHour: number; // exclusive, 0-24
};

// TODO: load the rider's / driver's schedule from your API
export const SERVICE_WINDOWS: ServiceWindow[] = [
  {id: 'morning', text: '6AM - 12PM', startHour: 6, endHour: 12},
  {id: 'evening', text: '6PM - 12AM', startHour: 18, endHour: 24},
];

// For testing the Locked screen:
//   true  = always show "Service Hours Locked"
//   false = never lock
//   null  = use the real clock (normal behaviour)
export const FORCE_LOCKED: boolean | null = null; // null;

export function isWithinServiceHours(now: Date = new Date()): boolean {
  if (FORCE_LOCKED !== null) {
    return !FORCE_LOCKED;
  }
  const hour = now.getHours() + now.getMinutes() / 60;
  return SERVICE_WINDOWS.some(w => hour >= w.startHour && hour < w.endHour);
}