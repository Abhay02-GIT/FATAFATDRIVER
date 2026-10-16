import {useDriverProfile} from '@/state/driverProfileStore';
import {useRiderProfile} from '@/state/riderProfileStore';

// Who is signed in: used in the Home header ("Driver" / "Rohan").
// The role label is in strings.onlineHome. No name = not registered yet.
// TODO: take both from your API once the backend is connected.
export function useDisplayProfile(): {role: 'driver' | 'rider'; name?: string} {
  const driver = useDriverProfile();
  const rider = useRiderProfile();

  if (driver.name) {
    return {role: 'driver', name: driver.name.split(' ')[0]};
  }
  if (rider.name) {
    return {role: 'rider', name: rider.name.split(' ')[0]};
  }
  return {role: 'driver'};
}