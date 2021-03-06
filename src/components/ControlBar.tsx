import React from 'react';
import { CustomInput, Navbar } from 'reactstrap';
import { WidgetNames } from '../WidgetVisibility';
import { ExtensionInfo } from './ExtensionInfo';

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
      className="d-flex justify-content-start"
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

      <div className="ml-auto text-muted d-none d-lg-block">
        <ExtensionInfo />
      </div>
    </Navbar>
  );
};
