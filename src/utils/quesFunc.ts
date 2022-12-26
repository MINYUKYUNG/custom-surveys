import { QuestionsGuard } from './quesType.d';
import { quesConst } from '../constants';

export const defaultQues = (newId: number): QuestionsGuard => ({
  id: newId,
  title: '질문',
  type: quesConst.CHOICE_TYPE,
  options: quesConst.DEFAULT_OPTIONS,
  required: quesConst.DEFAULT_REQUIRED,
  textResponse: quesConst.DEFAULT_TEXT_RESPONSE,
});

export const newQues = (
  id: number,
  title: string,
  type: string,
  options: {
    id: number,
    text: string,
    optionResponse: boolean
  }[],
  required: {
    condition: boolean,
    meet: boolean
  },
  textResponse: string,
): QuestionsGuard => ({
  id,
  title,
  type,
  options,
  required,
  textResponse,
});
