import React, { useEffect } from 'react';
import './App.css';
import NFL from './components/NFL';
import { PullToRefresh } from './simpleui';

function App() {
  const appref = React.createRef<HTMLDivElement>();
  let _startY : number;

  useEffect(() => {
    // document.addEventListener('visibilitychange', handleVisibilityChange, false);
    if (appref.current && document) {
      appref.current.addEventListener('touchstart', e => {
        _startY = e.touches[0].pageY;
        console.log('>>>>>>>>>>.')
      }, { passive: true });

      appref.current.addEventListener('touchmove', e => {
        const y = e.touches[0].pageY;
        // Activate custom pull-to-refresh effects when at the top of the container
        // and user is scrolling up.
        if (document.scrollingElement && document.scrollingElement.scrollTop === 0 && y > _startY &&
            !document.body.classList.contains('refreshing')) {
              console.log('++++')
          // refresh inbox.
        }
      }, { passive: true });
    }

    return () =>{
      // appref.current?.removeEventListener('touchmove', touchMoveListner);
      // appref.current?.removeEventListener('touchmove', touchstart);
    };
  }, []);

  return (
    <div className="App" ref={appref}>
      {/* <PullToRefresh /> */}
      <div className="refresher">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>

      <div className="container-fluid">
        <div className="card-columns">
          <NFL />
        </div>
      </div>
    </div>
  );
}

export default App;
