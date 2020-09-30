import { useEffect, useState } from 'react';

/**
 *
 * Provides a way to run code when component becomes visible
 * (window switched back, tabbed back, focus back, etc.)
 *
 * IF onVisibleCallback IS provided, hook will call callback on visible
 *  - will call onVisibleCallback for
 *
 * IF onVisible NOT provided, hook incremements a counter (which is returned)
 *  - can be used in dependency arrays
 *
 * TODO -- write test with multiple components using independenly
 */

export default function useVisibilityHandlers(onVisibleCallback?: () => void) {
  const [count, _setCount] = useState(0);

  useEffect(() => {
    const onVisible = () => {
      if (onVisibleCallback) onVisibleCallback();
      else _setCount(c => c + 1);
    };

    let pageVisible = true;

    const inFocus = () => {
      if (!pageVisible) onVisible();

      pageVisible = true;
    };

    const outFocus = () => (pageVisible = false);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        pageVisible = false;
      } else {
        if (!pageVisible) onVisible();

        pageVisible = true;
      }
    };

    window.addEventListener('focus', inFocus);
    window.addEventListener('blur', outFocus);
    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange,
      false
    );

    return () => {
      window.removeEventListener('focus', inFocus);
      window.removeEventListener('blur', outFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [onVisibleCallback]);

  return [count];
}
