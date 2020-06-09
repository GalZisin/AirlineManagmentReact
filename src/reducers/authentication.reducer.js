import { userConstants } from '../constants/user.constants';
// import { history } from '../history';

const initialState= {
  isAuthenticated: null,
  isLoading: false,
  user: null
}

export function authentication(state = initialState, action) {

  console.log("authentication.payname: " + action.payname)
  console.log("authentication.action.type: " + action.type)

  switch (action.type) {
    // case userConstants.USER_LOADING:
    //   return {
    //     ...state,
    //     isLoading: true
    //   };
    case userConstants.USER_LOADED:
      return {
        ...state,
        ...action.payname,
        isAuthenticated: true,
        isLoading: false,
        user: action.payname
      };
      
    case userConstants.LOGIN_SUCCESS:
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state, 
        user: action.payname,
        isAuthenticated: true,
        isLoading: false,
      };
     
    // case userConstants.AUTH_ERROR:
    case userConstants.LOGIN_FAIL:
    case userConstants.LOGOUT_SUCCESS:
    // case userConstants.REGISTER_FAIL:
      localStorage.removeItem('admin');
      localStorage.removeItem('airlineCompany');
      localStorage.removeItem('customer');
 
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };
    default:
      return state;
  }
}





// export function authentication(state = initialState, action) {
//   switch (action.type) {
//     case userConstants.LOGIN_REQUEST:
//       return {
//         ...state,
//         loggingIn: true,
//         user: action.payload
//       };
//     case userConstants.LOGIN_SUCCESS:
//       // console.log("from authentication: " + action.user)
//       return {
//         ...state,
//         loggedIn: true,
//         loggingIn: false,
//         user: action.payload
//       };



//     case userConstants.LOGIN_FAILURE:
//       return {};
//     case userConstants.LOGOUT:
//       return {};
//     default:
//       return state
//   }
// }