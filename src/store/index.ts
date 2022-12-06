import { configureStore } from '@reduxjs/toolkit';
import tAndD from './tAndD';
import questions from './questions';

export type RootState = ReturnType<typeof store.getState>;

const store =  configureStore({
  reducer: {
    tAndD: tAndD.reducer,
    questions: questions.reducer
  }
});

export default store;
