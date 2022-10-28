import React, { useEffect, useReducer } from 'react';
import './App.css';
import { UnsplashPicker } from './components/Unsplash/UnsplashPicker';
import Links from './components/Links/Links';
import { ControlBar } from './components/ControlBar';
import {
  widgetVisibilityReducer,
  loadWidetsVisibleFromCache,
  WidgetNames
} from './WidgetVisibility';
import Soccer from './components/Soccer';
import NFL from './components/NFL';
import NHL from './components/NHL';
import MLB from './components/MLB';
import NoInternet from './components/NoInternet';
import { ResponsiveComponent } from './components/ResponsiveComponent';
import { MobileView } from './MobileView';
import { setFlagsFromUrl } from './flags';
import { NBAEspn } from './components/NBAEspn';

function App() {
  useEffect(() => setFlagsFromUrl(), []);

  const [widgetsVisible, dispatch] = useReducer(
    widgetVisibilityReducer,
    {
      NFL: true,
      NBA: true,
      NHL: true,
      MLB: true,
      Soccer: true,
      Links: true
    },
    loadWidetsVisibleFromCache
  );

  const toggleWidget = (name: WidgetNames) =>
    dispatch({ type: 'toggle', name });

  const toggles = Object.entries(widgetsVisible).map(([name, show]) => {
    return {
      name: name as WidgetNames,
      show: show as boolean
    };
  });

  return (
    <div className="App d-flex flex-column align-self-stretch h-100">
      <ResponsiveComponent
        sm={<ControlBar toggles={toggles} toggle={toggleWidget} />}
      />

      <div className="container-fluid d-flex flex-column pb-0 h-100">
        {/* <Message /> */}
        <NoInternet />

        <ResponsiveComponent
          xs={<MobileView />}
          sm={
            <div className="pb-4 card-columns">
              {widgetsVisible.NFL && <NFL />}
              {widgetsVisible.NBA && <NBAEspn />}
              {widgetsVisible.NHL && <NHL />}
              {widgetsVisible.MLB && <MLB />}
              {widgetsVisible.Soccer && <Soccer />}
              {widgetsVisible.Links && <Links />}
            </div>
          }
        />
      </div>

      <UnsplashPicker />
    </div>
  );
}

export default App;
