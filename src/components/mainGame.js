import React, { Component } from "react";
import GameBoard from "./GameBoard";
import Countdown from "react-countdown";

//core logic
class MainGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerStatus: null,
      enableGame: false,
      winner: "",
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  startGame = () => {
    let { history } = this.state;

    let fillall = history[history.length - 1]["squares"].includes(null);
    console.log(fillall);

    this.setState({
      enableGame: true,
      winner: "",
    });
  };
  resetGame = () => {
    let { history } = this.state;

    history[0]["squares"] = Array(9).fill(null);

    this.setState({
      history: history,
      winner: "",
      xIsNext: true,
      playerStatus: null,
      enableGame: false,
      stepNumber: 0,
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

  //click event for x and o determination
  handleClick(i) {
    if (this.state.enableGame) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState({
        history: history.concat([
          {
            squares: squares,
          },
        ]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
        playerStatus: !this.state.xIsNext,
      });
    } else {
      alert("Please start the game");
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
  formatTimer = (value) => {
    let newValue = Math.floor(Math.round(value / 1000));
    return newValue;
  };
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    if (winner) {
      status =
        "Winner: " + (winner === "X" ? this.props.player2 : this.props.player1);
    } else if (this.state.winner.length > 0) {
      status = "Winner: " + this.state.winner;
    } else if (!current.squares.includes(null)) {
      status = "Draw";
    }

    return (
      <div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "500px",
            }}
          >
            <div
              className="names"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className={!this.state.xIsNext ? "background-class" : null}>
                {" "}
                {this.props.player1}{" "}
              </div>
              {!this.state.xIsNext &&
              this.state.enableGame &&
              current.squares.includes(null) &&
              winner === null ? (
                <div className="timer">
                  {/* <div className="greenDot"> </div> */}
                  <Countdown
                    date={Date.now() + 5000}
                    intervalDelay={0}
                    precision={3}
                    onComplete={(value) =>
                      this.onComplete(value, this.props.player2)
                    }
                    renderer={(props) => (
                      <div>{this.formatTimer(props.total)}</div>
                    )}
                  />
                </div>
              ) : null}
            </div>
            <button
              onClick={
                winner !== null || this.state.winner.length > 0
                  ? this.resetGame
                  : this.startGame
              }
            >
              {winner !== null || this.state.winner.length > 0
                ? "Reset"
                : "Start"}
            </button>

            <div
              className="names"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className={this.state.xIsNext ? "background-class" : null}>
                {" "}
                {this.props.player2}
              </div>
              {this.state.xIsNext &&
              this.state.enableGame &&
              current.squares.includes(null) &&
              winner === null ? (
                <div className="timer">
                  {/* <div className="greenDot"> </div> */}
                  <Countdown
                    date={Date.now() + 5000}
                    intervalDelay={0}
                    precision={3}
                    onComplete={(value) =>
                      this.onComplete(value, this.props.player1)
                    }
                    renderer={(props) => (
                      <div>{this.formatTimer(props.total)}</div>
                    )}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div
          className="game "
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <div className="game-board">
            <GameBoard
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>

            {/* <ol>{moves}</ol> */}
          </div>
        </div>
      </div>
    );
  }
}

export default MainGame;

//winner calculation
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
