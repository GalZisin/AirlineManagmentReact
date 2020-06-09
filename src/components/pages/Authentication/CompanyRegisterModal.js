import React from 'react';
import Modal from 'react-bootstrap/Modal'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Fade from 'react-reveal/Fade';
import { Alert } from 'reactstrap'
import axios from 'axios';
import Swal from "sweetalert2";
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import { BaseUrl } from '../../../constants/BaseUrl'

class CompanyRegisterModal extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.initialState = {
            user: {
                companyName: '',
                username: '',
                password: '',
                email: '',
                country: ''
            },
            countries: [],
            submitted: false,
            msg: null,
            defaultCountry: null
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.getAllcountries();
    }
    getAllcountries() {
        axios.get(BaseUrl.url + '/api/AnonymousFacade/allCountries/')
            .then((result) => {
                this.setState({
                    countries: result.data
                });
            },
                (error) => {
                    this.setState({ error });
                }
            )
    }
    Country() {
        return (this.state.countries.map(data => ({ label: data.COUNTRY_NAME, value: data.ID })))
    }

    onChangeCountry = (selectedCountry) => {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                country: selectedCountry.label
            }
        })
    };
    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.companyName && user.username && user.password && user.email && user.country) {
            this.register(user.companyName, user.username, user.password, user.email, user.country);
        }
    }
    resetForm = () => {
        this.setState({ ...this.initialState })
        console.log("initialState" + JSON.stringify(this.state))
        this.props.onclosemodal();
        this.getAllcountries();
    }

    // Register User
    register = (companyName, username, password, email, country) => {
        console.log("data of company: " + companyName)
        axios.post(BaseUrl.url + `/api/AnonymousFacade/companyregister`, { companyName: companyName, username: username, password: password, email: email, country: country })
            .then(res => {
                if (res.data === 'Your request has been successfully sent') {

                    this.props.onclosemodal();

                    this.resetForm();

                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: res.data,
                        text: 'Your details have been sent to the administrator and are awaiting approval, in addition we will send an email to the address you entered with a reply if your details confirmed.',
                        showConfirmButton: true
                    });
                }
            }

            ).catch(error => {
                console.log("REGISTER ERROR: " + error.message)
            });
    };
    render() {
        const { user, msg, submitted } = this.state
        const { closeModal, onclosemodal, ...rest } = this.props
        return (
            <Modal
                {...rest}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                className="myModal"
            >
                <Modal.Body>
                    <Fade Top>
                        <form name="form" onReset={this.resetForm} onSubmit={this.handleSubmit}>
                            <Button type="button" variant="danger" style={{ float: 'right', borderRadius: '50%' }} onClick={this.resetForm}>X</Button>
                            <h3>Sign Up</h3>
                            {msg ? <Alert color="danger">{msg}</Alert> : null}
                            <div className={'form-group' + (submitted && !user.companyName ? ' has-error' : '')}>
                                <label htmlFor="firstName">Company name</label>
                                <input type="text" className="form-control" name="companyName" value={user.companyName} onChange={this.handleChange} />
                                {submitted && !user.companyName &&
                                    <div className="help-block">Company name is required</div>
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

                            <div className={'form-group' + (submitted && !user.country ? ' has-error' : '')}>

                                <label htmlFor="country">Country</label>
                                <Select options={this.Country()}
                                    type="text"
                                    onChange={this.onChangeCountry}
                                    placeholder="Country Name"
                                    defaultValue={this.state.defaultCountry}
                                />
                                {submitted && !user.country &&
                                    <div className="help-block">country name is required</div>
                                }
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Sign Up</button>

                        </form>
                    </Fade>
                </Modal.Body>
            </Modal>
        );
    }
}
export default CompanyRegisterModal;