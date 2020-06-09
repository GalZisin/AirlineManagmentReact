import React, { Component } from "react";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ActionsOnCustomer from '../AdminPages/ActionsOnCustomer';
import { Container } from 'react-bootstrap';

class ModifyCustomers extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
                <Container style={{ marginTop: 100 }}>
                    <ActionsOnCustomer />
                </Container>
        );
    }
}
export default ModifyCustomers;








