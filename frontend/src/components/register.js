import React, { Component } from 'react';
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onClickGender = this.onClickGender.bind(this);
        this.onChangeSchool = this.onChangeSchool.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            password:'',
            gender:'',
            school:'',
            year:'',
            email:'',
            dateCreated: new Date()
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

    onClickGender(e) {
        this.setState({
            gender: e.target.value
        })
        console.log(e.target.value)
    }

    onChangeSchool(e) {
        this.setState({
            school: e.target.value
        })
        console.log(this.state.school)
    }

    onChangeYear(e) {
        this.setState({
            year: e.target.value
        })
        console.log(this.state.year)
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
        console.log(this.state.email)
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            gender:this.state.gender,
            year:this.state.year,
            school:this.state.school,
            password:this.state.password,
            email:this.state.email,
            dateCreated:this.state.dateCreated
        }

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))

        this.setState({
            name: '',
            password: '',
            gender: '',
            school: '',
            year: '',
            email: '',
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>

                    <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.name}
                            onChange={this.onChangename}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="email"
                            required
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>

                    <div className="form-group">
                        <label>Gender: </label>
                        <input type="radio"
                            required
                            className="form-control"
                            name="gender"
                            value="male"
                            onClick={this.onClickGender}
                        />
                        <label>Male</label>
                        <input type="radio"
                            className="form-control"
                            value='female'
                            name="gender"
                            onClick={this.onClickGender}
                        />
                        <label>Female</label>
                        <input type="radio"
                            className="form-control"
                            value='other'
                            name="gender"
                            onClick={this.onClickGender}
                        />
                        <label>Other</label>
                    </div>

                    <div className="form-group">
                        <label>Year: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.year}
                            onChange={this.onChangeYear}>
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>School: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.school}
                            onChange={this.onChangeSchool}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Register"/>
                    </div>
                </form>
            </div>
        )
    }
}