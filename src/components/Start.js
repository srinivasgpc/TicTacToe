import React, { Component } from "react";
import Game from "./Game";
class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: "",
      player2: "",
      showGame: false,
    };
  }

  handleChange = (e, key) => {
    let player = key === "one" ? "player1" : "player2";
    this.setState({
      [player]: e.target.value,
    });
  };

  goToGame = (e) => {
    this.setState({
      showGame: true,
    });
  };
  render() {
    const { showGame } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {!showGame ? (
            <div>
              <input
                type="text"
                name="Player1"
                placeholder="Player1"
                onChange={(e) => this.handleChange(e, "one")}
              />
              <input
                type="text"
                name="Player2"
                placeholder="Player2"
                onChange={(e) => this.handleChange(e, "two")}
              />
              <button onClick={(e) => this.goToGame(e)}>Start</button>
            </div>
          ) : (
            <Game player1={this.state.player1} player2={this.state.player2} />
          )}
        </header>
      </div>
    );
  }
}

export default Start;
