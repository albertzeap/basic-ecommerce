import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import withContext from "../withContext";
import axios from 'axios';

const initState = {
    username: "",
    password: ""
};


class Signup extends Component {
    constructor(props){
        super(props);
        this.state = initState;
    }

    save = async (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        console.log(`AFTER:${username} + ${password}`);

        if(username && password){
            const id = 3;

            await axios.post(
                'http://localhost:3001/users',
                { username, password, id  },
            )

            this.props.context.addUser(
                {
                    username,
                    password
                },
                () => this.setState(initState)
            );
            this.setState(
                { flash: { status: 'is-success', msg: 'Account created successfully'}}
            ); 
        }
        else {
            this.setState(
                { flash: {status: 'is-danger', msg: 'Please enter username and password'}}
            );
        }
    };

    handleChange = e => this.setState({ [e.target.name]: e.target.value, error: ""});

    render() {
        const { user } = this.props.context;
        const {username, password} = this.state;
        console.log(`BEFORE:${username} + ${password}`);
        
        return (user) ? (
            <Navigate to="/" />
          ) :(
            <>
              <div className="hero is-primary ">
                <div className="hero-body container">
                  <h4 className="title">Create Account</h4>
                </div>
              </div>
              <br />
              <br />
              <form onSubmit={this.save}>
                <div className="columns is-mobile is-centered">
                  <div className="column is-one-third">
                    <div className="field">
                      <label className="label">Email: </label>
                      <input
                        className="input"
                        type="email"
                        name="username"
                        value={username}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="field">
                      <label className="label">Password: </label>
                      <input
                        className="input"
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    {this.state.flash && (
                      <div className={`notification ${this.state.flash.status}`}>
                        {this.state.flash.msg}
                      </div>
                    )}
                    <div className="field is-clearfix">
                      <button
                        className="button is-primary is-outlined is-pulled-right"
                        type="submit"
                        onClick={this.save}
                      >
                        Create Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </>
          );
    }
}

export default withContext(Signup);