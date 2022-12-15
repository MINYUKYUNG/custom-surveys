import { configureStore } from '@reduxjs/toolkit';
import tAndD from './tAndD';
import questions from './questions';

const store = configureStore({
  reducer: {
    tAndD: tAndD.reducer,
    questions: questions.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
