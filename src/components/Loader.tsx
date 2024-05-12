import { FC, ReactNode, useEffect, useRef, useState } from 'react';

type UseLoaderParams = { isLoading: boolean; wait?: number; minimum?: number };

const useLoader = (props: UseLoaderParams): boolean => {
  const { isLoading, minimum = 0, wait = 0 } = props;

  const [startedOn, setStartedOn] = useState(
    isLoading ? Date.now() : undefined
  );

  const offTimer = useRef<number>();
  const onTimer = useRef<number>();

  useEffect(() => {
    const turnOn = (wait: number) => {
      if (onTimer.current) return;

      onTimer.current = window.setTimeout(() => {
        setStartedOn(Date.now());
        onTimer.current = undefined;
      }, wait);
    };

    const turnOff = (timer: number) => {
      if (offTimer.current) return;

      offTimer.current = window.setTimeout(() => {
        setStartedOn(undefined);
        offTimer.current = undefined;
      }, timer);
    };

    setStartedOn(s => {
      const isOn = s !== undefined;
      const isOff = !isOn;

      if (isOn && isLoading === true && offTimer.current) {
        window.clearTimeout(offTimer.current); // clear any timers to turn off
        offTimer.current = undefined;

        // keeps the initial startedOn value if called multiple times
      }

      if (isOff && isLoading === false && onTimer.current) {
        window.clearTimeout(onTimer.current); // clear any timers to turn on
        onTimer.current = undefined;
      }

      // start timer to turn off
      if (isOn && isLoading === false) {
        const elapsedTime = Date.now() - s;
        const remainder = minimum - elapsedTime;

        if (remainder > 0) turnOff(remainder);
        else return undefined;
      }

      // turn on
      if (isOff && isLoading === true) {
        if (wait > 0) turnOn(wait);
        else return Date.now();
      }

      return s;
    });
  }, [isLoading, wait, minimum]);

  // note: startedOn is set from Date.now() ... will never be 0
  return !!startedOn;
};

type LoaderProps = UseLoaderParams & {
  children?: ReactNode;
  spinner: ReactNode;
};

export const Loader: FC<LoaderProps> = ({
  children,
  spinner,
  ...useLoaderProps
}) => {
  const showLoading = useLoader(useLoaderProps);

  return <>{showLoading ? spinner : children}</>;
};
