import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { logout } from '../../../actions/user.actions';

export const Logout = ({ logout }) => {
  return (
    <Fragment>
      <li className="nav-item">
          <NavLink className="nav-link" to="/" onClick={logout} data-toggle="collapse" data-target=".navbar-collapse.show">Logout</NavLink>
        </li>
    </Fragment>
  );
};
export default connect(null, { logout })(Logout);