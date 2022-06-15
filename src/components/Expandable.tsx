/**
 * Component will remember if its expanded or not.
 * Expanded = shows children.
 */

import React, { FC, ReactNode, useState } from 'react';

interface ExpandableI {
  rememberKey?: string;
  title?: (expanded: boolean, toggle: () => void) => ReactNode;
  children?: ReactNode;
}

const getSavedState = (key?: string) =>
  key === undefined ? false : localStorage.getItem(key) === 'true';

export const Expandable: FC<ExpandableI> = ({
  rememberKey,
  title,
  children
}) => {
  const [expanded, setExpanded] = useState(getSavedState(rememberKey));

  const toggle = () =>
    setExpanded(e => {
      if (rememberKey) {
        localStorage.setItem(rememberKey, (!e).toString());
      }
      return !e;
    });

  return (
    <>
      {title?.(expanded, toggle)}
      {expanded && children}
    </>
  );
};
