import React, { ReactNode } from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

const MyCard: React.FC<{ title: ReactNode }> = ({ title, children }) => {
  return (
    <Card>
      <CardHeader>{title}</CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
};

export const MyCardHeader = CardHeader;
// export const MyCardBody = CardBody;

export default MyCard;
