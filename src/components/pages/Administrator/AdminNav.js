import React, { Component } from "react";
// import { NavLink} from 'react-router-dom';
// import { Navbar, Nav } from 'react-bootstrap'
import { NavLink, withRouter } from 'react-router-dom';
import '../../SecondaryMenu.css'
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../components/linkButton.css'
// import '../../layouts/navbar.css'

class AdminNav extends Component {

    render() {

        return (
            <div className="secondaryNavBar">
                <nav id="secondaryNavBar" className="navbar py-0 px-0 navbar-expand-xl shadow-sm" >
                    <button type="button" className="navbar-brand link-button" style={{ color: 'black' }}>Administrator</button>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#adminLinks"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span>
                            <i className="fas fa-bars" style={{ color: 'rgba(255,207,148,1)' }} />
                        </span>
                    </button>

                    <ul className="navbar-nav m-auto collapse navbar-collapse" id="adminLinks">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/AdministratorPage/Inbox"><span><i className="fa fa-envelope"></i></span><span> &nbsp;Inbox</span></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/AdministratorPage/ModifyAdministrators"><span><i className="fas fa-user-edit"></i></span><span> &nbsp;Modify Administrators</span></NavLink>
                        </li>
                        <li className="nav-link" className="nav-item">
                            <NavLink className="nav-link" exact activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/AdministratorPage/ModifyAirlines"><span><i className="fas fa-user-edit"></i></span><span> &nbsp;Modify Airlines</span></NavLink></li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact activeStyle={{ backgroundColor: 'rgb(206, 77, 17)' }} to="/AdministratorPage/ModifyCustomers"><span><i className="fas fa-user-edit"></i></span><span> &nbsp;Modify Customers</span></NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default withRouter(AdminNav);







{/* <div className="sidebar">
                    <h3 style={{ marginLeft: 20, marginTop: 10 }}>Hello Admin!</h3>
                    <div href="#" className="nav-item">
                        <NavLink className="nav-link" to="/AdministratorPage/Inbox"><span><i className="fa fa-envelope"></i></span><span> &nbsp;Inbox</span></NavLink>
                    </div>
                    <div  href="#" className="nav-item">
                        <NavLink className="nav-link" to="/AdministratorPage/ModifyAdministrators"><span><i className="fas fa-user-edit"></i></span><span> &nbsp;Modify Administrators</span></NavLink>
                    </div>
                    <div  href="#" className="nav-item">
                        <NavLink className="nav-link" to="/AdministratorPage/ModifyAirlines"><span><i className="fas fa-user-edit"></i></span><span> &nbsp;Modify Airlines</span></NavLink>
                    </div>
                    <div  href="#" className="nav-item">
                        <NavLink className="nav-link" to="/AdministratorPage/ModifyCustomers"><span><i className="fas fa-user-edit"></i></span><span> &nbsp;Modify Customers</span></NavLink>
                    </div>
                </div> */}










