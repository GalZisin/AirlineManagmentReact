import React from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import { history } from '../../../../history';
import { logout } from '../../../../actions/user.actions';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import '../../../../../node_modules/react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { bindActionCreators } from 'redux'
import Swal from "sweetalert2";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../TableList.css'
import { BaseUrl } from '../../../../constants/BaseUrl'

class CustomerDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            customer: {},
            response: {},
            customerId: ''
        }
    }
    componentDidMount() {
        let token = localStorage.getItem('customer');
        const instance = axios.create({
            baseURL: BaseUrl.url + '/api/CustomerFacade', headers: { 'Authorization': 'Bearer ' + token }
        });

        instance.get('/getCustomer')
            .then(
                (result) => {
                    this.setState({
                        customer: result.data
                    });

                    console.log("getCustomer" + JSON.stringify(result.data))
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


    // const deleteFile = async () => {
    //     // Wait for the user to press a button...
    //     const shouldDelete = await swal("Delete file?", "Are you sure that you want to delete this file?", "warning");

    //     if (shouldDelete) {
    //         // Code to actually delete file goes here
    //         swal("Poof!", "Your file has been deleted!", "success");
    //     }
    // }


    deleteCustomer = async (customerId) => {

        const shouldDelete = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'

        })
        if (shouldDelete) {
            let token = localStorage.getItem('customer');
            this.props.logout();

            axios.delete(BaseUrl.url + '/api/CustomerFacade/deletecustomer/' + customerId, { headers: { 'Authorization': 'Bearer ' + token } })
                .then(result => {
                    console.log("deleteCustomer: " + JSON.stringify(result))

                    if (result.data === `Customer with ID = ${customerId} deleted succsesfully`) {
                        Swal.fire(
                            'Deleted!',
                            result.data,
                            'success'
                        )
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

    }

    render() {
        const { error, customer } = this.state;

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
                            <Th>First Name</Th>
                            <Th>Last Name</Th>
                            <Th>User Name</Th>
                            <Th>Password</Th>
                            <Th>PhoneNo</Th>
                            <Th>Address</Th>
                            <Th>Credit Card Number</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>{customer.ID}</Td>
                            <Td>{customer.FIRST_NAME}</Td>
                            <Td>{customer.LAST_NAME}</Td>
                            <Td>{customer.USER_NAME}</Td>
                            <Td>{customer.PASSWORD}</Td>
                            <Td>{customer.PHONE_NO}</Td>
                            <Td>{customer.ADDRESS}</Td>
                            <Td>{customer.CREDIT_CARD_NUMBER}</Td>
                            <Td><Button variant="info" style={{ borderRadius: 0 }} onClick={() => this.props.editCustomer(customer.ID)}>Edit</Button>  &nbsp;&nbsp;&nbsp;
                         <Button variant="danger" style={{ borderRadius: 0 }} onClick={() => this.deleteCustomer(customer.ID)}>Delete</Button></Td>
                        </Tr>
                    </Tbody>
                </Table>
            );
        }
    }
}

function mapDispatchToProps(dispatch) {
    console.log("mapDispatchToProps CompanyDetails")
    return {
        logout: bindActionCreators(logout, dispatch),
    }
}
export default connect(null, mapDispatchToProps)(CustomerDetails);