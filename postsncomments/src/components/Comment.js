import React from 'react';

export default class Comment extends React.Component {
    render(){
        return(
            <div>
                <li>
                    {this.props.comment.text} <button onClick={() => {this.props.onClickDel()}}>Delete comment</button>
                </li>
            </div>
        )
    }
}