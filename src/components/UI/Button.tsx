import { FC, ReactNode } from 'react';

export const ButtonStyle: React.CSSProperties = {
  // backgroundColor: '#403b3b',
  borderRadius: '5px',
  color: 'white',
  textAlign: 'center',
  fontSize: '14px',
  padding: '3px 7px',

  background: 'rgb(64, 59, 59, 1)',
  outline: 'rgb(183 85 113) solid 1px',

  display: 'inline-block',
  border: 'none',
  textDecoration: 'none',
  cursor: 'pointer'
};

export const Button: FC<{
  children: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean; // TODO
  onClick?: () => void;
}> = ({ children, style = {}, className, onClick, disabled }) => {
  return (
    <button
      style={{
        ...ButtonStyle,
        ...style
      }}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
