import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { youtubeLiteApi } from './services/shazamCore';

export const store = configureStore({
  reducer: {
    [youtubeLiteApi.reducerPath]: youtubeLiteApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(youtubeLiteApi.middleware),
});
