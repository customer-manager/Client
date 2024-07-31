// action - state management
import { REGISTER, LOGIN, LOGOUT, FORGOT_PASSWORD, ISLOGGEDIN } from '../Actions/AuthAction';

// types
import { AuthProps, AuthActionProps } from '../Types/AuthType';

// initial state
export const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ==============================|| AUTH REDUCER ||============================== //

const authReducer = (state = initialState, action: AuthActionProps) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload!;
      return {
        ...state,
        user
      };
    }
    case LOGIN: {
      const { user } = action.payload!;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    }
    case ISLOGGEDIN: {
      const { isLoggedIn } = action.payload!;
      return {
        ...state,
        isLoggedIn
      };
    }
    case LOGOUT: {
      // Socket yapısı gelince revize edilebilir.
      localStorage.removeItem('serviceToken');
      localStorage.removeItem('refreshToken');
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        user: null
      };
    }
    case FORGOT_PASSWORD: {
      const { email, token } = action.payload!;
      return {
        ...state,
        isInitialized: true,
        isLoggedIn: false,
        email,
        token: token
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default authReducer;
