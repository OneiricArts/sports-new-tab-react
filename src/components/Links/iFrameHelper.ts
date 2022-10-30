/**
 *
 */

const isNotInIframe = window.self === window.top;

const cached = new Map<string, any>();
// const listeningTo = new Map<string, number>();

const askFor = <T>(type: string, cb: (data: T) => void, cache = true) => {
  if (isNotInIframe) return;

  if (cached.has(type)) {
    if (cache) cb(cached.get(type));
    return;
  }

  // TODO origin
  window.top?.postMessage({ type: 'sendData', value: type }, '*');

  const handler = (event: MessageEvent<any>) => {
    if (event.data.type === 'webpackOk') return;

    if (event.data.type === type) {
      if (cache) cached.set(type, event.data.value);
      cb(event.data.value);
    }
  };

  window.addEventListener('message', handler);
  // listeningTo.set(type, (listeningTo.get(type) ?? 0) + 1);

  return () => {
    window.removeEventListener('message', handler);
    // if (listeningTo.get(type) === 0) listeningTo.delete(type);
    // else listeningTo.set(type, (listeningTo.get(type) ?? 0) - 1);
  };
};

export { askFor };
