import React, { Component, Fragment } from 'react'
import { getUsersNew } from '../services/api'

class Users extends Component {

  state = {
    users: [],
  }

  getUsers = async () => {
    const { showLoading, hideLoading } = this.props;
    showLoading('Loading users...');
    await getUsersNew().then((response) => {
      hideLoading();
      this.setState({
        users: response,
      });
    });
  }

  render(){
    const { users } = this.state;
    return (
      <Fragment>
        <button onClick={this.getUsers}>Search users</button>
        <ul>
          {
            users.map((elem, idx) => {
              const { id, first_name } = elem;
              return <li key={id}>{id} {first_name}</li>
            })
          }
        </ul>
      </Fragment>
    )
  }
}

export default Users