import React from 'react';
import './App.css';
import Game from './game/game';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      game: new Game()
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ game: this.state.game }), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className='App'>
        Floor: {this.state.game.floor}
      </div>
    );
  }
}