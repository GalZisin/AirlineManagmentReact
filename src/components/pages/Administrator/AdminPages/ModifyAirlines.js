import React, {Component} from "react";
import ActionsOnCompanies from "./ActionsOnCompanies";
import { Container } from 'react-bootstrap';

class ModifyAirlines extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
         <div style={{ marginLeft: 0, marginTop: 100 }} >
                <Container>
                    <ActionsOnCompanies />
                </Container>
            </div>
        );
    }
}
export default ModifyAirlines;