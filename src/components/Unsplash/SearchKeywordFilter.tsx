import React, { useState } from 'react';
import { Button, CustomInput, Input } from 'reactstrap';
import {
  checkIfCNTEnabled,
  getSearchFilters,
  updateSearchFilters
} from './BackgroundJsHelper';

export const SearchKeywordFilter = () => {
  checkIfCNTEnabled();

  const options = getSearchFilters();

  const [featured, setFeatured] = useState(options.featured);
  const [landscape, setLandscape] = useState(
    options.orientation === 'landscape'
  );
  const [topic, setTopic] = useState<string>(options.query || '');

  const save = () => {
    updateSearchFilters({
      featured,
      orientation: landscape ? 'landscape' : undefined,
      query: topic
    });
  };

  const reset = () => {
    window.CNT_resetBackgroundFilter?.();
    const newOptions = getSearchFilters();
    if (newOptions) {
      setFeatured(newOptions.featured);
      setLandscape(newOptions.orientation === 'landscape');
      setTopic(newOptions.query || '');
    }
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <h5>Filter by search word</h5>

      <div style={{ margin: '5px' }}>
        <CustomInput
          id="featured-checkbox"
          type="checkbox"
          label="Featured"
          checked={featured}
          onChange={() => setFeatured(e => !e)}
        />
        <CustomInput
          id="landscape-checkbox"
          type="checkbox"
          label="Landscape"
          checked={landscape}
          onChange={() => setLandscape(e => !e)}
        />
      </div>

      <div style={{ margin: '5px' }}>
        <Input
          placeholder="Enter topic"
          value={topic}
          onChange={e => setTopic(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '10px', margin: '5px' }}>
        <Button color="primary" outline onClick={save}>
          Save
        </Button>

        <Button color="danger" outline onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
};
