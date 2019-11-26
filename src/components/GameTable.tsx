import * as React from 'react';
import { Button, Table } from 'reactstrap';
import { NFLGame } from '../SportsDataAccessors/types';

const GameRow = ({ game, removeGame }: { game: NFLGame, removeGame: (id: number) => void }) => {
  const handleClick = () => removeGame(game.id);

  return (
    <tr>
      <td>{game.status}</td>

      <td className={`${game.awayTeamWinning ? 'winning_team' : ''} ${game.awayTeamHasPosession ? 'has_posession' : ''}`}>
        {game.awayTeam}
        {game.awayTeamHasPosession && <span className="d-none d-md-inline d-lg-inline"> 🏈</span>}
      </td>

      <td className={`${game.homeTeamWinning && 'winning_team'} ${game.homeTeamHasPosession ? 'has_posession' : ''}`}>
        {game.homeTeam}
        {game.homeTeamHasPosession && <span className="d-none d-md-inline d-lg-inline"> 🏈</span>}
      </td>

      <td>{game.awayTeamScore}</td>
      <td>{game.homeTeamScore}</td>

      <td>
        <Button outline={true} color="secondary" size="sm" onClick={handleClick}>&#9587;</Button>
      </td>
    </tr>
  );
}

const TableHeader = () => (
  <thead>
    <tr>
      <th/>{/* status */}
      <th>away</th>
      <th>@home</th>
      <th>a</th>
      <th>h</th>
      <th/>{/* X */}
    </tr>
  </thead>
);

const GameTable = ({ games, removeGame }: { games: NFLGame[], removeGame: (id: number) => void }) => (
  <Table responsive size="sm">
    <TableHeader />
    <tbody>
      {
        games
          .filter(game => !game.hidden)
          .map((game, index) => <GameRow key={index} game={game} removeGame={removeGame} />)
      }
    </tbody>
  </Table>
);

export default GameTable;
