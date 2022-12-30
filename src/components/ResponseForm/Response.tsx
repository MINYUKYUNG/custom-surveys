import { useDispatch } from 'react-redux';
import { ChangeEvent, useState, useRef } from 'react';
import { MdKeyboardArrowDown, MdOutlineErrorOutline } from 'react-icons/md';
import { quesType } from '../../utils';
import { quesConst } from '../../constants';
import { textResp, oneOptionResp, multipleOptionResp } from '../../store/questions';

function Response({
  id,
  type,
  options,
  required,
  textResponse,
}: quesType.QuestionsGuard) {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const trueOneOptionIdx = useRef(0);
  const optionChecked = useRef(false);

  const openClose = (bool: boolean) => setHidden(bool);

  const textRespBtn = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(textResp({ sendId: id, value }));
  };

  const oneOptionRespBtn = (optionIndex: number) => {
    if (!hidden) openClose(true);

    trueOneOptionIdx.current = optionIndex;
    optionChecked.current = true;

    dispatch(oneOptionResp({ sendId: id, optionIndex }));
  };

  const multipleOptionRespBtn = (
    e: ChangeEvent<HTMLInputElement>,
    optionIndex: number,
  ) => {
    const { checked } = e.target;
    dispatch(multipleOptionResp({ sendId: id, optionIndex, checked }));
  };

  const meetRequirements = () => (
    <div className="flex justify-end text-red-600 pt-6">
      <MdOutlineErrorOutline size="1.5em" />
      <span className="inline-block text-sm pl-2 leading-6">필수 질문입니다.</span>
    </div>
  );

  if (quesConst.SHORT_TYPE === type) {
    return (
      <div>
        <input
          type="text"
          placeholder="내 답변"
          className="focus-visible:outline-none border-b-2
          pt-6 pb-1 w-1/2 focus:border-rose-400"
          onChange={textRespBtn}
          value={textResponse || ''}
        />
        {required.condition && required.meet === false ? meetRequirements() : null}
      </div>
    );
  }
  if (quesConst.ESSAY_TYPE === type) {
    return (
      <div>
        <input
          type="text"
          placeholder="내 답변"
          className="focus-visible:outline-none border-b-2 pt-6 pb-1 w-full focus:border-rose-400"
          onChange={textRespBtn}
          value={textResponse || ''}
        />
        {required.condition && required.meet === false ? meetRequirements() : null}
      </div>
    );
  }
  if (quesConst.DROPDOWN_TYPE === type) {
    const dropdown = options.map((option, index) => {
      if (option.optionResponse) {
        trueOneOptionIdx.current = index;
        optionChecked.current = true;
      }

      return (
        <li onClick={() => oneOptionRespBtn(index)} key={index}>
          <button
            type="button"
            className="active:bg-rose-400 hover:bg-rose-400 hover:text-white"
          >
            {option.text}
          </button>
        </li>
      );
    });

    const select = () => {
      const checkReset = !(options[trueOneOptionIdx.current].optionResponse);
      if (optionChecked.current && checkReset) {
        trueOneOptionIdx.current = 0;
        optionChecked.current = false;
        return '선택해주세요';
      }
      if (optionChecked.current) return options[trueOneOptionIdx.current].text;
      return '선택해주세요';
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
            ${hidden ? 'hidden' : ''}`}
          >
            {dropdown}
          </ul>
        </div>
        {required.condition && required.meet === false ? meetRequirements() : null}
      </div>
    );
  }

  const showOptions = options.map((option, index) => {
    const choice = () => (
      <input
        type="radio"
        name={`radio-${id}`}
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
          {type === quesConst.CHOICE_TYPE ? choice() : checkbox()}
          <span className="label-text">{option.text}</span>
        </label>
      </div>
    );
  });

  return (
    <div>
      {showOptions}
      {required.condition && required.meet === false ? meetRequirements() : null}
    </div>
  );
}

export default Response;
