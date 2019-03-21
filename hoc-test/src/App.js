import React, { Component } from 'react'
import './App.css'

import Infos from './components/Infos'
import List from './components/List'

const infoApiURL = 'http://www.mocky.io/v2/5c93b1b531000033345546e7';
const reposApiURL = 'http://www.mocky.io/v2/5c93b1e43100006b005546e9';
const starredApiURL = 'http://www.mocky.io/v2/5c93b20f3100006b055546eb';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Infos apiURL={infoApiURL} />
        <List apiURL={reposApiURL} title='My repo list' />
        <List apiURL={starredApiURL} title='My favorites' />
      </div>
    );
  }
}

export default App;
