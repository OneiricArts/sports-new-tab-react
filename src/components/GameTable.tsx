import * as React from 'react';
import { Button, Table } from 'reactstrap';
import { Game } from '../SportsDataAccessors/types';

interface GameRowI {
  game: Game;
  removeGame: (id: number) => void;
}

class GameRow extends React.Component<GameRowI, undefined> {
  public render() {
    const { game, removeGame } = this.props;
    return (
      <tr>
        <td>{game.status}</td>

        <td className={game.awayTeamWinning ? 'winning_team' : ''}>
          {game.awayTeam}
        </td>

        <td className={game.homeTeamWinning ? 'winning_team' : ''}>
          {game.homeTeam}
        </td>

        <td>{game.awayTeamScore}</td>
        <td>{game.homeTeamScore}</td>

        <td>
          {/* Way #4: Property Initializers (good, ESnext)
            Dont use arrow function inside onClick?
          */}
          <Button outline={true} color="secondary" size="sm" onClick={() => removeGame(game.id)}>&#9587;</Button>
        </td>
      </tr>
    );
  }

  // https://daveceddia.com/avoid-bind-when-passing-props/
  // private handleClick = () => {
  //   this.props.removeGame(this.props.game.id);
  // }
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

const GameTable = ({ games, removeGame }: { games: Game[], removeGame: (id: number) => void }) => (
  <Table>
    <TableHeader />
    <tbody>
      {games
        .filter(game => !game.hidden)
        .map((game, index) => <GameRow key={index} game={game} removeGame={removeGame} />)}
    </tbody>
  </Table>
);

export default GameTable;
