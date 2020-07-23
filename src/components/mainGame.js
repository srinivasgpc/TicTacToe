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
        "Winner: " + (winner === "X" ? this.props.player1 : this.props.player2);
    } else if (this.state.winner.length > 0) {
      debugger;
      status = "Winner: " + this.state.winner;
    } else {
      status =
        "Next player: " +
        (this.state.xIsNext ? this.props.player1 : this.props.player2);
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
            <div className="names">
              <div> {this.props.player1} </div>
              {!this.state.playerStatus &&
              this.state.enableGame &&
              winner === null ? (
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
              {this.state.playerStatus &&
              this.state.enableGame &&
              winner === null ? (
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
