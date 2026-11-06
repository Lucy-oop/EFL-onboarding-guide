import { useSyncExternalStore } from 'react';

const QUERY = '(min-width: 768px)';

const subscribe = (cb) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
};

// true on desktop/tablet-wide screens, false on phones
export default function useIsDesktop() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
