// frontend/src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';
import authReducer from './authSlice';
import adminReducer from './adminSlice';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    auth: authReducer,
    admin: adminReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
