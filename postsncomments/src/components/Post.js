import React from 'react';
import Comment from './Comment'

export default class Post extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comments: [],
            newCommentText: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    render(){
        return (
            <div>
                <li>
                {this.props.msg}
                <button onClick={() => this.props.onClickDel()}>Delete post</button>
                <form onSubmit={this.handleSubmit}>
                    <input 
                        value={ this.state.newCommentText }
                        onChange={ this.handleTextChange }
                    />
                    <button type="submit">Add comment</button>
                </form>
                <ul>
                    {
                        this.state.comments.map((elem, idx) => {
                            return <Comment onClickDel={() => {this.removeComment(idx)}} key={idx} comment={elem}/>
                        })
                    }
                </ul>
                </li>
            </div>
        )
    }
    handleSubmit(e){
        this.setState({
            comments: [
                ...this.state.comments,
                { text: this.state.newCommentText }
            ]
        });

        this.setState({ newCommentText: '' })

        e.preventDefault();
    }
    handleTextChange(e){
        this.setState({ newCommentText: e.target.value })
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