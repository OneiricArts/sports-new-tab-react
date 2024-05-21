import { FC, ReactNode } from 'react';

const skewX = 20;

export const TitlePill: FC<{ title: string }> = ({ title }) => {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg
        viewBox="18.066864013671875 47.31916427612305 148.13987731933594 106.72659301757812"
        width={'60px'}
        style={{ position: 'absolute', left: -5, top: -10, zIndex: -1 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#FF0066"
          d="M37.5,-51.8C42.7,-47.8,37.1,-29,43.1,-13.4C49.1,2.3,66.6,14.8,66.2,23.2C65.8,31.6,47.5,35.9,33.5,37.2C19.5,38.5,9.7,36.8,-3,40.8C-15.7,44.9,-31.3,54.8,-46.8,54C-62.2,53.1,-77.4,41.6,-81,27.1C-84.7,12.6,-76.8,-4.9,-67.8,-18.8C-58.9,-32.8,-48.9,-43.1,-37.4,-45.1C-25.9,-47.1,-13,-40.7,1.6,-42.9C16.1,-45,32.2,-55.8,37.5,-51.8Z"
          transform="translate(100 100)"
        ></path>
      </svg>

      <div
        style={{
          backgroundColor: '#403b3b',
          // height: '20px',
          display: 'inline-block',
          color: 'white',
          padding: '2px 8px',
          fontSize: '14px',

          transform: `skewX(-${skewX}deg)`
        }}
      >
        <div
          style={{ transform: `skewX(${skewX}deg)` }}
          className="font-weight-bold" //TODO remove
        >
          {title}
        </div>
      </div>
    </div>
  );
};

export const Pill: FC<{ children: ReactNode; style?: React.CSSProperties }> = ({
  children,
  style = {}
}) => {
  return (
    <div
      style={{
        backgroundColor: '#403b3b',
        // height: '20px',
        display: 'inline-block',
        color: 'white',
        padding: '2px 8px',
        fontSize: '14px',

        transform: `skewX(-${skewX}deg)`,

        ...style
      }}
    >
      <div style={{ transform: `skewX(${skewX}deg)` }}>{children}</div>
    </div>
  );
};
