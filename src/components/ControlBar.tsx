import React from 'react';
import { CustomInput, Navbar } from 'reactstrap';
import { WidgetNames } from '../WidgetVisibility';

interface Togglable {
  name: WidgetNames;
  show: boolean;
}

type ControlBarProps = {
  toggles: Togglable[];
  toggle: (string: WidgetNames) => void;
};

export const ControlBar = ({ toggles, toggle }: ControlBarProps) => {
  return (
    <Navbar
      color="dark"
      dark
      expand="md"
      className="d-flex"
      style={{ color: 'white', gap: '15px' }}
    >
      {toggles.map(t => (
        <CustomInput
          key={t.name}
          type="switch"
          id={`checkbox-show-${t.name}`}
          label={t.name}
          checked={t.show}
          onChange={() => toggle(t.name)}
        />
      ))}
    </Navbar>
  );
};
