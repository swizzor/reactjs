import React from 'react';

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

export default class Square extends React.Component {
    render() {
        let className = "square " + this.props.winnerClass;
        return (
        <button className={className} onClick={() => {this.props.onClick()}}>
            {this.props.value}
        </button>
        );
    }
};