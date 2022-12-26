import { configureStore } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit';
import tAndD from './tAndD';
import questions from './questions';

const store = configureStore({
  reducer: {
    tAndD: tAndD.reducer,
    questions: questions.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  reducer: {
    tAndD: tAndD.reducer,
    questions: questions.reducer,
  },
  preloadedState,
});
export type AppStore = ReturnType<typeof setupStore>;
export default store;
