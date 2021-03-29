import React, { CSSProperties, FC } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  UncontrolledCarousel
} from 'reactstrap';
import { sanitize } from 'dompurify';
import { UpdateFilterI } from './BackgroundJsHelper';
import { Topic } from './Types';

type TopicCardProps = {
  updater: UpdateFilterI;
  topic: Topic;
  active: boolean;
};

export const TopicCard: FC<TopicCardProps> = ({ updater, topic, active }) => {
  const cardStyles: CSSProperties = {
    margin: '10px 0',
    padding: '10px'
  };

  if (active) cardStyles.border = '3px solid #0096FF';

  return (
    <Card key={topic.id} style={cardStyles}>
      <CardTitle>
        <h3>
          <a href={topic.links.html} target="_blank" rel="noopener noreferrer">
            {topic.title}
          </a>
        </h3>
      </CardTitle>

      <UncontrolledCarousel
        items={[
          {
            caption: '',
            src: `${topic.cover_photo.urls.raw}&fit=crop&h=300&w=500`
          },
          ...(topic.preview_photos?.map((e, i) => {
            return {
              caption: '',
              src: `${e.urls.raw}&fit=crop&h=300&w=500`
            };
          }) ?? [])
        ]}
      />

      <CardBody>
        <div
          dangerouslySetInnerHTML={{ __html: sanitize(topic.description) }}
          style={{
            marginBottom: '10px',
            marginTop: '10px'
          }}
        />

        <hr />

        <div style={{ display: 'flex', width: '100%' }}>
          <a href={topic.links.html}>
            View all ({topic.total_photos}) pictures in topic.
          </a>

          <Button
            color="primary"
            outline
            size="md"
            className="ml-auto"
            onClick={() => {
              updater({ topic: topic.id });
            }}
            disabled={active}
          >
            {active ? 'Active' : 'Set'}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
