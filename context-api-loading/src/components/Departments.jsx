import React, { Component, Fragment } from 'react'
import { getDepartmentsNew } from '../services/api'

class Departments extends Component {

  state = {
    departments: [],
  }

  getDepartments = async () => {
    const { showLoading, hideLoading } = this.props;
    showLoading('Loading departments...');
    await getDepartmentsNew().then((response) => {
      hideLoading();
      this.setState({
        departments: response,
      });
    });
  }

  render(){
    const { departments } = this.state;
    return (
      <Fragment>
      <button onClick={this.getDepartments}>Search departments</button>
        <ul>
          {
            departments.map((elem, idx) => {
              const { id, name } = elem;
              return <li key={id}>{id} {name}</li>
            })
          }
        </ul>
      </Fragment>
    )
  }
}

export default Departments