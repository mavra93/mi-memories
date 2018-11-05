import React, {Component} from 'react'
import {connect} from 'react-redux'
import RegisterComponent from './components/Register';
import {signUp} from '../../redux/actions/userActions'

class RegisterScreenContainer extends Component {

    signUpUser = (user) => {
        if (user.email && user.password) {
            this.props.signUp(user);
        }
    };

    render() {
        return (
            <RegisterComponent signUpUser={this.signUpUser} onLoginClick={this.props.onLoginClick} regErr={this.props.regErr} />
        )
    }
}

const mapStateToProps = state => {
    return {
        regErr: state.user.regErr
    }
};

const mapDispatchToProps = dispatch => {
    return {
        signUp: user => {
            dispatch(signUp(user))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreenContainer)


