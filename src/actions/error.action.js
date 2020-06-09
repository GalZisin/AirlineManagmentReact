import { userConstants } from '../constants/user.constants';

// RETURN ERRORS
export const returnErrors = (msg, status, id) => {
    return {
      type: userConstants.GET_ERRORS,
      payload: { msg, status, id }
    };
  };
  
  // CLEAR ERRORS
  export const clearErrors = () => {
    return {
      type: userConstants.CLEAR_ERRORS
    };
  };
