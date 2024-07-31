import { ReactElement } from 'react';

export type GuardProps = {
  children: ReactElement | null;
};

export type UserProfile = {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null;
  token?: string | null;
  email?: string | null;
  verified?: boolean | null;
}

export interface AuthActionProps {
  type: string;
  payload?: AuthProps;
}

export interface InitialLoginContextProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
}

export interface JWTDataProps {
  userId: string;
}

export type JWTContextType = {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null | undefined;
  token?: string | null;
  email?: string | null;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<[boolean, string?]>;
  resetPassword: (email: string) => Promise<[boolean, string?]>;
  updateProfile: VoidFunction;
  verifyCode: (code: string) => Promise<[boolean, string?]>;
};
