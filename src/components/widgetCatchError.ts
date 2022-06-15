import { ErrorInfo } from 'react';

export const widgetOnError =
  (name: string, localStorageKey: string) =>
  (error: Error, errorInfo: ErrorInfo) => {
    console.error(`ERROR BOUNDRY - ${name}`);
    console.error(error, errorInfo);

    localStorage.removeItem(localStorageKey);
  };
