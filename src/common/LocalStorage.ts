/**
 *
 */

type CB = (val: string | null) => void;
const subscriptions: Record<string, Array<CB>> = {};

const triggerCbs = (key: string, val: string | null) => {
  if (key in subscriptions) {
    subscriptions[key].forEach(cb => cb(val));
  }
};

export const setItem = (key: string, val: string) => {
  localStorage.setItem(key, val);
  triggerCbs(key, val);
};

export const removeItem = (key: string) => {
  localStorage.removeItem(key);
  triggerCbs(key, null);
};

export const getItem = (key: string) => localStorage.getItem(key);

export const subscribe = (key: string, cb: CB) => {
  if (key in subscriptions) {
    // not checking if already subscribed
    // ... inline functions + non-memoized funcs in react component
    // will make it significantly less effective

    subscriptions[key].push(cb);
  } else {
    subscriptions[key] = [cb];
  }

  return () => {
    subscriptions[key] = subscriptions[key].filter(c => c !== cb);
  };
};
