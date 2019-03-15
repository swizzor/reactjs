import React from 'react';
import Board from './Board.jsx'

export default class Game extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                selectedIndex: null,
                moveNumber: 0,
            }],
            stepNumber: 0,
            xIsNext: true,
            ascendingSort: true,
        };
    }
    render() {
        const history = this.state.history;
        const current = history.find((a) => a.moveNumber === this.state.stepNumber);
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            
            let bold = "";

            if(step.moveNumber === this.state.stepNumber){
                bold = "buttonSelected";
            }

            let row,col;
            let player;

            if(step.selectedIndex !== null){
                row = Math.floor(step.selectedIndex / 3) + 1;
                col = (step.selectedIndex % 3) + 1;
            }

            player = (step.moveNumber % 2) === 0 ? 'O' : 'X';

            const desc = step.moveNumber ?
                `Go to move #${step.moveNumber}: ${player} on (${col},${row})`
                :
                `Go to game start`;
            return (
                <li key={step.moveNumber}>
                    <button className={bold} onClick={() => this.jumpTo(step.moveNumber)}>{desc}</button>
                </li>
            )
        });

        let status;
        if(winner){
            status = `Winner: ${winner.marker}`;
        } else if(history.length < 10) {
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
        } else {
            status = `Draw !`;
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board
                winners = {winner}
                squares = {current.squares}
                onClick = {(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <button onClick={() => this.onClickSort(this.state.ascendingSort)}>{this.state.ascendingSort ? "Descending" : "Ascending"} sort</button>
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
                moveNumber: history.length,
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
    onClickSort(ascending){

        const hist = this.state.history.slice();

        // If actual sort is ascending, then do the opposite
        if(ascending){
            hist.sort((a,b) => {return b.moveNumber-a.moveNumber});
        } else {
            hist.sort((a,b) => {return a.moveNumber-b.moveNumber});
        }

        this.setState({
            history: hist,
            ascendingSort: !ascending,
        });
    }
};
  
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
          return {marker: squares[a], squares: [a,b,c]};
        }
      }
      return null;
}