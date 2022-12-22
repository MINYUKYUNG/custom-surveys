import { createSlice } from '@reduxjs/toolkit';
import { tAndDConst } from '../constants';

const tAndD = createSlice({
  name: 'tAndD',
  initialState: {
    title: tAndDConst.TANDD_DEFAULT_TITLE,
    description: tAndDConst.TANDD_DEFAULT_DESCRIPTION,
  },
  reducers: {
    editTAndD: (state, action) => {
      const { title } = action.payload;
      const { description } = action.payload;

      state.title = title;
      state.description = description;
    },
  },
});

export default tAndD;
export const { editTAndD } = tAndD.actions;
