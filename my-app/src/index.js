import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// function Square(props){
//     return (
//         <button
//         className="square"
//         onClick={props.onClick}
//         >
//         {props.value}
//         </button>
//     );
// }

class Square extends React.Component {
    render() {
        return (
        <button
        className="square"
        onClick={() => {this.props.onClick()}}
        >
        {this.props.value}
        </button>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
      return <Square
                value = {this.props.squares[i]}
                onClick = {() => this.props.onClick(i)}
                />;
    }
    render() {
        return (
            <div>
                {
                    Array.from({length:3}).map((valx, idx) =>
                        <div className="board-row">
                        {
                            Array.from({length:3}).map((valy, idy) => {
                                return this.renderSquare(idx*3+idy);
                            })
                        }
                        </div>
                    )
                }
            </div>

            // <div>
            //     <div className="board-row">
            //     {this.renderSquare(0)}
            //     {this.renderSquare(1)}
            //     {this.renderSquare(2)}
            //     </div>
            //     <div className="board-row">
            //     {this.renderSquare(3)}
            //     {this.renderSquare(4)}
            //     {this.renderSquare(5)}
            //     </div>
            //     <div className="board-row">
            //     {this.renderSquare(6)}
            //     {this.renderSquare(7)}
            //     {this.renderSquare(8)}
            //     </div>
            // </div>
        );
    }
}
  
class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                selectedIndex: null,
            }],
            stepNumber: 0,
            xIsNext: true,
        };
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            
            let bold = "";

            if(move === this.state.stepNumber){
                bold = "buttonSelected";
            }

            let row,col;
            let player;

            if(step.selectedIndex !== null){
                row = Math.floor(step.selectedIndex / 3) + 1;
                col = (step.selectedIndex % 3) + 1;
            }

            player = (move % 2) === 0 ? 'O' : 'X';

            const desc = move ?
                `Go to move #${move}: ${player} on (${col},${row})`
                :
                `Go to game start`;
            return (
                <li key={move}>
                    <button className={bold} onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });

        let status;
        if(winner){
            status = `Winner: ${winner}`;
        } else if(history.length < 10) {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        } else {
            status = `Draw !`;
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board
                squares = {current.squares}
                onClick={(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    }
    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length-1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                selectedIndex: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }
    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }
}
  
function calculateWinner(squares){
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

// ========================================
  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
  