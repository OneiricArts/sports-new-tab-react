import * as React from 'react';
import { Button, Collapse, Table } from 'reactstrap';
import { isBeta } from '../flags';
import { displayGameStatus } from '../SportsDataAccessors/helpers';
import { Game, NFLGame } from '../SportsDataAccessors/types';
import { cx } from './classNames';

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
  sport
}: {
  game: GameI;
  removeGame?: (id: number | string) => void;
  sport?: 'nfl' | 'mlb' | 'nba';
}) => {
  const handleClick = () => removeGame?.(game.id);

  const [showExtraInfo, setShowExtraInfo] = React.useState(false);

  const favTeam =
    isBeta &&
    ([
      ['49ers', 'nfl'],
      ['buccaneers', 'nfl'],
      ['warriors', 'nba'],
      ['giants', 'mlb']
    ] as const).filter(
      ([v, x]) =>
        sport === x &&
        [game.homeTeam, game.awayTeam].map(g => g.toLowerCase()).includes(v)
    ).length > 0;

  return (
    <>
      <tr
        className={cx({
          'table-danger': (game as NFLGame).redzone,
          'table-success': favTeam
        })}
        onClick={() => {
          if (game.extraInfo) {
            setShowExtraInfo(e => !e);
          }
        }}
      >
        <td className="align-middle">{displayGameStatus(game.status)}</td>

        <td
          className={`align-middle ${
            game.awayTeamWinning ? 'winning_team' : ''
          } ${(game as NFLGame).awayTeamHasPosession ? 'has_posession' : ''}`}
        >
          {game.awayTeam}
          {(game as NFLGame).awayTeamHasPosession && <FootballEmoji />}
        </td>

        <td
          className={`align-middle ${
            game.homeTeamWinning ? 'winning_team' : ''
          } ${(game as NFLGame).homeTeamHasPosession ? 'has_posession' : ''}`}
        >
          {game.homeTeam}
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
      {game.extraInfo && (
        <ExtraInfo extraInfo={game.extraInfo} isOpen={showExtraInfo} />
      )}
    </>
  );
};

const ExtraInfo = ({
  extraInfo,
  isOpen
}: {
  extraInfo: NonNullable<GameI['extraInfo']>;
  isOpen: boolean;
}) => {
  return (
    <tr>
      <td colSpan={6} style={{ padding: 0 }}>
        <Collapse isOpen={isOpen}>
          <div className="text-muted small font-weight-light px-2 py-2 w-100">
            <div>
              <div className="mx-auto">
                {extraInfo.broadcaster && `📺 ${extraInfo.broadcaster}`}
              </div>
              {extraInfo.status && <div>{extraInfo.status}</div>}
            </div>
          </div>
        </Collapse>
      </td>
    </tr>
  );
};

const TableHeader = () => (
  <thead>
    <tr>
      <th /* status */ />
      <th>away</th>
      <th>@home</th>
      <th className="text-right">a</th>
      <th className="text-right">h</th>
      <th className="text-right" /* X */ />
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
}) => (
  <Table responsive size="sm">
    <TableHeader />
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

export default GameTable;
