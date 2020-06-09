import React, { Component } from "react";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ActionsOnCustomer from '../customerPages/ActionOnCustomer';
import { Container } from 'react-bootstrap';

class ModifyCustomer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div style={{ marginLeft: 0, marginTop: 100 }} >
                <Container>
                    <ActionsOnCustomer />
                </Container>
            </div>
        );
    }
}
export default ModifyCustomer;