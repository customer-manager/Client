import { ReactElement } from 'react';

export type GuardProps = {
  children: ReactElement | null;
};

export type UserProfile = {
  id?: string;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};

export interface AuthProps {
  isLoggedIn: boolean;
  isInitialized?: boolean;
  user?: UserProfile | null;
  token?: string | null;
  username?: string | null;
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
  username?: string | null;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  updateProfile: VoidFunction;
  verifyCode: (code: string) => Promise<[boolean, string?]>;
};
