import React, { FC } from 'react';
import { Card } from './simpleui';

const ErrorCard: FC<{ name: string }> = ({ name }) => {
  return (
    <Card
      title={
        <span>
          <span className="font-weight-bold">{name}</span>
        </span>
      }
    >
      <div className="p-4">
        <span>Something went wrong :( </span>
        <br />
        <span>Try refreshing the page.</span>
      </div>
    </Card>
  );
};

export default ErrorCard;
