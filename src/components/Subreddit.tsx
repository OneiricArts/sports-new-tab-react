import React, { FC, useEffect, useState } from 'react';
import { Button, ListGroup } from 'reactstrap';
import { Emoji } from './Emoji';
import { LoadingBar } from './Loading';
import { SubredditJson } from './SubredditJsonTypes';

type SubredditPosts = {
  id: string;
  title: string;
  permalink: string;
  link_flair_text?: string;
}[];

const getCache = (subreddit: string): SubredditPosts | undefined => {
  const cache = localStorage.getItem(`subreddit_cache_${subreddit}`);
  return cache ? JSON.parse(cache) : undefined;
};

const saveCache = (subreddit: string, data: SubredditPosts): void => {
  localStorage.setItem(`subreddit_cache_${subreddit}`, JSON.stringify(data));
};

export const SubredditCard: FC<{ subreddit: string; length?: number }> = ({
  subreddit,
  length = 5
}) => {
  const [state, setState] = useState<'loading' | 'error' | 'neutral'>(
    'neutral'
  );
  const [data, setData] = useState<SubredditPosts | undefined>(
    getCache(subreddit)
  );

  useEffect(() => {
    setState('loading');
    fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(d => d.json())
      .then((d: SubredditJson) => {
        const postsArr: SubredditPosts = d.data.children
          .slice(0, length)
          .map(d => ({
            id: d.data.id,
            title: d.data.title,
            link_flair_text: d.data.link_flair_text ?? undefined,
            permalink: d.data.permalink
          }));

        setData(postsArr);
        saveCache(subreddit, postsArr);
        setState('neutral');
      })
      .catch(() => setState('error'));
  }, [subreddit, length]);

  return (
    <div>
      <LoadingBar loading={state === 'loading'} error={state === 'error'} />

      {state === 'error' && (
        <div
          style={{
            padding: '5px',
            margin: '7px',
            border: '1px solid red',
            borderRadius: '5px',
            backgroundColor: '#faecee'
          }}
        >
          <Emoji emoji="🚨" label="Error emoji" />
          &nbsp;Error retrieving posts from r/
          {subreddit}
          {data && data.length > 0 ? ' - showing cached posts.' : '.'}
        </div>
      )}

      <ListGroup flush>
        {data?.map(({ id, link_flair_text, title, permalink }) => (
          <a
            key={id}
            href={`https://reddit.com${permalink}`}
            style={{ fontSize: '12px' }}
            className="list-group-item list-group-item-action d-flex p-2"
          >
            <span>
              {link_flair_text && (
                <span style={{ color: '#2e9dff' }}>
                  [{link_flair_text}] &nbsp;
                </span>
              )}
              <span>
                {title.length > 90 ? `${title.substring(0, 90)}...` : title}
              </span>
            </span>
          </a>
        ))}
      </ListGroup>
    </div>
  );
};

export const SubredditTitle: FC<{
  subreddit: string;
  expanded: boolean;
  toggle: () => void;
}> = ({ subreddit, expanded, toggle }) => (
  <div
    style={{
      padding: '10px',
      paddingBottom: '5px',
      display: 'flex',
      justifyContent: 'center'
    }}
  >
    <Button
      style={{ height: '20px', padding: '0 5px 0 5px' }}
      outline
      size="sm"
      onClick={toggle}
    >
      {!expanded ? `Show r/${subreddit} feed` : 'Hide feed'}
    </Button>

    <a
      style={{ height: '20px', padding: '0 5px 0 5px' }}
      href={`https://www.reddit.com/r/${subreddit}`}
      className="btn btn-outline-secondary btn-sm ml-2"
      role="button"
    >
      r/{subreddit}
    </a>
  </div>
);
