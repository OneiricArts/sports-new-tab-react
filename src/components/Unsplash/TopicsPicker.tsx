import React, { useEffect, useState } from 'react';
import { CustomInput, FormGroup, Label } from 'reactstrap';
import {
  checkIfCNTEnabled,
  getTopics,
  getTopicsFilters,
  UpdateFilterI,
  useTopicFilterUpdate
} from './BackgroundJsHelper';
import { TopicCard } from './TopicCard';
import { TopicsResponse } from './Types';

export const TopicsPicker = () => {
  const [topicsData, setTopicsData] = useState<TopicsResponse>();

  useEffect(() => {
    getTopics().then(data => setTopicsData(data));
  }, []);

  checkIfCNTEnabled();
  let options = getTopicsFilters();

  const [updater] = useTopicFilterUpdate();

  return (
    <>
      <Filters updater={updater} />

      <div>
        {topicsData?.map(topic => (
          <TopicCard
            updater={updater}
            key={topic.id}
            topic={topic}
            active={options.topic === topic.slug || options.topic === topic.id}
          />
        ))}
      </div>
    </>
  );
};

function Filters({ updater }: { updater: UpdateFilterI }) {
  let options = getTopicsFilters();

  const updateOptions = (opt: undefined | 'landscape' | 'portrait') => {
    updater({ orientation: opt });
  };

  return (
    <div style={{ border: '3px solid lightgray', padding: '10px' }}>
      <h4>Filters (will apply to selected topic)</h4>
      <FormGroup>
        <Label for="exampleCheckbox">Orientation</Label>
        <div>
          {[
            {
              label: 'Any',
              checked: options.orientation === undefined,
              onChange: () => updateOptions(undefined)
            },
            {
              label: 'Landscape',
              checked: options.orientation === 'landscape',
              onChange: () => updateOptions('landscape')
            },
            {
              label: 'Vertical',
              checked: options.orientation === 'portrait',
              onChange: () => updateOptions('portrait')
            }
          ].map(o => (
            <CustomInput
              key={`orientation-${o.label}`}
              inline
              type="radio"
              id={`orientation-${o.label}`}
              label={o.label}
              checked={o.checked}
              onChange={o.onChange}
            />
          ))}
        </div>
      </FormGroup>
    </div>
  );
}
