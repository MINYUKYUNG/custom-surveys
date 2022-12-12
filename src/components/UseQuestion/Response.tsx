import { useDispatch } from 'react-redux';
import { quesType } from '../../utils';
import { quesConst } from '../../constants';
import { ChangeEvent, useState, useRef } from 'react';
import { MdKeyboardArrowDown, MdOutlineErrorOutline } from 'react-icons/md';
import { textResp, oneOptionResp, multipleOptionResp } from '../../store/questions';

function Response(item: quesType.QuestionsGuard) {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const trueOneOptionIdx = useRef(0);
  const optionChecked = useRef(false);

  const openClose = (bool: boolean) => setHidden(bool);

  const textRespBtn = (e: ChangeEvent<HTMLInputElement>) => { // 단답형, 장문형 응답
    const value = e.target.value;
    dispatch(textResp({ sendId: item.id, value }));
  };

  const oneOptionRespBtn = (optionIndex: number) => { // 객관식 질문, 드롭박스 응답
    if (!hidden) openClose(true);

    trueOneOptionIdx.current = optionIndex;
    optionChecked.current = true;

    dispatch(oneOptionResp({ sendId: item.id, optionIndex }));
  };

  const multipleOptionRespBtn = (e: ChangeEvent<HTMLInputElement>, optionIndex: number) => { // 체크박스 응답
    const checked = e.target.checked;
    dispatch(multipleOptionResp({ sendId: item.id, optionIndex, checked }));
  };

  const meetRequirements = () => { // 필수 항목 응답 유무 확인 (미응답시 submit페이지로 이동불가)
    return (
      <div className="flex justify-end text-red-600 pt-6">
        <MdOutlineErrorOutline size="1.5em" />
        <span className="inline-block text-sm pl-2 leading-6">필수 질문입니다.</span>
      </div>
    );
  };

  if (quesConst.SHORT_TYPE === item.type) {
    return (
      <div>
        <input 
          type="text" 
          placeholder="내 답변" 
          className="focus-visible:outline-none border-b-2 
          pt-6 pb-1 w-1/2 focus:border-rose-400" 
          onChange={textRespBtn} 
          value={item.textResponse || ''} 
        />
        {item.required.condition && item.required.meet === false ? meetRequirements(): null}
      </div>
    );
  } else if (quesConst.ESSAY_TYPE === item.type) {
    return (
      <div>
        <input 
          type="text" 
          placeholder="내 답변" 
          className="focus-visible:outline-none border-b-2  
          pt-6 pb-1 w-full focus:border-rose-400" 
          onChange={textRespBtn} 
          value={item.textResponse || ''} 
        />
        {item.required.condition && item.required.meet === false ? meetRequirements(): null}
      </div>
    );
  } else if (quesConst.DROPDOWN_TYPE === item.type) {
    const dropdown = item.options.map((option, index) => {
      if (option.optionResponse) {
        trueOneOptionIdx.current = index;
        optionChecked.current = true;
      };

      return (
        <li onClick={() => oneOptionRespBtn(index)} key={index}>
          <button className="active:bg-rose-400 hover:bg-rose-400 hover:text-white">
            {option.text}
          </button>
        </li>
      );
    });

    const select = () => {
      const checkReset = !(item.options[trueOneOptionIdx.current].optionResponse);
      if (optionChecked.current && checkReset) {
        trueOneOptionIdx.current = 0;
        optionChecked.current = false;
        return '선택해주세요';
      } else if (optionChecked.current) return item.options[trueOneOptionIdx.current].text;
      else return '선택해주세요';
    };

    return (
      <div className="pt-6">
        <div className="dropdown dropdown-end w-1/3">
          <label 
            tabIndex={0} 
            className="btn btn-outline w-full border-gray-300 
            hover:bg-transparent hover:text-black hover:border-gray-300 
            flex justify-between"
            onClick={() => openClose(false)}
          >
            {select()}
            <MdKeyboardArrowDown size="1.5em" />
          </label>
          <ul 
            tabIndex={0} 
            className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full 
            ${hidden ? 'hidden': ''}`}
          >
            {dropdown}
          </ul>
        </div>
        {item.required.condition && item.required.meet === false ? meetRequirements(): null}
      </div>
    );
  };

  const showOptions = item.options.map((option, index) => {
    const choice = () => (
      <input 
        type="radio" 
        name={`radio-${item.id}`} 
        className="radio mr-4" 
        onChange={() => oneOptionRespBtn(index)} 
        checked={option.optionResponse || false}
      />
    );
    const checkbox = () => (
      <input 
        type="checkbox" 
        className="checkbox mr-4" 
        onChange={(e) => multipleOptionRespBtn(e, index)} 
        checked={option.optionResponse || false}
      />
    );

    return (
      <div className="form-control pt-6" key={index}>
        <label className="label cursor-pointer justify-start px-0">
          {item.type === quesConst.CHOICE_TYPE ? choice(): checkbox()}
          <span className="label-text">{option.text}</span> 
        </label>
      </div>
    );
  });


  return (
    <div>
      {showOptions}
      {item.required.condition && item.required.meet === false ? meetRequirements(): null}
    </div>
  )
};

export default Response;
