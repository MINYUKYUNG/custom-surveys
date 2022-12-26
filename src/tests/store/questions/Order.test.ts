import questions, {
  changeQuesOrder,
  changeOptionOrder,
} from '../../../store/questions';
import { quesConst } from '../../../constants';
import { quesType, quesFunc } from '../../../utils';

const { reducer } = questions;

it('changeQuesOrder', () => {
  const prevState: quesType.QuestionsGuard[] = [
    quesFunc.defaultQues(1),
    quesFunc.defaultQues(6),
    quesFunc.defaultQues(7),
    quesFunc.defaultQues(2),
  ];

  const expected = [
    quesFunc.defaultQues(1),
    quesFunc.defaultQues(7),
    quesFunc.defaultQues(6),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, changeQuesOrder({ from: 2, to: 1 })))
    .toMatchObject(expected);
});

it('changeOptionOrder', () => {
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
        { id: 4, text: '옵션 4', optionResponse: false },
        { id: 5, text: '옵션 5', optionResponse: true },
      ],
      quesConst.DEFAULT_REQUIRED,
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(7),
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
        { id: 4, text: '옵션 4', optionResponse: false },
        { id: 2, text: '옵션 2', optionResponse: false },
        { id: 3, text: '옵션 3', optionResponse: true },
        { id: 5, text: '옵션 5', optionResponse: true },
      ],
      quesConst.DEFAULT_REQUIRED,
      quesConst.DEFAULT_TEXT_RESPONSE,
    ),
    quesFunc.defaultQues(7),
    quesFunc.defaultQues(2),
  ];

  expect(reducer(prevState, changeOptionOrder({ sendId: 6, from: 3, to: 1 })))
    .toMatchObject(expected);
});
