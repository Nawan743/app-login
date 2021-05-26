import React from 'react';
import './index.css';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Index extends React.Component {
  state = {
    email: '',
    password: '',
    logged: 0
  }

  changeEmail = event => {
    this.setState({ email: event.target.value });
  }

  changePassword = event => {
    this.setState({ password: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.post(`https://projeto-integrador-4.herokuapp.com/auth/login`, { email: this.state.email, password: this.state.password })
      .then(res => {
        if (res.status === 200)
          this.setState({ logged: 1 });
      });
  }

  render() {
    let status = <p className="offline">Offline</p>
    if (this.state.logged === 1)
      status = <p className="online">Online</p>

    return (
      <React.Fragment>
      <div className="status">{status}</div>
      <div className="loginBox">
        <form onSubmit={this.handleSubmit}>
          <label>
            Email:
            <input placeholder="Ex.: example@email.com" type="email" name="email" onChange={this.changeEmail} />
          </label>
          <label>
            Password:
            <input placeholder="Ex.: 123" type="password" name="password" onChange={this.changePassword} />
          </label>
          <button type="submit">Sign In</button>
        </form>
      </div>
      </React.Fragment>
    )
  }
}


ReactDOM.render(
  <Index>
  </Index>,
  document.getElementById('root')
);