import React from 'react';
import { Button } from 'reactstrap';
import { LinkI } from './Links';
import { Row, Table } from '../UI/Table';

type LinkListProps = {
  list: LinkI[];
  onRemove?: (index: number) => void;
};

export const LinkList = ({ list, onRemove }: LinkListProps) => {
  return (
    <Table columnConfig="auto 35px">
      {list.map(({ url, title }, i) => (
        <Row
          key={`${i} ${url} ${title}`}
          columnSpan={2}
          style={{ padding: '8px' }}
        >
          <a href={url} target="_parent" style={{ display: 'flex', flex: 1 }}>
            {title}
          </a>

          {onRemove && (
            <Button
              onClick={e => {
                e.preventDefault();
                onRemove(i);
              }}
              size="sm"
              outline
              className="ml-auto"
            >
              &#9587;
            </Button>
          )}
        </Row>
      ))}
    </Table>
  );
};
