import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import './ModalLogin.css'
import { connect } from "react-redux";
import '../../../components/linkButton.css'
import { Alert } from 'reactstrap'
import axios from 'axios';
import Swal from "sweetalert2";
import { BaseUrl } from '../../../constants/BaseUrl'

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: ''
            },
            submitted: false,
            msg: null,
          
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password && user.email) {
            this.register(user.firstName, user.lastName, user.username, user.password, user.email);
        }
    }

    // Register User
    register = (firstName, lastName, username, password, email) => {

        axios.post(BaseUrl.url + `/api/AnonymousFacade/register`, { firstName: firstName, lastName: lastName, username: username, password: password, email: email })
            .then(res => {
                if (res.data === 'Please confirm your email!') {

                    this.props.closemodal();

                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: res.data,
                        text: 'We sent an email confirmation to the address you entered. Please open it and click the link to verify your account.',
                        showConfirmButton: true
                    });
                }
            }

            ).catch(error => {
                console.log("REGISTER ERROR: " + error.message)
            });
    };

    render() {
        const { user, submitted, msg } = this.state;
        return (
            <Fade Top>
                <form name="form" onSubmit={this.handleSubmit}>
                    <h3>Sign Up</h3>
                    {msg ? <Alert color="danger">{msg}</Alert> : null}
                    <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                        {submitted && !user.firstName &&
                            <div className="help-block">First Name is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                        {submitted && !user.lastName &&
                            <div className="help-block">Last Name is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
                        {submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                        {submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !user.email ? ' has-error' : '')}>
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                        {submitted && !user.email &&
                            <div className="help-block">email is required</div>
                        }
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

                    <p className="forgot-password text-right">Already registered<button type="button" className="link-button" onClick={this.props.showSignInBox}><u>&nbsp;sign in?</u></button></p>
                </form>
            </Fade>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});
export default connect(mapStateToProps, null)(SignUp)