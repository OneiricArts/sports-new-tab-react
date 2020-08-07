import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button, CustomInput, Input } from 'reactstrap';
import { ErrorBoundary } from './ErrorBoundary';

interface FilterI {
  featured: boolean;
  query?: string;
  orientation?: 'landscape';
}

declare global {
  interface Window {
    CNT_getBackgroundFilter?: () => FilterI;
    CNT_setBackgroundFilter?: (filter: FilterI) => Promise<void>;
    CNT_resetBackgroundFilter?: () => void;
  }
}

window.CNT_getBackgroundFilter = window.CNT_getBackgroundFilter || undefined;

const BackgroundInfo = () => {
  if (!window.CNT_getBackgroundFilter || !window.CNT_setBackgroundFilter) {
    throw new Error(
      'CNT_getBackgroundFilter or CNT_setBackgroundFilter not found'
    );
  }

  const options = window.CNT_getBackgroundFilter();

  const [featured, setFeatured] = useState(options.featured);
  const [landscape, setLandscape] = useState(
    options.orientation === 'landscape'
  );
  const [topic, setTopic] = useState<string>(options.query || '');

  const [showFilters, setShowFilters] = useState(false);

  const save = () => {
    window.CNT_setBackgroundFilter?.({
      featured,
      orientation: landscape ? 'landscape' : undefined,
      query: topic
    });

    setShowFilters(false);
  };

  const reset = () => {
    window.CNT_resetBackgroundFilter?.();
  };

  return showFilters ? (
    <>
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
      <Input
        placeholder="Enter topic"
        size={15}
        value={topic}
        onChange={e => setTopic(e.target.value)}
      />
      <Button color="primary" outline onClick={save}>
        Save
      </Button>

      <Button color="danger" outline onClick={reset}>
        Reset
      </Button>

      <Button color="secondary" outline onClick={() => setShowFilters(false)}>
        Cancel
      </Button>
    </>
  ) : (
    <Button color="primary" outline onClick={() => setShowFilters(e => !e)}>
      Set Filters
    </Button>
  );
};

const BackgroundInfoPortal: FC = ({ children }) =>
  createPortal(
    children,
    document.getElementById('background-js-filters') as Element
  );

const BackgroundInfoWrapped = () => (
  <BackgroundInfoPortal>
    <ErrorBoundary>
      <BackgroundInfo />
    </ErrorBoundary>
  </BackgroundInfoPortal>
);

export default BackgroundInfoWrapped;
