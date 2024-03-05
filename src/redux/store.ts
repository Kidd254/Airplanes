// store.ts
import { configureStore } from '@reduxjs/toolkit';
import aircraftsReducer from './aircrafts/aircraftsSlice';

const store = configureStore({
  reducer: {
    aircrafts: aircraftsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
