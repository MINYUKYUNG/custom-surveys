import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UseTitle, UseQuestion } from '../components';
import { pageConst } from '../constants';
import { resetResp } from '../store/questions';

function Submit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const moveToPreview = () => {
    dispatch(resetResp());
    navigate(pageConst.PREVIEW_PAGE_URL);
  };

  return (
    <div className="Submit">
      <div className="pb-2 text-sm">
        제출하신 응답은 다음과 같습니다. 참여해주셔서 감사합니다.
      </div>
      <UseTitle />
      <UseQuestion pageUrl={pageConst.SUBMIT_PAGE_URL}/>
      <button 
        type="button" 
        className="p-2 flex text-rose-400 border-1 rounded-md" 
        onClick={moveToPreview}
      >
        다른 응답 작성하기
      </button>
    </div>
  );
};

export default Submit;
