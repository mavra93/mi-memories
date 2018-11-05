import React, {Component} from 'react'
import {connect} from 'react-redux'
import LoginComponent from './components/Login';
import {login} from '../../redux/actions/userActions'

class LoginScreenContainer extends Component {
    login = (user) => {
        if (user.email.value && user.password.value) {
            this.props.login(user);
        }
    };

    render() {
        return (
            <LoginComponent login={this.login} authErr={this.props.loginErr} onInputClick={this.props.onInputClick} onRegistrationClick={this.props.onRegistrationClick}/>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginErr: state.user.loginErr
    }
};

const mapDispatchToProps = dispatch => {
    return {
        login: user => {
            dispatch(login(user))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenContainer)


