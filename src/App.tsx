import React from 'react';
import './App.css';
import NBA from './components/NBA';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="card-columns">
          <NBA />
        </div>
      </div>
    </div>
  );
}

export default App;
