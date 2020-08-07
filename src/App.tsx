import React from 'react';
import './App.css';
import BackgroundInfo from './components/BackgroundInfo';
import NBA from './components/NBA';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <Message />

        <div className="card-columns">
          <NBA />
        </div>
      </div>

      <BackgroundInfo />
    </div>
  );
}

export default App;
