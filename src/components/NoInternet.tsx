import React, { memo, useEffect, useState } from 'react';
import { Alert } from 'reactstrap';

const Message = () => (
  <Alert color="danger">
    <h4>No internet connection detected :(</h4>
    This page will auto-refresh when a connection is detected.{' '}
    <a href="https://forms.gle/iSkqzc53vC5zD7PX8">
      If this is incorrect, please report.
    </a>
  </Alert>
);

const NoInternet = memo(() => {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    // reload page when online for cleanest reset
    const online = () => document.location.reload();

    const offline = () => setOnline(false);

    window.addEventListener('online', online);
    window.addEventListener('offline', offline);

    return () => {
      window.removeEventListener('online', online);
      window.removeEventListener('offline', offline);
    };
  }, []);

  return <>{!online && <Message />}</>;
});

export default NoInternet;
