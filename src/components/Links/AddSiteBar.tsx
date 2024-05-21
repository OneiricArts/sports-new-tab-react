import React, { FC, useState } from 'react';
import { Form } from 'reactstrap';
import { LinkI } from './Links';
import { Button } from '../UI/Button';

type AddSiteProps = {
  addSite: (site: LinkI) => void;
};

export const AddSiteBar: FC<AddSiteProps> = ({ addSite }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  return (
    <Form inline className="py-2  d-flex" style={{ gap: '5px' }}>
      <input
        placeholder="Name"
        style={{ flexGrow: 0 }}
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        placeholder="Url - including http(s)"
        className="flex-grow-1"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />

      <Button onClick={() => addSite({ title, url })}>Add</Button>
    </Form>
  );
};
