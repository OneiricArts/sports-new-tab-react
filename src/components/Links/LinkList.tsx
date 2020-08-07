import React from 'react';
import { Button, ListGroup } from 'reactstrap';
import { LinkI } from './Links';

type LinkListProps = {
  list: LinkI[];
  onRemove?: (index: number) => void;
};

export const LinkList = ({ list, onRemove }: LinkListProps) => {
  return (
    <ListGroup flush>
      {list.map(({ url, title }, i) => (
        <a
          key={`${i} ${url} ${title}`}
          href={url}
          className="list-group-item list-group-item-action d-flex"
        >
          {title}

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
        </a>
      ))}
    </ListGroup>
  );
};
