import React, { Component } from "react";
import MainGame from "./mainGame";
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStatus: null,
    };
  }
  changeStatus = (value) => {
    console.log(value);
    this.setState({
      playerStatus: value,
    });
  };
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
          <div className="names">
            <div> {this.props.player1} </div>
            {!this.state.playerStatus ? (
              <span className="greenDot"> </span>
            ) : null}
          </div>
          <button>Play</button>
          <div className="names">
            <div> {this.props.player2}</div>
            {this.state.playerStatus ? (
              <span className="greenDot"> </span>
            ) : null}
          </div>
        </div>
        <MainGame
          player1={this.props.player1}
          player2={this.props.player2}
          playerStatus={this.changeStatus}
        />
      </div>
    );
  }
}

export default Game;
