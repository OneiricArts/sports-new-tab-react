import React, { FC } from 'react';

export const Emoji: FC<{ label: string; emoji: string }> = ({
  label,
  emoji
}) => (
  <span role="img" aria-label={label}>
    {emoji}
  </span>
);
