import { useEffect, useState } from 'react';

// TODO -- write test with multiple components using independenly
export default function useVisibilityHandlers(): [number, boolean] {
  const [onVisibleCtr, setOnVisibleCtr] = useState(0);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const inFocus = () => {
      setPageVisible(true);
      setOnVisibleCtr(o => o + 1);
    }

    const outFocus = () => setPageVisible(false);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setPageVisible(false);
      } else {
        setPageVisible(true);
        setOnVisibleCtr(o => o + 1);
      }
    }

    window.addEventListener('focus', inFocus);
    window.addEventListener('blur', outFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange, false);

    return () => {
      window.removeEventListener('focus', inFocus);
      window.removeEventListener('blur', outFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return [onVisibleCtr, pageVisible];
}
