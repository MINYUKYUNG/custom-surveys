import questions, {
  addOption,
  deleteOption,
  editOptionText,
} from '../../../store/questions';
import { quesConst } from '../../../constants';
import { quesType, quesFunc } from '../../../utils';

const { reducer } = questions;

it('addOption', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '질문',
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
      ],
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
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: false },
      ],
      quesConst.DEFAULT_REQUIRED,
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, addOption({ sendId: 6, newOptionId: 2 })))
    .toMatchObject(expected);
});

it('deleteOption', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '질문',
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: false },
        { id: 3, text: '옵션 3', optionResponse: false },
      ],
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
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 3, text: '옵션 3', optionResponse: false },
      ],
      quesConst.DEFAULT_REQUIRED,
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, deleteOption({ sendId: 6, optionIndex: 1 })))
    .toMatchObject(expected);
});

it('editOptionText', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '질문',
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: false },
        { id: 3, text: '옵션 3', optionResponse: false },
      ],
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
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '새로운 옵션', optionResponse: false },
        { id: 3, text: '옵션 3', optionResponse: false },
      ],
      quesConst.DEFAULT_REQUIRED,
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, editOptionText({ sendId: 6, optionIndex: 1, value: '새로운 옵션' })))
    .toMatchObject(expected);
});
