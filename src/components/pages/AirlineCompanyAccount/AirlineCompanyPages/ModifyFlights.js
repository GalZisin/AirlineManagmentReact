import React, { Component } from "react";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ActionsOnFlight from '../AirlineCompanyPages/ActionOnFlights';
import { Container } from 'react-bootstrap';

class ModifyFlights extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div style={{ marginLeft: 0, marginTop: 100 }} >
                <Container>
                    <ActionsOnFlight />
                </Container>
            </div>
        );
    }
}
export default ModifyFlights;