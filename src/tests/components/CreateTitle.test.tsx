import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import { tAndDConst } from '../../constants';
import { CreateTitle } from '../../components';

it('title value change', async () => {
  const { getByDisplayValue } = renderWithProviders(<CreateTitle />);

  const title = getByDisplayValue(tAndDConst.TANDD_DEFAULT_TITLE);
  fireEvent.change(title, { target: { value: '제목을 바꿀까요?' } });
  expect(title).toHaveValue('제목을 바꿀까요?');
});

it('description value change', async () => {
  const { getByDisplayValue } = renderWithProviders(<CreateTitle />);

  const description = getByDisplayValue(tAndDConst.TANDD_DEFAULT_DESCRIPTION);
  fireEvent.change(description, { target: { value: '설명을 바꿀게요!' } });
  expect(description).toHaveValue('설명을 바꿀게요!');
});
