import React from 'react';
import Comment from './Comment'

export default class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
        }
    }
    render(){
        return (
            <div>
                <li>
                {this.props.msg}
                <button onClick={() => this.addComment()}>Add comment</button>
                <button onClick={() => this.props.onClickDel()}>Delete post</button>
                <ul>
                    {
                        Array.from(this.state.comments).map((elem, idx) => {
                            return <Comment onClickDel={() => {this.removeComment(idx)}} key={idx} msg={elem}/>
                        })
                    }
                </ul>
                </li>
            </div>
        )
    }
    addComment(){
        var m_comments = this.state.comments.slice();
        m_comments.push(`#${m_comments.length+1} Comment`);

        this.setState({
            comments: m_comments,
        });
    }
    removeComment(i){
        if(this.state.comments.indexOf(i)){
            const m_comments = this.state.comments.slice();
            m_comments.splice(i, 1);
            
            this.setState({
                comments: m_comments,
            });
        }
    }
}