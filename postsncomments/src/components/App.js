import React from 'react';
import Post from './Post'

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
        }
    }
    render(){
        return (
            <div>
                <h1>Posts`n Comments</h1>
                <button onClick={() => this.addPost()}>New Post</button>
                <ul>
                    {
                        Array.from(this.state.posts).map((elem, idx) => {
                            return <Post key={idx} onClickDel={() => {this.removePost(idx)}} msg={elem}/>
                        })
                    }
                </ul>
            </div>
        )
    }
    addPost(){
        var m_posts = this.state.posts.slice();
        m_posts.push(`#${m_posts.length+1} Post`);

        this.setState({
            posts: m_posts,
        });
    }
    removePost(i){
        if(this.state.posts.indexOf(i)){
            const m_posts = this.state.posts.slice();
            m_posts.splice(i, 1);
            this.setState({
                posts: m_posts,
            });
        }
    }
}