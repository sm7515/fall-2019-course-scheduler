import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            password: '',
        }
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        })
        console.log(this.state.name)
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
        console.log(this.state.password)
    }

    onSubmit(e) {
        e.preventDefault();
                window.location = '/courses';

    }

    render(){
    return(
        <div className='form-container'>
            <form onSubmit={this.onSubmit} className='registerForm'>
                <div className="form-group">
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.name}
                        onChange={this.onChangename}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='form-label'>Name </label>
                </div>
                <div className="form-group">
                    <input type="password"
                        required
                        className="form-control"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='form-label'>Password </label>
                </div>
                <input type="submit" value="Log in" />
            </form>
        </div>
    )}
}