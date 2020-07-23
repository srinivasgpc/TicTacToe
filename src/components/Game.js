import React, { Component } from "react";
import GameBoard from "./GameBoard";
class Game extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <div>{this.props.player1}</div>
          <button>Play</button>
          <div>{this.props.player2}</div>
        </div>

        <GameBoard player1={this.props.player1} player2={this.props.player2} />
      </div>
    );
  }
}

export default Game;
