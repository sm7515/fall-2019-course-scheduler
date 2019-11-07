import React, { Component} from 'react';
import axios from 'axios';
import '../App.css'

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeSchool = this.onChangeSchool.bind(this);
        this.onClickYear = this.onClickYear.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            password:'',
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

    onChangeSchool(e) {
        this.setState({
            school: e.target.value
        })
        console.log(this.state.school)
    }

    onClickYear(e) {
        this.setState({
            year: e.target.value
        })
        console.log(e.target.value)
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
            year:this.state.year,
            school:this.state.school,
            password:this.state.password,
            email:this.state.email,
            dateCreated:this.state.dateCreated
        }

        console.log(user);

        axios.post('http://localhost:5000/register', user)
            .then(res => {
              console.log(res);
                if (res.data.length != 0){
                    this.setState({
                        name: '',
                        password: '',
                        school: '',
                        year: '',
                        email: '',
                    })
                    alert(res.data);
                }
                else{
                    window.location = '/courses';
                }
            })
            .catch(err => console.log(err))

    }

    render() {
        return (
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
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='form-label'>Email </label>
                </div>
    
                    <div className="radio-group">
                        <div className="form-radio-group">
                            <div className="form-radio">
                                <label className="form-radio-label">
                                    <input type="radio"
                                        required
                                        name="year"
                                        value="male"
                                        className='form-radio-field'
                                        onClick={this.onClickGender}
                                    />
                                    <i className="form-radio-button"></i>
                                    <span>Freshman</span>
                                </label>
                            </div>
                            <div className="form-radio">
                                <label className="form-radio-label">
                                    <input type="radio"
                                        value='female'
                                        name="year"
                                        className='form-radio-field'
                                        onClick={this.onClickGender}
                                    />
                                    <i className="form-radio-button"></i>
                                    <span>Sophomore</span>
                                </label>
                            </div>
                            <div className="form-radio">
                                <label className="form-radio-label">
                                    <input type="radio"
                                        value='other'
                                        name="year"
                                        className='form-radio-field'
                                        onClick={this.onClickGender}
                                    />
                                    <i className="form-radio-button"></i>
                                    <span>Junior</span>
                                </label>
                            </div>
                            <div className="form-radio">
                                <label className="form-radio-label">
                                    <input type="radio"
                                        value='other'
                                        name="year"
                                        className='form-radio-field'
                                        onClick={this.onClickGender}
                                    />
                                    <i className="form-radio-button"></i>
                                    <span>Senior</span>
                                </label>
                            </div>
                        </div>
                    </div>

                <div className="form-group">
                    <input type="text"
                        required
                        className="form-control"
                        value={this.state.school}
                        onChange={this.onChangeSchool}
                    />
                        <span className="highlight"></span>
                        <span className="bar"></span>
                    <label className='form-label'>School </label>
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
                    <p className='form-hint'>Your password must contain 6 characters minimum </p>
                </div>

                <div className='reg-log'>
                    <input type="submit" value="Register"/>
                    <a href='/login'>login</a>
                </div>
            </form>
        </div>
        )
    }
}
