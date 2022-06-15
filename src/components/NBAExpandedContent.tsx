import React from 'react';
import { ExpandedContentWrapper } from './GameTable';

export const getNbaExpandedContent =
  (opts: {
    broadcaster?: string;
    awayTeam?: string;
    homeTeam?: string;
    awayTeamRecord?: string;
    homeTeamRecord?: string;
    awayTeamRank?: string;
    homeTeamRank?: string;
  }) =>
  () => {
    if (Object.values(opts).every(v => v === undefined)) return undefined;
    return (
      <ExpandedContentWrapper>
        <div style={{ display: 'flex' }}>
          {[
            {
              teamName: opts.awayTeam,
              record: opts.awayTeamRecord,
              rank: opts.awayTeamRank
            },
            {
              teamName: opts.homeTeam,
              record: opts.homeTeamRecord,
              rank: opts.homeTeamRank
            }
          ].map((t, i) => (
            <div
              style={{
                flex: '1',
                textAlign: i === 0 ? 'right' : 'left',
                borderRight:
                  i === 0 ? '1px solid rgb(128, 128, 128)' : undefined,
                padding: '10px'
              }}
              key={`${t.teamName}`}
            >
              {t.teamName && <h6>{t.teamName}</h6>}
              {t.rank && <div>#{t.rank}</div>}
              {t.record && <div>{t.record}</div>}
            </div>
          ))}
        </div>

        {opts.broadcaster && (
          <div style={{ textAlign: 'center' }}>{`📺 ${opts.broadcaster}`}</div>
        )}
      </ExpandedContentWrapper>
    );
  };
