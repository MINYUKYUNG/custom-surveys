import { useDispatch } from 'react-redux';
import { quesType } from '../../utils';
import { editRequired } from '../../store/questions';

function Required({ id, required }: quesType.QuestionsGuard) {
  const dispatch = useDispatch();

  const editRequiredBtn = () => { // 필수 항목 설정 유무
    const sendId = id;
    dispatch(editRequired(sendId));
  };

  return (
    <div className="pl-4 border-l">
      <label className="label cursor-pointer">
        <span className="label-text pr-2">필수</span>
        <input
          type="checkbox"
          className="toggle toggle-sm checked:bg-rose-400 checked:border-rose-400"
          onChange={editRequiredBtn}
          checked={required.condition}
        />
      </label>
    </div>
  );
}

export default Required;
