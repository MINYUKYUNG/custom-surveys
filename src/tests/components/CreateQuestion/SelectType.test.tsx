import { renderWithProviders } from '../../../utils/test-utils';
import SelectType from '../../../components/CreateQuestion/SelectType';
import { quesConst } from '../../../constants';

it('CreateQuestion/index rendering', async () => {
  const item = {
    id: 1,
    title: '질문',
    type: quesConst.CHECKBOX_TYPE,
    options: [
      { id: 1, text: '옵션 1', optionResponse: false },
      { id: 2, text: '옵션 2', optionResponse: true },
      { id: 3, text: '옵션 3', optionResponse: true },
    ],
    required: {
      condition: true,
      meet: true,
    },
    textResponse: '',
  };

  const { getAllByText } = renderWithProviders(<SelectType {...item} />);
  const isCheckboxType = getAllByText(quesConst.CHECKBOX_TEXT);
  expect(isCheckboxType.length).toBe(2);
});
