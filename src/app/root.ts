import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, baseApiSlice } from "./api";
// import { apiSlice, baseApiSlice } from "./api/apiSlice";
import authReducer from "@features/auth/authSlice";
const store = configureStore({
  reducer: {
    [baseApiSlice.reducerPath]: baseApiSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(baseApiSlice.middleware)
      .concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
