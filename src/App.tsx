import React, { useReducer } from 'react';
import './App.css';
import BackgroundInfo from './components/BackgroundInfo';
import NBA from './components/NBA';
import Links from './components/Links/Links';
import { ControlBar } from './components/ControlBar';
import {
  widgetVisibilityReducer,
  loadWidetsVisibleFromCache,
  WidgetNames
} from './WidgetVisibility';
import { Message } from './Message';
import Soccer from './components/Soccer';
import NFL from './components/NFL';
import NHL from './components/NHL';
import MLB from './components/MLB';
import NoInternet from './components/NoInternet';
import { ResponsiveComponent } from './components/ResponsiveComponent';
import { MobileView } from './MobileView';

function App() {
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
    <div className="App">
      <ResponsiveComponent
        sm={<ControlBar toggles={toggles} toggle={toggleWidget} />}
      />

      <div className="container-fluid">
        <Message />
        <NoInternet />

        <ResponsiveComponent
          xs={<MobileView />}
          sm={
            <div className="py-4 card-columns">
              {widgetsVisible.NFL && <NFL />}
              {widgetsVisible.NBA && <NBA />}
              {widgetsVisible.NHL && <NHL />}
              {widgetsVisible.MLB && <MLB />}
              {widgetsVisible.Soccer && <Soccer />}
              {widgetsVisible.Links && <Links />}
            </div>
          }
        />
      </div>

      <BackgroundInfo />
    </div>
  );
}

export default App;
