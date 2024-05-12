import { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';

type UseLoaderParams = { isLoading: boolean; minimum?: number };

const useLoader = ({ isLoading, minimum = 0 }: UseLoaderParams): boolean => {
  const [startedOn, setStartedOn] = useState(
    isLoading ? Date.now() : undefined
  );

  const timer = useRef<number>();

  const turnOff = useCallback(
    (start: number) => {
      const elapsedTime = Date.now() - start;
      const remainder = minimum - elapsedTime;

      if (remainder > 0) {
        timer.current = window.setTimeout(() => {
          setStartedOn(undefined);
        }, remainder);
      } else {
        setStartedOn(undefined);
      }
    },
    [minimum]
  );

  useEffect(() => {
    setStartedOn(s => {
      // note: startedOn is set from Date.now() ... will never be 0
      const isOn = s !== undefined;
      const isOff = !isOn;

      if (isOn && isLoading === true) {
        // if turning off in progress -- clear
        if (timer.current) window.clearTimeout(timer.current);

        // keeps the initial startedOn value if called multiple times
      }

      // start timer to turn off
      if (isOn && isLoading === false) {
        turnOff(s);
      }

      // turn on
      if (isOff && isLoading === true) return Date.now();

      // ignore: isOff && isLoading === false
      return s;
    });
  }, [isLoading, turnOff]);

  return !!startedOn;
};

type LoaderProps = UseLoaderParams & { children: ReactNode };

export const Loader: FC<LoaderProps> = ({ children, ...useLoaderProps }) => {
  const showLoading = useLoader(useLoaderProps);
  return <>{showLoading && children}</>;
};
