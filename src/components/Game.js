import React, { Component } from "react";
import MainGame from "./mainGame";
import Countdown from "react-countdown";
class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStatus: null,
      enableGame: false,
      winner: "",
    };
  }
  startGame = () => {
    this.setState({
      enableGame: true,
      winner: "",
    });
  };
  //status of the player
  changeStatus = (value) => {
    console.log(value);
    this.setState({
      playerStatus: value,
    });
  };
  onComplete = (value, key) => {
    if (value.completed === true) {
      this.setState({
        enableGame: false,
        winner: key,
      });
    }
  };
  render() {
    console.log(this.props);
    return (
      <div>
        {this.state.winner.length > 0 ? (
          <div>
            Winner: <span>{this.state.winner}</span>
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "500px",
          }}
        >
          <div className="names">
            <div> {this.props.player1} </div>
            {!this.state.playerStatus && this.state.enableGame ? (
              <div>
                <div className="greenDot"> </div>
                <Countdown
                  date={Date.now() + 5000}
                  intervalDelay={0}
                  precision={3}
                  onComplete={(value) =>
                    this.onComplete(value, this.props.player2)
                  }
                  renderer={(props) => <div>{props.total}</div>}
                />
              </div>
            ) : null}
          </div>
          <button onClick={this.startGame}>Play</button>
          <div className="names">
            <div> {this.props.player2}</div>
            {this.state.playerStatus && this.state.enableGame ? (
              <div>
                <div className="greenDot"> </div>
                <Countdown
                  date={Date.now() + 5000}
                  intervalDelay={0}
                  precision={3}
                  onComplete={(value) =>
                    this.onComplete(value, this.props.player1)
                  }
                  renderer={(props) => <div>{props.total}</div>}
                />
              </div>
            ) : null}
          </div>
        </div>
        <MainGame
          enableGame={this.state.enableGame}
          player1={this.props.player1}
          player2={this.props.player2}
          playerStatus={this.changeStatus}
        />
      </div>
    );
  }
}

export default Game;
