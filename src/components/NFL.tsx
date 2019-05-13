import * as React from 'react';

import { fetchNFLDataAsync } from '../SportsDataAccessors/NFLHelper';
import { Schedule } from '../SportsDataAccessors/types';
import GameTable from './GameTable';

export interface NFLState {
  on: boolean;
  schedule: Schedule;
}

export class NFL extends React.Component<{}, NFLState> {
  constructor() {
    super({});
    this.state = {
      on: false,
      schedule: {
        displayDate: '',
        games: [],
      },
    };
  }

  public componentDidMount() {
    fetchNFLDataAsync().then(schedule => this.setState({ schedule }));
  }

  public removeGame = (id: number) => {
    this.state.schedule.games = this.state.schedule.games.map(game => {
      if (game.id === id) {
        game.hidden = true;
      }
      return game;
    });

    this.setState({schedule: this.state.schedule});
  }

  public render() {

    // if (!this.state.on) {
    //   return null;
    // }

    if (this.state.schedule.games) {
      return (
        <div>
          <h1>NFL</h1>
          <h3>Week {this.state.schedule.displayDate}</h3>
          <GameTable games={this.state.schedule.games} removeGame={this.removeGame}/>
        </div>
      );
    } else {
      return (<p>Error ...</p>);
    }
  }
}
