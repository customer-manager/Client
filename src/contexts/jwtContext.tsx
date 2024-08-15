import { createContext, useEffect, useReducer, ReactElement } from 'react';

import { Chance } from 'chance';
import {jwtDecode} from "jwt-decode";

import { FORGOT_PASSWORD, LOGIN, LOGOUT } from '../store/Actions/AuthAction';
import authReducer from '../store/reducers/AuthReducer';

import axios from '../utils/axios';
import { BASE_URL } from '../utils/axios';
import { KeyedObject } from "../store/Types/Root";
import { AuthProps, JWTContextType } from '../store/Types/AuthType';
import Loading from '../pages/loading';
// import Loading from '../Loading/Loading';

const chance = new Chance();

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

/**
 * JWT token'ının geçerliliğini doğrulamak için fonksiyon
 * @param serviceToken - Doğrulanacak JWT token'ı
 * @returns Token'ın geçerli olup olmadığını belirten boolean değer
 */
const verifyToken = (serviceToken: string): boolean => {
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);
  // Token'ın son kullanma süresinin şu anki zamanı geçip geçmediğini kontrol ediyoruz.
  return decoded.exp > Date.now() / 1000;
};

/**
 * Tokenı yerel depolamadan alıp axios'un Authorization header'ına ekleyen veya kaldıran fonksiyon
 * @param serviceToken - Saklanacak veya kaldırılacak JWT token
 */
const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    // JWT token'ını yerel depolamaya ayarlar
    localStorage.setItem('serviceToken', serviceToken);
    // Gelecekteki istekler için Axios header'ını JWT token'ı ile ayarlar
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    // JWT token'ını yerel depolamadan kaldırır
    localStorage.removeItem('serviceToken');
    // Gelecekteki istekler için Axios header'ından JWT token'ını kaldırır
    delete axios.defaults.headers.common.Authorization;
  }
};

// JWT kimlik doğrulama için bir context oluşturur
const JWTContext = createContext<JWTContextType | null>(null);

/**
 * JWT kimlik doğrulama context'i için provider
 * @param children - Provider tarafından sarılacak alt bileşenler
 * @returns children'ı context ile saran JSX öğesi
 */
export const JWTProvider = ({ children }: { children: ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
    console.log('inside jwt')
  // Token yenileme timer'ını tutmak için bir değişken
  let refreshTimer: NodeJS.Timeout;

  const startRefreshTimer = (token: string) => {
    const decodedToken = jwtDecode<KeyedObject>(token);
    console.log("token",decodedToken);
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = (decodedToken.exp - currentTime) * 2500; // milliseconds

    // Süre dolduğunda refresh işlemini başlat
    refreshTimer = setTimeout(async () => {
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, { refreshToken });
          const { accessToken } = response.data;
          if (accessToken) {
            localStorage.setItem('serviceToken', accessToken);
            setSession(accessToken);
            dispatch({ type: LOGIN, payload: { isLoggedIn: true } });
            startRefreshTimer(accessToken); // Yeni token için timer başlat
          } else {
            alert('Oturumunuzun süresi dolmuştur. Lütfen tekrar giriş yapın.');
            dispatch({ type: LOGOUT });
          }
        } catch (err) {
          alert('Yeniden oturum açılamadı. Lütfen tekrar giriş yapın.');
          dispatch({ type: LOGOUT });
        }
      } else {
        alert('Oturumunuzun süresi dolmuştur. Lütfen tekrar giriş yapın.');
        dispatch({ type: LOGOUT });
      }
    }, timeUntilExpiry);
  };

  // Kimlik doğrulamasını başlatır.
  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = localStorage.getItem('serviceToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get(`${BASE_URL}/api/v1/auth/me`);
          const user = response.data;
          localStorage.setItem('userId', user.id);
          dispatch({ type: LOGIN, payload: { isLoggedIn: true, user } });
          startRefreshTimer(serviceToken);
        } else if (refreshToken) {
          try {
            const response = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, { refreshToken });
            const { accessToken } = response.data;
            if (accessToken) {
              localStorage.setItem('serviceToken', accessToken);
              setSession(accessToken);
              const decodedToken = jwtDecode<KeyedObject>(accessToken);
              localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
              dispatch({ type: LOGIN, payload: { isLoggedIn: true } });
              startRefreshTimer(accessToken); // Yeni token için timer başlat
            } else {
              dispatch({ type: LOGOUT });
            }
          } catch (err) {
            alert('Yeniden oturum açılamadı. Lütfen tekrar giriş yapın.');
            dispatch({ type: LOGOUT });
          }
        } else {
          dispatch({ type: LOGOUT });
        }
      } catch (err) {
        dispatch({ type: LOGOUT });
      }
    };

    init();

    // Cleanup timer on component unmount
    return () => clearTimeout(refreshTimer);
  }, [dispatch, state.isLoggedIn]);

  const login = async (username: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, { username, password });
    console.log(response.data);
    const { accessToken, refreshToken } = response.data;
    console.log(accessToken, refreshToken);
    localStorage.setItem('refreshToken', refreshToken);
    if (accessToken) {
      console.log("accessToken exists");
      setSession(accessToken);
      dispatch({ type: LOGIN, payload: { isLoggedIn: true } });
      startRefreshTimer(accessToken);
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
    clearTimeout(refreshTimer);
  };

  const verifyCode = async (code: string): Promise<[boolean, string?]> => {
    try {
      const username = state.username;
      if (!username) {
        return [false, 'Hata Oluştu'];
      }
      const response = await axios.post(`${BASE_URL}/api/v1/auth/confirm-reset-password-code`, { username, code });
      const { token } = response.data;
      if (token) {
        dispatch({ type: FORGOT_PASSWORD, payload: { isLoggedIn: false, username, token, verified: true } });
        return [true];
      } else {
        return [false];
      }
    } catch (error: any) {
      return [false, error.error.message];
    }
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loading></Loading>;
  }

  return (
    <JWTContext.Provider value={{ ...state, login, logout, updateProfile, verifyCode }}>
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
