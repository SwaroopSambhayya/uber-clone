import { configureStore } from '@reduxjs/toolkit'
import navReducer from './slices/navSlice';
export const store = configureStore({
  reducer: {
      nav:navReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
