import React, { FC } from 'react';
import { Progress } from 'reactstrap';

export const LoadingBar: FC<{
  loading?: boolean;
  error?: boolean;
  height?: string;
}> = ({ loading, error, height = '5px' }) => (
  <div style={{ height }}>
    {loading && (
      <Progress animated style={{ height }} color="info" value={100} />
    )}

    {error && <Progress style={{ height }} color="danger" value={100} />}
  </div>
);
