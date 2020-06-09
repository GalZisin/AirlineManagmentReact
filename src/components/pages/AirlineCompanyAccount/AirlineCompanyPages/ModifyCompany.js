import React, { Component } from "react";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ActionsOnCompany from '../AirlineCompanyPages/ActionsOnCompany';
import { Container } from 'react-bootstrap';

class ModifyCompany extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div style={{ marginLeft: 0, marginTop: 100 }} >
                <Container>
                    <ActionsOnCompany />
                </Container>
            </div>
        );
    }
}
export default ModifyCompany;