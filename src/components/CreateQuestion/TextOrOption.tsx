import { useDispatch } from 'react-redux';
import { ChangeEvent } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import {
  MdRadioButtonUnchecked,
  MdCheckBoxOutlineBlank,
  MdOutlineArrowDropDownCircle,
  MdClear,
  MdAdd,
  MdDragIndicator,
} from 'react-icons/md';
import { quesType } from '../../utils';
import { quesConst } from '../../constants';
import {
  addOption,
  deleteOption,
  editOptionText,
  changeOptionOrder,
} from '../../store/questions';

function TextOrOption({ id, type, options }: quesType.QuestionsGuard) {
  const dispatch = useDispatch();

  if (quesConst.SHORT_TYPE === type) {
    return (
      <input
        type="text"
        placeholder={quesConst.DEFAULT_SHORT_TEXT}
        className="focus-visible:outline-none border-b-2 border-dotted
        pt-6 pb-1 pointer-events-none w-1/2 mx-7"
        readOnly
      />
    );
  }

  if (quesConst.ESSAY_TYPE === type) {
    return (
      <input
        type="text"
        placeholder={quesConst.DEFAULT_ESSAY_TEXT}
        className="focus-visible:outline-none border-b-2 border-dotted
        pt-6 pb-1 pointer-events-none w-4/5 mx-7"
        readOnly
      />
    );
  }

  const deleteOptionBtn = (optionIndex: number) => { // 객관식 질문, 체크박스, 드롭박스 옵션 삭제
    dispatch(deleteOption({ sendId: id, optionIndex }));
  };

  // 객관식 질문, 체크박스, 드롭박스 옵션 텍스트 편집
  const editOptionTextBtn = (e: ChangeEvent<HTMLInputElement>, optionIndex: number) => {
    const { value } = e.target;
    dispatch(editOptionText({ sendId: id, optionIndex, value }));
  };

  const showOptions = options.map((option, index) => {
    const whichType = () => {
      if (quesConst.CHOICE_TYPE === type) return <MdRadioButtonUnchecked size="1.5em" />;
      if (quesConst.CHECKBOX_TYPE === type) return <MdCheckBoxOutlineBlank size="1.5em" />;
      if (quesConst.DROPDOWN_TYPE === type) return <MdOutlineArrowDropDownCircle size="1.5em" />;
    };

    return (
      <Draggable
        draggableId={`itemId-${id}-optionId-${option.id}`}
        index={index}
        key={`itemId-${id}-optionId-${option.id}`}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="flex pt-6 pr-7"
          >
            <div {...provided.dragHandleProps} className="text-rose-400 opacity-50 hover:opacity-100">
              <MdDragIndicator size="1.5em" />
            </div>
            {whichType()}
            <input
              type="text"
              defaultValue={option.text}
              onChange={(e) => editOptionTextBtn(e, index)}
              className="focus-visible:outline-none border-b-2 focus:border-rose-400 grow pb-1 ml-2 mr-8"
            />
            <button
              type="button"
              onClick={() => deleteOptionBtn(index)}
              className="flex text-gray-300 hover:text-black"
            >
              <MdClear size="1.5em" />
            </button>
          </div>
        )}
      </Draggable>
    );
  });

  const addOptionBtn = () => { // 객관식 질문, 체크박스, 드롭박스 옵션 추가
    let countId = 1;
    if (options.length) {
      options.forEach((option) => {
        if (countId < option.id) countId = option.id;
      });

      countId += 1;
    }

    dispatch(addOption({ sendId: id, newOptionId: countId }));
  };

  const onDragEnd = (result: DropResult) => { // 질문의 옵션 순서 변경 = 드래그 앤 드롭
    if (!result.destination) return;

    const from = result.source.index;
    const to = result.destination.index;
    dispatch(changeOptionOrder({ sendId: id, from, to }));
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={`itemId-${id}-showOptions`} type={`itemId-${id}-showOptions`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {showOptions}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <button
        type="button"
        onClick={addOptionBtn}
        className="flex pt-6 pb-1 text-rose-400 px-7"
      >
        <MdAdd size="1.5em" />
        <span className="ml-2">옵션</span>
      </button>
    </div>
  );
}

export default TextOrOption;
