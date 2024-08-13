import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthReducer';
import CustomerReducer from './reducers/CustomerReducer';
import searchReducer from './reducers/SearchReducer';

const rootReducer = combineReducers({
  auth:authReducer,
  customer:CustomerReducer,
  searchText:searchReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
