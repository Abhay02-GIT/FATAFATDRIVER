import {useEffect, useState} from 'react';
import {useDriverProfile} from '@/state/driverProfileStore';
import {useRiderProfile} from '@/state/riderProfileStore';

// TODO: call your API here and return the URL of the photo the rider / driver
// uploaded (return undefined when there is none yet).
export async function fetchProfilePhotoUrl(): Promise<string | undefined> {
  return undefined;
}

// The photo shown in the Home header.
// 1) the photo from the backend, 2) otherwise the photo picked during
// registration on this phone, 3) otherwise undefined (the Avatar shows a person icon).
export function useProfilePhoto(): string | undefined {
  const rider = useRiderProfile();
  const driver = useDriverProfile();
  const [remote, setRemote] = useState<string | undefined>();

  useEffect(() => {
    let alive = true;
    fetchProfilePhotoUrl()
      .then(url => {
        if (alive) {
          setRemote(url);
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return remote ?? driver.photoUri ?? rider.photoUri;
}