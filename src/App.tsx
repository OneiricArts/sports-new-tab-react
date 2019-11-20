import React from 'react';
import './App.css';
import NFL from './components/NFL';

function App() {
  return (
    <div className="App">
      <div className="container-fluid">
        <div className="card-columns">
          <NFL />
        </div>
      </div>
    </div>
  );
}

export default App;
