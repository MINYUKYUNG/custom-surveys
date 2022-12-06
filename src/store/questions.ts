import { createSlice } from '@reduxjs/toolkit';
import { quesConst } from '../constants';
import { quesFunc, quesType } from '../utils';

const questions = createSlice({
  name: 'questions',
  initialState: [ 
    quesFunc.defaultQues(quesConst.DEFAULT_ID) 
  ] as quesType.QuestionsGuard[],
  reducers: {    
    // addQues (질문 추가)
  	addQues: (state, action) => {
      const sendId = action.payload.sendId;
      const newId = action.payload.newId;

      const newQues = quesFunc.defaultQues(newId);
      if (sendId === 0) {
        state.push(newQues);
        return;
      };
      
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state.splice(i + 1, 0, newQues);
          return;
        };
      };
    },
    // deleteQues (질문 삭제)
    deleteQues: (state, action) => {
      const sendId = action.payload;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state.splice(i, 1);
          return;
        };
      };
    },
    // copyQues (질문 복사)
    copyQues: (state, action) => {
      const sendId = action.payload.sendId;
      const newId = action.payload.newId;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          const copy = { ...state[i], id: newId };
          state.splice(i + 1, 0, copy);
          return;
        };
      };
    },
    // editRequired (필수 항목 설정 유무)
    editRequired: (state, action) => {
      const sendId = action.payload;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].required.condition = !state[i].required.condition;
          return;
        };
      };
    },
    // editTitle (질문 제목 편집)
    editTitle: (state, action) => {
      const sendId = action.payload.sendId;
      const newTitle = action.payload.value;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].title = newTitle;
          return;
        };
      };
    },
    // editType (질문 타입 편집)
    editType: (state, action) => {
      const sendId = action.payload.sendId;
      const newType = action.payload.newType;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].type = newType;
          return;
        };
      };
    },
    // addOption (객관식 질문, 체크박스, 드롭박스 옵션 추가)
    addOption: (state, action) => {
      const sendId = action.payload.sendId;
      const newOptionId = action.payload.newOptionId;

      const newOption = { 
        id: newOptionId, 
        text: `옵션 ${newOptionId}`, 
        optionResponse: false
      };

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].options.push(newOption);
          return;
        };
      };
    },
    // deleteOption (객관식 질문, 체크박스, 드롭박스 옵션 삭제)
    deleteOption: (state, action) => {
      const sendId = action.payload.sendId;
      const optionIndex = action.payload.optionIndex;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].options.splice(optionIndex, 1);
          return;
        };
      };
    },
    // editOptionText (객관식 질문, 체크박스, 드롭박스 옵션 텍스트 편집)
    editOptionText: (state, action) => {
      const sendId = action.payload.sendId;
      const optionIndex = action.payload.optionIndex;
      const newText = action.payload.value;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].options[optionIndex].text = newText;
          return;
        };
      };
    },
    // textResponse (단답형, 장문형 응답)
    textResp: (state, action) => {
      const sendId = action.payload.sendId;
      const newTextResponse = action.payload.value;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].textResponse = newTextResponse;
          if (state[i].required.condition && newTextResponse) state[i].required.meet = true;
          else state[i].required.meet = false;
          return;
        };
      };
    },
    // optionResponse (객관식 질문, 드롭박스 응답)
    oneOptionResp: (state, action) => {
      const sendId = action.payload.sendId;
      const optionIndex = action.payload.optionIndex;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          for (let j = 0; j < state[i].options.length; j++) {
            if (j === optionIndex) state[i].options[j].optionResponse = true;
            else state[i].options[j].optionResponse = false;
          };
          if (state[i].required.condition) state[i].required.meet = true;
          return;
        };
      };
    },
    // optionResponse (체크박스 응답)
    multipleOptionResp: (state, action) => {
      const sendId = action.payload.sendId;
      const optionIndex = action.payload.optionIndex;
      const newChecked = action.payload.checked;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          state[i].options[optionIndex].optionResponse = newChecked;
          if (state[i].required.condition) {
            let count = 0;
            for (let j = 0; j < state[i].options.length; j++) {
              if (state[i].options[j].optionResponse) count = count + 1;
            };
            if (count) state[i].required.meet = true;
            else state[i].required.meet = false;
          };
          return;
        };
      };
    },
    // resetResp (양식 지우기)
    resetResp: (state) => {
      state.forEach((item) => {
        item.textResponse = '';
        item.options.forEach((option)=> {
          option.optionResponse = false;
        });
        item.required.meet = false;
      });
    },
    // changeQuesOrder (질문 순서 변경 = 드래그 앤 드롭)
    changeQuesOrder: (state, action) => {
      const from = action.payload.from;
      const to = action.payload.to;

      const [item] = state.splice(from, 1);
      state.splice(to, 0, item);
    },
    // changeOptionOrder (질문의 옵션 순서 변경 = 드래그 앤 드롭)
    changeOptionOrder: (state, action) => {
      const sendId = action.payload.sendId;
      const from = action.payload.from;
      const to = action.payload.to;

      for (let i = 0; i < state.length; i++) {
        if (state[i].id === sendId) {
          const [item] = state[i].options.splice(from, 1);
          state[i].options.splice(to, 0, item);
          return;
        };
      };
    }
  }
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
  changeOptionOrder
} = questions.actions;
