import React from 'react';
import Square from './Square.jsx';

export default class Board extends React.Component {
    renderSquare(i) {
        let winnerClass = "";

        if(this.props.winners){

            for(let q = 0; q < this.props.winners.squares.length; ++q){
                if(this.props.winners.squares[q] === i){
                    winnerClass = "squareWinner";
                }
            }
        }

        return <Square winnerClass={winnerClass} key={i} value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }
    render() {
        return (
            <div>
                {
                    Array.from({length:3}).map((valx, idx) =>
                        <div key={idx} className="board-row">
                        {
                            Array.from({length:3}).map((valy, idy) => {
                                return this.renderSquare(idx*3+idy);
                            })
                        }
                        </div>
                    )
                }
            </div>
        );
    }
};