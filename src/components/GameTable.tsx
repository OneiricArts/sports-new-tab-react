import { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Button, Collapse, Table } from 'reactstrap';
import { isBeta } from '../flags';
import { displayGameStatus } from '../SportsDataAccessors/helpers';
import { Game, NFLGame } from '../SportsDataAccessors/types';
import { cx } from './classNames';
import { useNbaFavTeam } from './NBAFavTeams';

type GameI = Game | NFLGame;

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
  sport,
  showNatTvCol
}: {
  game: GameI;
  removeGame?: (id: number | string) => void;
  sport?: 'nfl' | 'mlb' | 'nba';
  showNatTvCol: boolean;
}) => {
  const handleClick = () => removeGame?.(game.id);

  const homeTeamHasPosession =
    'homeTeamHasPosession' in game ? game.homeTeamHasPosession : undefined;
  const awayTeamHasPosession =
    'homeTeamHasPosession' in game ? game.awayTeamHasPosession : undefined;

  const [showExpandedContent, setShowExpandedContent] = useState(false);

  const betaFavTeam =
    isBeta &&
    (
      [
        ['49ers', 'nfl'],
        ['buccaneers', 'nfl'],
        ['giants', 'mlb']
      ] as const
    ).some(
      ([v, x]) =>
        sport === x &&
        [game.homeTeam, game.awayTeam].map(g => g.toLowerCase()).includes(v)
    );

  const favTeam = useNbaFavTeam();
  const isFavTeam =
    (sport === 'nba' &&
      [game.homeTeam, game.awayTeam].includes(favTeam ?? '')) ||
    betaFavTeam;

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
        <td className="align-middle">{displayGameStatus(game.status)}</td>

        {showNatTvCol && (
          <td className="px-0">{game.isOnNationalTv && '📺'}</td>
        )}
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
  showX,
  showNatTvCol
}: {
  showX: boolean;
  showNatTvCol: boolean;
}) => (
  <thead>
    <tr>
      <th /* status */ />
      {showNatTvCol && <th />}
      <th>away</th>
      <th>@home</th>
      <th className="text-right">a</th>
      <th className="text-right">h</th>
      {showX && <th className="text-right" /* X */ />}
    </tr>
  </thead>
);

const GameTable = ({
  games,
  removeGame,
  sport
}: {
  games: GameI[];
  removeGame?: (id: number | string) => void;
  sport?: 'nfl' | 'mlb' | 'nba';
}) => {
  const showNatTvCol = games.some(g => !!g.isOnNationalTv);

  return (
    <Table responsive size="sm">
      <TableHeader showX={!!removeGame} showNatTvCol={showNatTvCol} />
      <tbody>
        {games
          .filter(game => !game.hidden)
          .map(game => (
            <GameRow
              key={game.id}
              game={game}
              removeGame={removeGame}
              sport={sport}
              showNatTvCol={showNatTvCol}
            />
          ))}
      </tbody>
    </Table>
  );
};

export default GameTable;
