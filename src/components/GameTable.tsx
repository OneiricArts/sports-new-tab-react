import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Collapse, Spinner, Table } from 'reactstrap';
import { displayGameStatus } from '../SportsDataAccessors/helpers';
import { Game, NFLGame } from '../SportsDataAccessors/types';
import { cx } from './classNames';
import { useFavTeam } from './FavTeams';
import { BroadcastIcon } from '../icons/BroadcastIcon';
import { Loader } from './Loader';

type GameI = Game | NFLGame;
const gray = `#888888`;

const FootballEmoji = () => (
  <span
    role="img"
    aria-label="has posession"
    className="d-none d-md-inline d-lg-inline"
  >
    &nbsp;🏈
  </span>
);

const GameRow = ({
  game,
  removeGame,
  sport
}: {
  game: GameI;
  removeGame?: (id: number | string) => void;
  sport?: 'nfl' | 'mlb' | 'nba';
}) => {
  const handleClick = () => removeGame?.(game.id);

  const homeTeamHasPosession =
    'homeTeamHasPosession' in game ? game.homeTeamHasPosession : undefined;
  const awayTeamHasPosession =
    'homeTeamHasPosession' in game ? game.awayTeamHasPosession : undefined;

  const [showExpandedContent, setShowExpandedContent] = useState(false);

  const favTeam = useFavTeam(sport);
  const isFavTeam = [game.homeTeam, game.awayTeam].includes(favTeam ?? '');

  const firstLoad = useRef(true);
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    setHighlight(true);

    const tm = setTimeout(() => {
      setHighlight(() => false);
    }, 2000);

    return () => clearTimeout(tm);
  }, [
    game.homeTeamScore,
    game.awayTeamScore,
    homeTeamHasPosession,
    awayTeamHasPosession
  ]);

  const [highlight, setHighlight] = useState(false);

  return (
    <>
      <tr
        className={cx({
          'table-danger': (game as NFLGame).redzone && !highlight,
          'table-success': isFavTeam && !highlight,
          flash: highlight
        })}
        onClick={() => {
          if (game.expandedContent) {
            setShowExpandedContent(e => !e);
          }
        }}
      >
        <td className="align-middle">
          <div>{displayGameStatus(game.status)}</div>

          {game.isOnNationalTv && (
            <span
              className="px-0"
              style={{
                fontSize: '12px',
                display: 'flex',
                color: gray,
                maxHeight: '15px',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <BroadcastIcon style={{ height: '15px', color: gray }} />{' '}
              {game.broadcaster}
            </span>
          )}
        </td>

        <td
          className={`align-middle ${
            game.awayTeamWinning ? 'winning_team' : ''
          } ${(game as NFLGame).awayTeamHasPosession ? 'has_posession' : ''}`}
        >
          {game.awayTeamDisplay?.() ?? game.awayTeam}
          {(game as NFLGame).awayTeamHasPosession && <FootballEmoji />}
        </td>

        <td
          className={`align-middle ${
            game.homeTeamWinning ? 'winning_team' : ''
          } ${(game as NFLGame).homeTeamHasPosession ? 'has_posession' : ''}`}
        >
          {game.homeTeamDisplay?.() ?? game.homeTeam}
          {(game as NFLGame).homeTeamHasPosession && <FootballEmoji />}
        </td>

        <td className="align-middle text-right">{game.awayTeamScore}</td>
        <td className="align-middle text-right">{game.homeTeamScore}</td>

        {removeGame && (
          <td className="align-middle text-right">
            <Button
              outline={true}
              color="secondary"
              size="sm"
              onClick={handleClick}
            >
              &#9587;
            </Button>
          </td>
        )}
      </tr>
      {game.expandedContent && (
        <ExpandedContent
          expandedContent={game.expandedContent}
          isOpen={showExpandedContent}
        />
      )}
    </>
  );
};

const ExpandedContent = ({
  expandedContent,
  isOpen
}: {
  expandedContent: () => ReactNode;
  isOpen: boolean;
}) => {
  return (
    <tr>
      <td colSpan={6} style={{ padding: 0 }}>
        <Collapse isOpen={isOpen}>{expandedContent()}</Collapse>
      </td>
    </tr>
  );
};

export const ExpandedContentWrapper: FC<{ children?: ReactNode }> = ({
  children
}) => (
  <div className="text-muted small font-weight-light px-2 py-2 w-100">
    {children}
  </div>
);

const TableHeader = ({
  resetSchedule,
  isLoading
}: {
  resetSchedule?: () => void;
  isLoading: boolean;
}) => (
  <thead>
    <tr>
      <th /* status */>
        <Loader
          isLoading={isLoading}
          minimum={1200}
          spinner={<Spinner size="sm" color="primary" type="grow" />}
        />
      </th>
      <th>away</th>
      <th>@home</th>
      <th className="text-right">a</th>
      <th className="text-right">h</th>
      {resetSchedule && (
        <th className="text-right">
          <Button
            outline={true}
            color="secondary"
            size="sm"
            onClick={() => resetSchedule()}
          >
            {isLoading ? (
              <Spinner size="sm" color="primary" type="grow" />
            ) : (
              <span>&#x21ba;</span>
            )}
          </Button>
        </th>
      )}
    </tr>
  </thead>
);

const GameTable = ({
  games,
  removeGame,
  resetSchedule,
  isLoading = false,
  sport
}: {
  games: GameI[];
  removeGame?: (id: number | string) => void;
  isLoading?: boolean;
  resetSchedule?: () => void;
  sport?: 'nfl' | 'mlb' | 'nba';
}) => {
  return (
    // {isLoading && (
    //   <Progress animated style={{ height: '5px' }} color="info" value={100} />
    // )}

    <Table responsive size="sm">
      <TableHeader resetSchedule={resetSchedule} isLoading={isLoading} />
      <tbody>
        {games
          .filter(game => !game.hidden)
          .map(game => (
            <GameRow
              key={game.id}
              game={game}
              removeGame={removeGame}
              sport={sport}
            />
          ))}
      </tbody>
    </Table>
  );
};

export default GameTable;
