import questions, {
  addQues,
  deleteQues,
  copyQues,
  editRequired,
  editTitle,
  editType,
} from '../../../store/questions';
import { quesConst } from '../../../constants';
import { quesType, quesFunc } from '../../../utils';

const { reducer } = questions;

it('questions initialState', () => {
  expect(reducer(undefined, { type: undefined })).toEqual([
    quesFunc.defaultQues(quesConst.DEFAULT_ID),
  ]);
});

it('addQues', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.defaultQues(2),
  ];

  const expected = [
    quesFunc.defaultQues(1),
    quesFunc.defaultQues(6),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, addQues({ sendId: 1, newId: 6 })))
    .toMatchObject(expected);
});

it('deleteQues', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.defaultQues(6),
    quesFunc.defaultQues(2),
  ];

  const expected = [
    quesFunc.defaultQues(1),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, deleteQues(6)))
    .toMatchObject(expected);
});

it('copyQues', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '새로운 질문입니다',
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: true },
      ],
      {
        condition: true,
        meet: true,
      },
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  const expected = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '새로운 질문입니다',
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: true },
      ],
      {
        condition: true,
        meet: true,
      },
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.newQues(
      7,
      '새로운 질문입니다',
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: true },
      ],
      {
        condition: true,
        meet: true,
      },
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, copyQues({ sendId: 6, newId: 7 })))
    .toMatchObject(expected);
});

it('editRequired', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '새로운 질문입니다',
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: true },
      ],
      {
        condition: false,
        meet: false,
      },
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  const expected = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '새로운 질문입니다',
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: true },
      ],
      {
        condition: true,
        meet: false,
      },
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, editRequired(6)))
    .toMatchObject(expected);
});

it('editTitle', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '새로운 질문입니다',
      quesConst.CHOICE_TYPE,
      quesConst.DEFAULT_OPTIONS,
      quesConst.DEFAULT_REQUIRED,
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  const expected = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '질문을 바꿔볼까요?',
      quesConst.CHOICE_TYPE,
      quesConst.DEFAULT_OPTIONS,
      quesConst.DEFAULT_REQUIRED,
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, editTitle({ sendId: 6, value: '질문을 바꿔볼까요?' })))
    .toMatchObject(expected);
});

it('editType', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '질문',
      quesConst.CHOICE_TYPE,
      quesConst.DEFAULT_OPTIONS,
      quesConst.DEFAULT_REQUIRED,
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  const expected = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '질문',
      quesConst.DROPDOWN_TYPE,
      quesConst.DEFAULT_OPTIONS,
      quesConst.DEFAULT_REQUIRED,
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, editType({ sendId: 6, newType: quesConst.DROPDOWN_TYPE })))
    .toMatchObject(expected);
});
