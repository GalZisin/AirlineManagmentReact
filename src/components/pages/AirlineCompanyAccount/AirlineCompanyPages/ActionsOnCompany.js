import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import CompanyDetails from './CompanyDetails'
import EditCompany from './EditCompany';
import axios from 'axios';
import { logout } from '../../../../actions/user.actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { history } from '../../../../history';
import Swal from "sweetalert2";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../SecondaryMenu.css'
import { BaseUrl } from '../../../../constants/BaseUrl'

class ActionsOnCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            response: {},
            companyData: {},
            isEditCompany: false
        }
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(data) {

        let token = localStorage.getItem('airlineCompany');
        axios.put(BaseUrl.url + '/api/AirlineCompanyFacade/updateairlinecompany', data, { headers: { 'Authorization': 'Bearer ' + token } })
            .then(result => {
                let cdata = JSON.parse(result.config.data)
                if (cdata.ID === data.ID) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `Airline Company with ID = ${cdata.ID} updated succsesfully`,
                        showConfirmButton: true
                    });
                }
                else {
                    Swal.fire({
                        icon: 'warning',
                        title: "Oops..",
                        text: result.data
                    });
                }
                console.log("str token: " + result.data)

                localStorage.setItem('airlineCompany', result.data)
                this.setState({
                    response: result,
                    isEditCompany: false
                })

            });
    }

    editCompany = companyId => {

        let token = localStorage.getItem('airlineCompany');
        axios.get(BaseUrl.url + '/api/AirlineCompanyFacade/getAirlineCompanyByAirlineId/' + companyId, { headers: { 'Authorization': 'Bearer ' + token } })
            .then((result) => {
                this.setState({
                    isEditCompany: true,
                    companyData: result.data
                });
            },
                (error) => {
                    this.setState({ error });
                    if (error.message === 'Request failed with status code 401') {
                        this.props.logout();
                        Swal.fire({
                            icon: 'warning',
                            title: "Oops..",
                            type: "error",
                            text: "Your token expires, please re-login!",
                        });
                        history.push('/');
                    }
                }
            )
    }

    onDetails(view) {
        if (view === 'ListView')
            this.setState({ isEditCompany: false });
    }

    render() {
        console.log("isEditCompany: " + this.state.isEditCompany)
        let companyForm;
        if (this.state.isEditCompany) {

            companyForm = <EditCompany onFormSubmit={this.onFormSubmit} company={this.state.companyData} ListView={this.onDetails.bind(this, 'ListView')} />

        }


        return (
            <div className="content1">
                <Container>
                    <h1 style={{ textAlign: 'center'}}>Your Company Details</h1>
                    <hr></hr>

                    <br></br>
                    {!this.state.isEditCompany && <CompanyDetails editCompany={this.editCompany} />}
                    {companyForm}
                </Container>
            </div>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
    }
}
export default connect(null, mapDispatchToProps)(ActionsOnCompany);
