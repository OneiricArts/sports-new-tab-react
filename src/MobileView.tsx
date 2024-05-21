import React, { useCallback, useState } from 'react';
import { Button, Navbar } from 'reactstrap';
import { ExtensionInfo } from './components/ExtensionInfo';
import Links from './components/Links/Links';
import MLB from './components/MLB';
import { NBAEspn as NBA } from './components/NBAEspn';
import NFL from './components/NFL';
import NHL from './components/NHL';
import Soccer from './components/Soccer';
import { WidgetNames } from './WidgetVisibility';
import { EnabledWidgets } from './App';

const LOCAL_STORAGE_KEY = 'WIDGETS_CONTROL_MOBILE_V1';

export const MobileView = () => {
  const widgets = (
    ['NFL', 'NBA', 'NHL', 'MLB', 'Soccer', 'Links'] as const
  ).filter(w => EnabledWidgets.has(w));

  const [active, _setActive] = useState<WidgetNames>(() => {
    const cachedName = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (widgets.includes(cachedName as any)) return cachedName as WidgetNames;

    return 'NFL';
  });

  const setActive = useCallback((name: WidgetNames) => {
    _setActive(name);

    localStorage.setItem(LOCAL_STORAGE_KEY, name);
  }, []);

  const widgetsNameToComponent = {
    NFL,
    NBA,
    NHL,
    MLB,
    Soccer,
    Links
  } as const;

  const activeWidgetName = widgets.find(w => w === active);

  const WidgetToRender = activeWidgetName
    ? widgetsNameToComponent[activeWidgetName]
    : () => <></>;

  return (
    <>
      <Navbar
        color="dark"
        className="d-flex justify-content-start p-1 mb-3 rounded"
        style={{ color: 'gray' }}
      >
        {widgets.map((w, i) => (
          <React.Fragment key={w}>
            <Button
              style={{
                color: activeWidgetName === w ? '#ff4081' : '#ebe0df',
                textDecoration: 'none'
              }}
              color="link"
              onClick={() => setActive(w)}
            >
              {w}
            </Button>
            {i !== widgets.length - 1 && ` | `}
          </React.Fragment>
        ))}
      </Navbar>

      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'start',
          alignItems: 'center'
        }}
        className="mb-3"
      >
        <WidgetToRender />
      </div>

      <Navbar
        color="dark"
        className="d-flex justify-content-start p-2 mb-3 rounded"
        style={{ color: 'gray' }}
      >
        <ExtensionInfo />
      </Navbar>
    </>
  );
};
