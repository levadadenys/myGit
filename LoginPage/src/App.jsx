import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './main.css'

class LoginWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isValid: 'true',
            buttonImgUrl: './img/loginBut.png'
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    };
    
    _handleSubmit(e) {
        e.preventDefault();

        let loginData = {};
        loginData.Username = (this.refs.login.value);
        loginData.Password = (this.refs.password.value);

        this.setState({buttonImgUrl: './img/loginButLoad.png'});

        axios.post('/login', {
            Username: this.refs.login.value,
            Password: this.refs.password.value
        }).then((response) => {
            if(response.Auth === 'Denied') {
                this.setState({
                    isValid: 'Denied',
                    buttonImgUrl: './img/loginBut.png'
                });
            } else if (response.Auth === 'Logged') {
                this.setState({
                    isValid: 'Success'
                });
            }

        }).catch((error) => {
            alert(error);
            this.setState({buttonImgUrl: './img/loginBut.png'});
        });
    };

    render() {
        let error = '';
        if (this.state.isValid === 'Denied') error = 'error';
        else if(this.state.isValid === 'Success') {
            return (<img id = 'success' src='./img/loginSuccessed.png'/>);
        };
        return (
            <form id = 'loginForm' onSubmit={this._handleSubmit}>
                <ul>
                    <li>
                        <img src='./img/logoLogin.png'/>
                    </li>
                    <li>
                        <input id = {`loginInput-${error}`} type = 'text' placeholder = 'Login' ref = 'login'></input>
                    </li>
                    <li>
                        <input id = 'passwordInput' type = 'text' placeholder = 'Password' ref = 'password'></input>
                    </li>
                    <li>
                        <button id = 'loginButton'  ref = 'button'><img ref = 'buttonImg' src = {this.state.buttonImgUrl}/></button>
                    </li>
                </ul>
            </form>
        );
    };
}

class LoginContainer extends React.Component {
    
    render () {
        return (
            <div id = 'LoginContainer'>
                <LoginWindow />
            </div>
        );
    }
}

ReactDOM.render(<LoginContainer />, document.getElementById('loginRoot'));