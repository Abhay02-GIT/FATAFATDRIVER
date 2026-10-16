import {useEffect, useState} from 'react';

// Whole seconds left until `deadline` (a Date.now() timestamp), never below 0.
// Recomputed from the clock on every tick, so it stays right even when the
// JS timers were paused (app in background, screen off).
export function useCountdown(deadline: number) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const id = setInterval(() => {
      const current = Date.now();
      setNow(current);
      if (current >= deadline) {
        clearInterval(id);
      }
    }, 250);
    return () => clearInterval(id);
  }, [deadline]);

  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
