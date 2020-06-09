import React, { Component } from "react";
import Fade from 'react-reveal/Fade';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import './ModalLogin.css'
import { addUserAction } from '../../../actions/user.actions'
import '../../../components/linkButton.css'
import { Alert } from 'reactstrap'
import axios from 'axios';
import { BaseUrl } from '../../../constants/BaseUrl'

class Login extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            submitted: false,
            msg: null,
            addUserAction: addUserAction
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this._isMounted = true;
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });

        const { username, password } = this.state;
        if (username && password) {

            // Attempt to login   
            console.log("From login2: " + username + " " + password)
            this.login(username, password);
        }
    }
    login = (username, password) => {
        this._isMounted = true;
        console.log("From login: " + username + " " + password)
        let obj = {};
        axios.post(BaseUrl.url + `/api/Login/UserLogin`, { username: username, password: password })
            .then(res => {

                obj = JSON.parse(JSON.stringify(res.data));
                console.log("type: " + obj.type)
                console.log("token: " + obj.token)
                console.log("name: " + obj.name)
                //store user details and jwt token in local storage to keep user logged in between page refreshes
                if (obj.type === 'Administrator') {
                    localStorage.setItem('admin', obj.token);
                }
                else if (obj.type === 'AirlineCompany') {
                    localStorage.setItem('airlineCompany', obj.token);
                }
                else if (obj.type === 'Customer') {
                    localStorage.setItem('customer', obj.token);
                }
                console.log("Login: before addUserAction name = " + obj.name)
                this.props.addUserAction(obj.name);
                if (this._isMounted) {
                    this.setState({ msg: null })
                }
                this.props.closemodal();
            }).catch(error => {
                console.log("LOGIN ERROR: " + error.message)
                if (error.message === 'Request failed with status code 401') {
                    if (this._isMounted) {
                        this.setState({ msg: 'Wrong credentials' })
                    }
                }
            })
    }

    render() {
       
        const { username, password, submitted, msg } = this.state;
        return (
            <Fade Top>
                <form onSubmit={this.handleSubmit}>
                    <h3>Sign In</h3>
                    {msg ? <Alert color="danger">{msg}</Alert> : null}
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>

                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    {/* <div>
                        {isLoading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div> */}
                    <p className="forgot-password text-right">Dont have account<button type="button" className="link-button" onClick={this.props.showSignUpBox}><u>&nbsp;sign up?</u></button></p>
                </form>
            </Fade>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addUserAction: bindActionCreators(addUserAction, dispatch),
    }
}
export default connect(null, mapDispatchToProps)(Login);