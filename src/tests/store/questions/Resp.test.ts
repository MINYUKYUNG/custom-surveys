import questions, {
  textResp,
  oneOptionResp,
  multipleOptionResp,
  resetResp,
} from '../../../store/questions';
import { quesConst } from '../../../constants';
import { quesType, quesFunc } from '../../../utils';

const { reducer } = questions;

it('textResp', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '질문',
      quesConst.SHORT_TYPE,
      quesConst.DEFAULT_OPTIONS,
      {
        condition: true,
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
      '질문',
      quesConst.SHORT_TYPE,
      quesConst.DEFAULT_OPTIONS,
      {
        condition: true,
        meet: true,
      },
      '저의 답변입니다',
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, textResp({ sendId: 6, value: '저의 답변입니다' })))
    .toMatchObject(expected);
});

it('oneOptionResp', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '질문',
      quesConst.CHOICE_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: false },
        { id: 3, text: '옵션 3', optionResponse: false },
      ],
      {
        condition: true,
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
      '질문',
      quesConst.CHOICE_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: false },
        { id: 2, text: '옵션 2', optionResponse: true },
        { id: 3, text: '옵션 3', optionResponse: false },
      ],
      {
        condition: true,
        meet: true,
      },
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, oneOptionResp({ sendId: 6, optionIndex: 1 })))
    .toMatchObject(expected);
});

it('multipleOptionResp', () => {
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
      {
        condition: true,
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
      '질문',
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: true },
        { id: 3, text: '옵션 3', optionResponse: false },
      ],
      {
        condition: true,
        meet: true,
      },
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, multipleOptionResp({ sendId: 6, optionIndex: 1, checked: true })))
    .toMatchObject(expected);
});

it('resetResp', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.newQues(
      6,
      '질문',
      quesConst.CHECKBOX_TYPE,
      [
        { id: 1, text: '옵션 1', optionResponse: true },
        { id: 2, text: '옵션 2', optionResponse: false },
        { id: 3, text: '옵션 3', optionResponse: true },
      ],
      {
        condition: true,
        meet: true,
      },
      '단답형 답변이 들어있어요',
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
        { id: 1, text: '옵션 1', optionResponse: false },
        { id: 2, text: '옵션 2', optionResponse: false },
        { id: 3, text: '옵션 3', optionResponse: false },
      ],
      {
        condition: true,
        meet: false,
      },
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, resetResp()))
    .toMatchObject(expected);
});
