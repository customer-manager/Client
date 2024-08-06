import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthReducer';
import CustomerReducer from './reducers/CustomerReducer';

const rootReducer = combineReducers({
  auth:authReducer,
  customer:CustomerReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
