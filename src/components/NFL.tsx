import * as React from 'react';

import {fetchNFLDataAsync} from '../SportsDataAccessors/NFLHelper';
import { Game } from '../SportsDataAccessors/types';
import GameTable from './GameTable';

export interface NFLProps { games: Game[]; }
export interface NFLState {
  games: Game[];
}

export class NFL extends React.Component<NFLProps, NFLState> {
  constructor(props: NFLProps) {
    super();
    this.state = {
      games: [],
    };
  }

  public componentDidMount() {
    fetchNFLDataAsync().then(data => this.setState({ games: data.games }));
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
          {/* <h1>Week {this.state.games.w}!</h1> */}
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
