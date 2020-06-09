import React, { Component } from "react";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ActionsOnTicket from './ActionOnTicket';
import { Container } from 'react-bootstrap';

class ModifyCustomer extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div style={{ marginLeft: 0, marginTop: 100 }} >
                <Container>
                    <ActionsOnTicket />
                </Container>
            </div>
        );
    }
}
export default ModifyCustomer;