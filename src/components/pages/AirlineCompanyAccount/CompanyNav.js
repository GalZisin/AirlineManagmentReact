import React, { Component } from "react";
import { NavLink } from 'react-router-dom';
import '../../SecondaryMenu.css';
import '../../../components/linkButton.css'
import { history } from '../../../history';
class CompanyNav extends Component {
    handleModifyFlight = (e) => {
        e.preventDefault();
        history.replace('/AirlineAccountPage/ModifyFlights')
    }
    handleModifyCompany = (e) => {
        e.preventDefault();
        history.replace('/AirlineAccountPage/ModifyCompany')
    }
    render() {

        return (

            <div className="secondaryNavBar">
                <nav id="secondaryNavBar" className="navbar py-0 px-0 navbar-expand-xl shadow-sm" >
                    <button type="button" className="navbar-brand link-button" style={{ color: 'black' }}>Welcome!!</button>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#companyLinks"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span>
                            <i className="fas fa-bars" style={{ color: 'rgba(255,207,148,1)' }} />
                        </span>
                    </button>

                    <ul className="navbar-nav m-auto collapse navbar-collapse" id="companyLinks">
                        <li className="nav-link" className="nav-item">
                            <NavLink className="nav-link" exact activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/AirlineAccountPage/ModifyFlights" onClick={this.handleModifyFlight}><span><i className="fas fa-user-edit"></i></span><span> &nbsp;Modify Flights</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="//AirlineAccountPage/ModifyCompany" onClick={this.handleModifyCompany}><span><i className="fas fa-user-edit"></i></span><span> &nbsp;Modify Company</span></NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default CompanyNav;