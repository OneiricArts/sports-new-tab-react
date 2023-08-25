import React from 'react';

/**
 * TODO have this component check if there
 * is a message to display
 */

export const Message = () => (
  <div
    className="jumbotron py-2 my-0"
    style={{
      backgroundColor: '#e0f2f1'
    }}
  >
    Please try out `Background Options` in the bottom right corner{' '}
    <a href="https://forms.gle/iSkqzc53vC5zD7PX8" target="_parent">
      and provide feedback or thoughts.
    </a>
  </div>
);
