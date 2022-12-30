import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import { tAndDConst } from '../../constants';
import { QuestionTitle } from '../../components';

it('title value change', async () => {
  const { getByDisplayValue } = renderWithProviders(<QuestionTitle />);
  const expected = '제목을 바꿀까요?';

  const title = getByDisplayValue(tAndDConst.TANDD_DEFAULT_TITLE);
  fireEvent.change(title, { target: { value: expected } });
  expect(title).toHaveValue(expected);
});

it('description value change', async () => {
  const { getByDisplayValue } = renderWithProviders(<QuestionTitle />);
  const expected = '설명을 바꿀게요!';

  const description = getByDisplayValue(tAndDConst.TANDD_DEFAULT_DESCRIPTION);
  fireEvent.change(description, { target: { value: expected } });
  expect(description).toHaveValue(expected);
});
