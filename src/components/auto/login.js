import React, { Component } from 'react';
import axios from 'axios';
import './style/loginStyle.css';
import AuthService from './AuthServise';

class Login extends Component {

    constructor() {
        super()

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }


    handleFormSubmit(e){
        e.preventDefault();

        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                this.props.history.replace('/');
            })
            .catch(err =>{
                alert(err);
            })
    }

    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div className='center'>
                <div className='card'>
                    <h1>Login</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <input autoFocus
                               type="text"
                               placeholder="login"
                               name="username"
                               onChange={this.handleChange}
                               className='form-item'/>
                        <input type="password"
                               placeholder="password"
                               className='form-item'
                               name="password"
                               onChange={this.handleChange}/>
                        <input type="submit"
                               value="SUBMIT"
                               className='form-submit'
                              />
                    </form>
                </div>
            </div>
        );
    }

}

export default Login;

