import { QuestionsGuard } from './quesType.d';
import { quesConst } from '../constants';

export const defaultQues = (newId: number): QuestionsGuard => ({
  id: newId,
  title: quesConst.DEFAULT_TITLE,
  type: quesConst.CHOICE_TYPE,
  options: quesConst.DEFAULT_OPTIONS,
  required: quesConst.DEFAULT_REQUIRED,
  textResponse: quesConst.DEFAULT_TEXT_RESPONSE,
});
