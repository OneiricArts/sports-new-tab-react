import React, { ReactNode } from 'react';
import { NewCard, NewCardBody, NewCardHeader } from '../components/UI/Card';

const MyCard: React.FC<{ title: ReactNode; children?: ReactNode }> = ({
  title,
  children
}) => {
  return (
    <NewCard>
      <NewCardHeader>{title}</NewCardHeader>
      <NewCardBody>{children}</NewCardBody>
    </NewCard>
  );
};

export const MyCardHeader = NewCardHeader;
// export const MyCardBody = CardBody;

export default MyCard;
