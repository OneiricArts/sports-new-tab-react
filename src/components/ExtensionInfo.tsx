import React from 'react';

const Separator = () => <>&nbsp; &middot; &nbsp;</>;

export const ExtensionInfo = () => (
  <>
    Sports New Tab Page by OneiricArts
    <Separator />
    {/* @ts-ignore */}
    {window.chrome?.app?.getDetails()?.version && (
      <>
        {/* @ts-ignore */}
        <span>v{window.chrome?.app?.getDetails()?.version}</span>
        <Separator />
      </>
    )}
    <a href="https://forms.gle/iSkqzc53vC5zD7PX8">Feedback</a>
  </>
);
