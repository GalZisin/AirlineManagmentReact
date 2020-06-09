import { userConstants } from '../constants/user.constants';
import { history } from '../history';

// Logout User
export const logout = () => {
  history.push('/');
  return (dispatch) => {
    dispatch({
      type: userConstants.LOGOUT_SUCCESS
    });
  }

};

export const addUserAction = (new_user) => {
  console.log("NEW USER: " + JSON.stringify(new_user))
  return (dispatch) => {
    dispatch({
      type: userConstants.LOGIN_SUCCESS,
      payname: new_user
    })
  }
}