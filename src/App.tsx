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

function App() {
  const [widgetsVisible, dispatch] = useReducer(
    widgetVisibilityReducer,
    {
      NBA: true,
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
      <ControlBar toggles={toggles} toggle={toggleWidget} />

      <div className="container-fluid">
        <Message />

        <div className="card-columns">
          {widgetsVisible.NBA && <NBA />}
          {widgetsVisible.Links && <Links />}
        </div>
      </div>

      <BackgroundInfo />
    </div>
  );
}

export default App;
