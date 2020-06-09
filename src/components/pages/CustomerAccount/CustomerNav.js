import React, { Component } from "react";
import { NavLink, withRouter } from 'react-router-dom';
// import '../CustomerAccount/CustomerNav.css';
import '../../SecondaryMenu.css';
import '../../../components/linkButton.css'
class CustomerNav extends Component {

    render() {

        return (
            <div className="secondaryNavBar">
                <nav id="secondaryNavBar" className="navbar py-0 px-0 navbar-expand-xl shadow-sm" >
                    <button type="button" className="navbar-brand link-button" style={{ color: 'black' }}>Welcome!!</button>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#customerLinks"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span>
                            <i className="fas fa-bars" style={{ color: 'rgba(255,207,148,1)' }} />
                        </span>
                    </button>
                    <ul className="navbar-nav m-auto collapse navbar-collapse" id="customerLinks">
                        <li className="nav-link" className="nav-item">
                            <NavLink className="nav-link" exact activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/CustomerAccountPage/ModifyCustomer"><span><i className="fas fa-user-edit"></i></span><span> &nbsp;Your Details</span></NavLink></li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/CustomerAccountPage/ModifyTicketDetails"><span><i className="fas fa-user-edit"></i></span><span> &nbsp;Ticket Details</span></NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default CustomerNav;       