import React, { useEffect, useState } from 'react';
import { askFor } from './Links/iFrameHelper';

const Separator = () => <>&nbsp; &middot; &nbsp;</>;

export const ExtensionInfo = () => {
  const [version, setVersion] = useState<string | undefined>(
    //@ts-ignore
    window.chrome?.app?.getDetails()?.version
  );

  useEffect(() => {
    const unregister = askFor<string>('chrome.getDetails.version', data => {
      setVersion(data);
    });

    return () => unregister?.();
  }, []);

  return (
    <>
      Sports New Tab Page by OneiricArts
      <Separator />
      {version && (
        <>
          <span>v{version}</span>
          <Separator />
        </>
      )}
      <a href="https://forms.gle/iSkqzc53vC5zD7PX8" target="_parent">
        Feedback
      </a>
    </>
  );
};
