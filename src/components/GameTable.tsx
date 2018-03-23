import * as React from 'react';

const removeGame = () => {
  console.log('test');
};

const GameRow = ({ game, handlers }: any) => (
  <tr>
    {/* clock */}
    <td>{game.extrainfo.d} {game.t}</td>

    {/* away team name */}
    <td className={game.visitor_winning ? 'winning_team' : ''}>
      {game.extrainfo.vnn}
    </td>

    {/* home team name */}
    <td className={game.home_winning ? 'winning_team' : ''}>
      { game.home_pos &&
        <span> 🏈  &nbsp;</span>
      }
      {game.extrainfo.hnn}
    </td>

    {/* scores */}
    <td>{game.away.score.T}</td>
    <td>{game.home.score.T}</td>

    {/* remove game */}
    <td onClick={handlers.removeGame}> X </td>
  </tr>
);

const GameTable = ({games, handlers}: any) => (
  <table>
    <thead>
      <tr>
        <th>time</th>
        <th>away</th>
        <th>@home</th>
        <th>score</th>
        <th>score</th>
        <th> X </th>
      </tr>
    </thead>
    <tbody>
    {games.map((game: any) => <GameRow game={game} handlers={handlers}/>)}
  </tbody>
  </table>
);

export default GameTable;
