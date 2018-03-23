import * as React from 'react';

import {NFLData} from '../SportsDataAccessors/NFLHelper';
import {NBADataType} from '../SportsDataAccessors/types';
import GameTable from './GameTable';

export interface NFLProps { games: object[]; }

export class NFL extends React.Component<NFLProps, any> {
  constructor(props: NFLProps) {
    super();
    this.state = {
      games: [],
    };
  }

  public componentDidMount() {
    NFLData.getNFLData().then(data => this.setState({ games: data }));
  }

  public removeGame = (event: React.MouseEvent<HTMLElement>) => {
    console.log('removedGame');
    console.log(event.target);
  }

  public render() {
    if (this.state.games) {
      const handlers: any = {};
      handlers.removeGame = this.removeGame;

      return (
        <div>
          <h1>Week {this.state.games.w}!</h1>
          <GameTable games={this.state.games} handlers={handlers}/>
          {/* {this.state.games.gms.map((game: any) => {return <p>game</p>)} */}
          asdfs
        </div>
      );
    } else {
      console.log('wtfffff');
      return (<p>Error ...</p>);
    }
  }
}
