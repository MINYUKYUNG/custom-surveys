import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  MdKeyboardArrowDown,
  MdShortText,
  MdOutlineFormatAlignLeft,
  MdRadioButtonChecked,
  MdCheckBox,
  MdArrowDropDownCircle,
} from 'react-icons/md';
import { quesType } from '../../utils';
import { quesConst } from '../../constants';
import { editType } from '../../store/questions';

function SelectType({ id, type }: quesType.QuestionsGuard) {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);

  const openClose = (bool: boolean) => setHidden(bool);

  const editTypeBtn = (newType: string) => {
    openClose(true);
    dispatch(editType({ sendId: id, newType }));
  };

  const short = [
    <MdShortText size="1.5em" key={1} />,
    <span className="inline-block text-sm" key={2}>{quesConst.SHORT_TEXT}</span>,
  ];
  const essay = [
    <MdOutlineFormatAlignLeft size="1.5em" key={1} />,
    <span className="inline-block text-sm" key={2}>{quesConst.ESSAY_TEXT}</span>,
  ];
  const choice = [
    <MdRadioButtonChecked size="1.5em" key={1} />,
    <span className="inline-block text-sm" key={2}>{quesConst.CHOICE_TEXT}</span>,
  ];
  const checkbox = [
    <MdCheckBox size="1.5em" key={1} />,
    <span className="inline-block text-sm" key={2}>{quesConst.CHECKBOX_TEXT}</span>,
  ];
  const dropdown = [
    <MdArrowDropDownCircle size="1.5em" key={1} />,
    <span className="inline-block text-sm" key={2}>{quesConst.DROPDOWN_TEXT}</span>,
  ];

  const typesInfo = [
    { type: quesConst.SHORT_TYPE, text: short },
    { type: quesConst.ESSAY_TYPE, text: essay },
    { type: quesConst.CHOICE_TYPE, text: choice },
    { type: quesConst.CHECKBOX_TYPE, text: checkbox },
    { type: quesConst.DROPDOWN_TYPE, text: dropdown },
  ];

  const itemType = typesInfo.find((info) => info.type === type);

  const typeLists = typesInfo.map((info, index) => (
    <li onClick={() => editTypeBtn(info.type)} key={index}>
      <button
        type="button"
        className="active:bg-rose-400 hover:bg-rose-400 hover:text-white"
      >
        {info.text}
      </button>
    </li>
  ));

  return (
    <div className="dropdown dropdown-end w-1/3">
      <label
        tabIndex={0}
        className="btn btn-outline w-full border-gray-300 hover:bg-transparent hover:text-black hover:border-gray-300 flex justify-between"
        onClick={() => openClose(false)}
      >
        {itemType?.text}
        <MdKeyboardArrowDown size="1.5em" />
      </label>
      <ul
        className={`dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full ${hidden ? 'hidden' : ''}`}
        tabIndex={0}
      >
        {typeLists}
      </ul>
    </div>
  );
}

export default SelectType;
