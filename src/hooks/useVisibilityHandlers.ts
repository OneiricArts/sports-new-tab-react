import { useEffect } from 'react';

// TODO -- write test with multiple components using independenly
export default function useVisibilityHandlers(onVisibleCallback: () => void) {
  let pageVisible = true;

  const inFocus = () => {
    if (!pageVisible) { onVisibleCallback(); }
    pageVisible = true;
  }

  const outFocus = () => pageVisible = false;

  const handleVisibilityChange = () => {
    if (document.hidden) {
      pageVisible = false;
    } else {
      if (!pageVisible) { onVisibleCallback(); }
      pageVisible = true;
    }
  }

  useEffect(() => {
    window.addEventListener('focus', inFocus);
    window.addEventListener('blur', outFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange, false);

    return () =>{
      window.removeEventListener('focus', inFocus);
      window.removeEventListener('blur', outFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}
