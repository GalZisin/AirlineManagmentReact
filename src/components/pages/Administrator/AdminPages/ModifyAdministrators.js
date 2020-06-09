import React, { Component } from "react";
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ActionsOnAdmin from './ActionsOnAdmin';
import { Container } from 'react-bootstrap';

class ModifyAdmin extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div style={{ marginLeft: 0, marginTop: 100 }} >
                <Container>
                    <ActionsOnAdmin />
                </Container>
            </div>
        );
    }
}
export default ModifyAdmin;