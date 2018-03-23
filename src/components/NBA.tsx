import * as React from 'react';

import {NBADataType} from '../SportsDataAccessors/types';
import GameTable from './GameTable';

export interface NBAProps { nbaData: NBADataType; }

export class NFL extends React.Component<NBAProps, any> {
  constructor(props: NBAProps) {
    super();
    this.state = {
      nbaData: [],
    };
  }

  public componentDidMount() {
    NFLData.getNFLData().then(data => this.setState({ games: data }));

    // fetch('http://www.nfl.com/liveupdate/scores/scores.json')
    //   .then(response => response.json())
    //   .then((games: object[]) => {
    //     NFLData.getNFLData().then(data => this.setState({ games: data }));
    //   })
    //   .catch((error: TypeError) => {
    //     console.log('>>FUCK THE STUPID NFL API');
    //     console.log(error);
    //   });
  }

  public removeGame = (event: React.MouseEvent<HTMLElement>) => {
    console.log('removedGame');
    console.log(event.target);
  }

  public render() {
    console.log('test111');
    console.log(this.toType(this.state.games.gms));
    console.log(this.state.games.gms);
    if (this.state.games.gms) {
      console.log('yolo');

      const handlers: any = {};
      handlers.removeGame = this.removeGame;

      return (
        <div>
          <h1>Week {this.state.games.w}!</h1>
          <GameTable games={this.state.games.gms} handlers={handlers}/>
          {/* {this.state.games.gms.map((game: any) => {return <p>game</p>)} */}
          asdfs
        </div>
      );
    } else {
      console.log('wtfffff');
      return (<p>Error ...</p>);
    }
  }

  private toType(obj: any) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }
}
