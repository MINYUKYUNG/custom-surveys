import { createSlice } from '@reduxjs/toolkit';
import { quesConst } from '../constants';
import { quesFunc, quesType } from '../utils';

const questions = createSlice({
  name: 'questions',
  initialState: [
    quesFunc.defaultQues(quesConst.DEFAULT_ID),
  ] as quesType.QuestionsGuard[],
  reducers: {
    addQues: (state, action) => {
      const { sendId } = action.payload;
      const { newId } = action.payload;

      const newQues = quesFunc.defaultQues(newId);
      if (sendId === 0) {
        state.push(newQues);
        return;
      }

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state.splice(i + 1, 0, newQues);
          return;
        }
      }
    },
    deleteQues: (state, action) => {
      const sendId = action.payload;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state.splice(i, 1);
          return;
        }
      }
    },
    copyQues: (state, action) => {
      const { sendId } = action.payload;
      const { newId } = action.payload;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          const copy = { ...state[i], id: newId };
          state.splice(i + 1, 0, copy);
          return;
        }
      }
    },
    editRequired: (state, action) => {
      const sendId = action.payload;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].required.condition = !state[i].required.condition;
          return;
        }
      }
    },
    editTitle: (state, action) => {
      const { sendId } = action.payload;
      const newTitle = action.payload.value;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].title = newTitle;
          return;
        }
      }
    },
    editType: (state, action) => {
      const { sendId } = action.payload;
      const { newType } = action.payload;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].type = newType;
          return;
        }
      }
    },
    addOption: (state, action) => {
      const { sendId } = action.payload;
      const { newOptionId } = action.payload;

      const newOption = {
        id: newOptionId,
        text: `옵션 ${newOptionId}`,
        optionResponse: false,
      };

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].options.push(newOption);
          return;
        }
      }
    },
    deleteOption: (state, action) => {
      const { sendId } = action.payload;
      const { optionIndex } = action.payload;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].options.splice(optionIndex, 1);
          return;
        }
      }
    },
    editOptionText: (state, action) => {
      const { sendId } = action.payload;
      const { optionIndex } = action.payload;
      const newText = action.payload.value;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].options[optionIndex].text = newText;
          return;
        }
      }
    },
    textResp: (state, action) => {
      const { sendId } = action.payload;
      const newTextResponse = action.payload.value;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].textResponse = newTextResponse;
          if (state[i].required.condition && newTextResponse) state[i].required.meet = true;
          else state[i].required.meet = false;
          return;
        }
      }
    },
    oneOptionResp: (state, action) => {
      const { sendId } = action.payload;
      const { optionIndex } = action.payload;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          for (let j = 0; j < state[i].options.length; j++) {
            if (j === optionIndex) state[i].options[j].optionResponse = true;
            else state[i].options[j].optionResponse = false;
          }
          if (state[i].required.condition) state[i].required.meet = true;
          return;
        }
      }
    },
    multipleOptionResp: (state, action) => {
      const { sendId } = action.payload;
      const { optionIndex } = action.payload;
      const newChecked = action.payload.checked;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].options[optionIndex].optionResponse = newChecked;
          if (state[i].required.condition) {
            let count = 0;
            for (let j = 0; j < state[i].options.length; j++) {
              if (state[i].options[j].optionResponse) count += 1;
            }
            if (count) state[i].required.meet = true;
            else state[i].required.meet = false;
          }
          return;
        }
      }
    },
    resetResp: (state) => {
      state.forEach((item) => {
        item.textResponse = '';
        item.options.forEach((option) => {
          option.optionResponse = false;
        });
        item.required.meet = false;
      });
    },
    changeQuesOrder: (state, action) => {
      const { from } = action.payload;
      const { to } = action.payload;

      const [item] = state.splice(from, 1);
      state.splice(to, 0, item);
    },
    changeOptionOrder: (state, action) => {
      const { sendId } = action.payload;
      const { from } = action.payload;
      const { to } = action.payload;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          const [item] = state[i].options.splice(from, 1);
          state[i].options.splice(to, 0, item);
          return;
        }
      }
    },
  },
});

export default questions;
export const {
  addQues,
  deleteQues,
  copyQues,
  editRequired,
  editTitle,
  editType,
  addOption,
  deleteOption,
  editOptionText,
  textResp,
  oneOptionResp,
  multipleOptionResp,
  resetResp,
  changeQuesOrder,
  changeOptionOrder,
} = questions.actions;
