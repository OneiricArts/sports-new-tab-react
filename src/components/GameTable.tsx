import * as React from 'react';
import { Button, Table } from 'reactstrap';
import { displayGameStatus } from '../SportsDataAccessors/helpers';
import { Game, NFLGame } from '../SportsDataAccessors/types';

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
  removeGame
}: {
  game: GameI;
  removeGame?: (id: number | string) => void;
}) => {
  const handleClick = () => removeGame?.(game.id);

  return (
    <tr className={`${(game as NFLGame).redzone ? 'table-danger' : ''}`}>
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
  );
};

const TableHeader = () => (
  <thead>
    <tr>
      <th />
      {/* status */}
      <th>away</th>
      <th>@home</th>
      <th className="text-right">a</th>
      <th className="text-right">h</th>
      <th className="text-right" />
      {/* X */}
    </tr>
  </thead>
);

const GameTable = ({
  games,
  removeGame
}: {
  games: GameI[];
  removeGame?: (id: number | string) => void;
}) => (
  <Table responsive size="sm">
    <TableHeader />
    <tbody>
      {games
        .filter(game => !game.hidden)
        .map(game => (
          <GameRow key={game.id} game={game} removeGame={removeGame} />
        ))}
    </tbody>
  </Table>
);

export default GameTable;
