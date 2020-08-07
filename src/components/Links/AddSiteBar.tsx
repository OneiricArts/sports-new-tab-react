import React, { FC, useState } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { LinkI } from './Links';

type AddSiteProps = {
  addSite: (site: LinkI) => void;
};

export const AddSiteBar: FC<AddSiteProps> = ({ addSite }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  return (
    <Form
      inline
      className="py-2 px-3 d-flex border-bottom"
      style={{ gap: '5px' }}
    >
      <Input
        placeholder="Name"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <Input
        placeholder="Url - including http(s)"
        className="flex-grow-1"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />

      <Button
        color="primary"
        outline
        size="md"
        className="ml-auto"
        onClick={() => addSite({ title, url })}
      >
        Add
      </Button>
    </Form>
  );
};
