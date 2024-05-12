/* eslint-disable jsx-a11y/accessible-emoji */
// TODO remove^

import * as React from 'react';
import { BasketballIcon } from '../icons/BasketballIcon';

const child = {
  display: 'inline',
  position: 'absolute',
  left: 0,
  width: '25px',
  height: '15px',
  textAlign: 'center'
} as const;

export const nbaPlayoffsDisplayName = (name: string, wins: number) => {
  return (
    <>
      <div>{name}</div>
      <div style={{ minHeight: '15px', display: 'flex' }}>
        {/* TODO only show if values */}
        {Array.from(Array(wins).keys()).map(() => (
          <BasketballIcon
            style={{
              height: '15px',
              color: '#a38e43'
            }}
          />
        ))}
      </div>
    </>
  );
};

export const nbaDisplayName = (
  name: string,
  rank: number,
  winStreak: number,
  loseStreak: number
) => {
  let color: string | undefined = undefined;
  if (rank >= 11) color = 'rgb(128, 128, 128)'; // gray out non-playoff teams
  // else if (rank >= 7) color = 'yellow';

  let backgroundColor: string | undefined = undefined;
  // if (rank < 7) backgroundColor = '#dff2ce';
  // if (rank >= 7 && rank <= 10) backgroundColor = '#fcfccc';

  const streak = winStreak > 3 || loseStreak > 3;

  return (
    <>
      <span
        // className={cx({ 'text-muted': rank > 10 })}
        style={{
          color,
          backgroundColor
        }}
      >
        {name}
      </span>

      {rank === 1 && <span style={{ fontSize: '14x' }}> 🥇</span>}
      {rank === 2 && <span style={{ fontSize: '14x' }}> 🥈</span>}
      {rank === 3 && <span style={{ fontSize: '14x' }}> 🥉</span>}

      {streak && (
        <div
          style={{
            display: 'inline',
            position: 'relative',
            width: '20px',
            height: '15px'
          }}
        >
          <div
            style={{
              ...child,
              fontSize: '16px'
            }}
          >
            {' '}
            {/* {winStreak ? '🔥' : '💩'} */}
            {winStreak > 3 && '🔥'}
            {loseStreak > 3 && (
              <span
                style={{
                  color: ' transparent',
                  textShadow: `0 0 0 ${
                    color ?? 'black'
                    // rank >= 11 ? 'rgb(128, 128, 128)' : 'black'
                  }`
                }}
              >
                💩
              </span>
            )}
          </div>
          {winStreak > 3 && (
            <div
              style={{
                ...child,
                bottom: '-5px',
                verticalAlign: 'sub',
                fontSize: '12px',
                opacity: 0.7
              }}
            >
              {winStreak}
            </div>
          )}
          {loseStreak > 3 && (
            <div
              style={{
                ...child,
                bottom: '-2px',
                verticalAlign: 'sub',
                fontSize: '10px',
                // opacity: 0.7,
                color: 'white'
              }}
              // top right choice
              // style={{
              //   display: 'inline',
              //   position: 'absolute',
              //   // left: 0,
              //   width: '25px',
              //   height: '15px',
              //   textAlign: 'right',
              //   // right: 0,
              //   // bottom: '-5px',
              //   verticalAlign: 'sub',
              //   fontSize: '12px',
              //   opacity: 0.7
              // }}
            >
              {loseStreak}
            </div>
          )}
        </div>
      )}
    </>
  );
};
