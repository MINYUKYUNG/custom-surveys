import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { pageConst } from '../../constants';
import Response from './Response';
import { resetResp } from '../../store/questions';

function ResponseForm({ pageUrl }: { pageUrl: string }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questions = useSelector((state: RootState) => state.questions);

  const previewList = questions.map((item, index) => (
    <div className="bg-white mb-5 p-7 border rounded-xl border-transparent" key={index}>
      <h3>
        {item.title}
        {item.required.condition ? <span className="pl-1 text-red-600">*</span> : null}
      </h3>
      <Response {...item} />
    </div>
  ));

  const moveToSubmit = () => {
    let count = 0;
    questions.forEach((item) => {
      if (item.required.meet < item.required.condition) count += 1;
    });
    if (count) alert(`필수 질문에 대한 답변을 완료해주세요 (${count}개 추가 답변 필요)`);
    else navigate(pageConst.SUBMIT_PAGE_URL);
  };

  const resetRespBtn = () => {
    dispatch(resetResp());
  };

  const submitPage = pageUrl === pageConst.SUBMIT_PAGE_URL;
  const previewBtn = () => (
    <div className="flex justify-between">
      <button
        type="button"
        className="p-2 flex bg-rose-400 text-white border-1 rounded-md"
        onClick={moveToSubmit}
      >
        제출
      </button>
      <button
        type="button"
        className="p-2 flex text-rose-400 border-1 rounded-md"
        onClick={resetRespBtn}
      >
        양식 지우기
      </button>
    </div>
  );

  return (
    <main className={submitPage ? 'pointer-events-none' : ''}>
      {previewList}
      {submitPage ? null : previewBtn()}
    </main>
  );
}

export default ResponseForm;
