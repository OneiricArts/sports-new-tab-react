import { CSSProperties, FC, ReactNode } from 'react';
import cardStyles from './Card.module.scss';

export const NewCard: FC<NewCardProps> = ({ children, style = {} }) => {
  return (
    <div style={style} className={cardStyles.card}>
      {children}
    </div>
  );
};

type NewCardProps = {
  children: ReactNode;
  style?: CSSProperties;
};

export const NewCardHeader: FC<NewCardProps> = ({ children, style = {} }) => {
  return (
    <div style={style} className={cardStyles.header}>
      {children}
    </div>
  );
};
export const NewCardBody: FC<NewCardProps> = ({ children, style = {} }) => {
  return <div style={style}>{children}</div>;
};
