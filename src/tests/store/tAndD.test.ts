import tAndD, { editTAndD } from '../../store/tAndD';
import { tAndDConst } from '../../constants';

const { reducer } = tAndD;

it('tAndD initialState', () => {
  expect(reducer(undefined, { type: undefined })).toEqual({
    title: tAndDConst.TANDD_DEFAULT_TITLE,
    description: tAndDConst.TANDD_DEFAULT_DESCRIPTION,
  });
});

it('editTAndD: 타이틀과 설명 수정하기', () => {
  const prevState = {
    title: tAndDConst.TANDD_DEFAULT_TITLE,
    description: tAndDConst.TANDD_DEFAULT_DESCRIPTION,
  };

  const expected = {
    title: '제목을 바꿀까요?',
    description: '설명을 바꿀게요!',
  };

  expect(reducer(prevState, editTAndD({ title: '제목을 바꿀까요?', description: '설명을 바꿀게요!' })))
    .toMatchObject(expected);
});
