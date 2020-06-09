import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { history } from '../../../../history';
import { logout } from '../../../../actions/user.actions';
import { bindActionCreators } from 'redux'
import Swal from "sweetalert2";
import '../../TableList.css'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../../../../../node_modules/react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { BaseUrl } from '../../../../constants/BaseUrl'

class CompanyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            company: {},
            response: {},
            companyId: ''
        }
    }

    componentDidMount() {

        let token = localStorage.getItem('airlineCompany');

        const instance = axios.create({
            baseURL: BaseUrl.url + '/api/AirlineCompanyFacade', headers: { 'Authorization': 'Bearer ' + token }
        });

        instance.get('/getAirlineCompany')
            .then(
                (result) => {
                    this.setState({
                        company: result.data
                    });

                    console.log("getAirlineCompany" + JSON.stringify(result.data))
                },
                (error) => {
                    this.setState({ error });
                    if (error.message === 'Request failed with status code 401') {
                        this.props.logout();
                        Swal.fire({
                            icon: 'warning',
                            title: "Oops..",
                            text: "Your token expires, please re-login!",
                        });
                        history.push('/');
                    }
                }
            )
    }


    deleteCompany = (companyId) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {
                let token = localStorage.getItem('airlineCompany');
                this.props.logout();
                axios.delete(BaseUrl.url + '/api/AirlineCompanyFacade/deletecompany/' + companyId, { headers: { 'Authorization': 'Bearer ' + token } })
                    .then(result => {
                        if (result.data === `Airline Company with ID = ${companyId} deleted succsesfully`) {
                            Swal.fire(
                                'Deleted!',
                                result.data,
                                'success'
                            )
                            // this.setState({
                            //     response: result
                            // });
                            history.push('/');
                        }
                        else {
                            Swal.fire({
                                icon: 'warning',
                                title: "Oops..",
                                text: result.data
                            });
                        }
                    });
            }
        })
    }

    render() {
        const { error, company } = this.state;

        if (error) {
            return (
                <div>Error:{error.message}</div>
            )
        }
        else {
            return (


                <Table className='tableWidth tableViews'>
                    <Thead>
                        <Tr>
                            <Th># ID</Th>
                            <Th>Company Name</Th>
                            <Th>User Name</Th>
                            <Th>Password</Th>
                            <Th>Country Code</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{company.ID}</Td>
                            <Td>{company.AIRLINE_NAME}</Td>
                            <Td>{company.USER_NAME}</Td>
                            <Td>{company.PASSWORD}</Td>
                            <Td>{company.COUNTRY_CODE}</Td>
                            <Td><Button variant="info" style={{ borderRadius: 0 }} onClick={() => this.props.editCompany(company.ID)}>Edit</Button>  &nbsp;&nbsp;&nbsp;
                         <Button variant="danger" style={{ borderRadius: 0 }} onClick={() => this.deleteCompany(company.ID)}>Delete</Button></Td>
                        </Tr>
                    </Tbody>
                </Table>



            );
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: bindActionCreators(logout, dispatch),
    }
}
export default connect(null, mapDispatchToProps)(CompanyDetails);

