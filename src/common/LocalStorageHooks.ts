import { useEffect, useMemo, useState } from 'react';
import { getItem, subscribe } from './LocalStorage';

/**
 *
 * @param key - CANNOT BE VARIABLE. HOOK SUBSCRIBES TO FIRST KEY PASSED IN
 * @returns - value from key in localStorage
 */
export const useListenToItem = (key: string): string | null => {
  const [val, setVal] = useState(getItem(key));

  /* eslint-disable react-hooks/exhaustive-deps */

  /*
    Only subscribce once, and only unsub on unmount
    Ignore key in dependency arr, we will not be tracking if it changes
  */

  const unsub = useMemo(() => subscribe(key, val => setVal(val)), []);
  useEffect(() => () => unsub(), []);

  return val;
};
