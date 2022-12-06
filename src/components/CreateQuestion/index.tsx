import { useDispatch, useSelector } from 'react-redux';
import { useRef, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import TextOrOption from './TextOrOption';
import SelectType from './SelectType';
import Required from './Required';
import { addQues, deleteQues, copyQues, editTitle, changeQuesOrder } from '../../store/questions';
import { 
  MdContentCopy, 
  MdDeleteOutline, 
  MdAddCircleOutline, 
  MdOutlineRemoveRedEye, 
  MdDragHandle
} from 'react-icons/md';

function CreateQuestion() {
  const dispatch = useDispatch();
  const questions = useSelector((state: RootState) => state.questions);
  
  const countId = useRef(1);

  useEffect(() => { // 뒤로가기 후에도, 질문 id 이어서 관리
    if (questions.length !== 1) {
      questions.forEach((item) => {
        if (countId.current < item.id) countId.current = item.id;
      });
    };
  }, []);

  const editTitleBtn = (e: ChangeEvent<HTMLInputElement>, sendId: number) => { // 질문 제목 편집
    const value = e.target.value;
    dispatch(editTitle({ sendId, value }));
  };

  const addQuesBtn = (sendId: number) => { // 질문 추가
    countId.current = countId.current + 1;
    dispatch(addQues({ sendId, newId: countId.current }));
  };
  
  const deleteQuesBtn = (sendId: number) => { // 질문 삭제
    dispatch(deleteQues(sendId));
  };

  const copyQuesBtn = (sendId: number) => { // 질문 복사
    countId.current = countId.current + 1;
    dispatch(copyQues({ sendId, newId: countId.current }));
  };

  const createLists = questions.map((item, index) => {
    return (
      <Draggable draggableId={`itemId-${item.id}`} index={index} key={`itemId-${item.id}`}>
        {(provided) => (
          <div
            ref={provided.innerRef} 
            {...provided.draggableProps} 
            className="bg-white mb-5 py-7 border rounded-xl border-transparent" 
          >
            <div 
              {...provided.dragHandleProps} 
              className="flex justify-center text-rose-400 opacity-50 mb-4 hover:opacity-100"
            >
              <MdDragHandle size="1.5em" />
            </div>
            <div className="flex justify-between px-7">
              <input 
                type="text" 
                placeholder="질문" 
                defaultValue={item.title} 
                onChange={(e) => editTitleBtn(e, item.id)} 
                className="focus-visible:outline-none border-b-2 focus:border-rose-400 w-3/5"
              />
              <SelectType {...item} />
            </div>
            <TextOrOption {...item} />
            <div className="flex justify-end mt-4 pt-4 border-t mx-7">
              <div className="tooltip tooltip-bottom flex" data-tip="복사">
                <button onClick={() => copyQuesBtn(item.id)} className="mr-4">
                  <MdContentCopy size="1.5em" />
                </button>
              </div>
              <div className="tooltip tooltip-bottom flex" data-tip="삭제">
                <button onClick={() => deleteQuesBtn(item.id)} className="mr-4">
                  <MdDeleteOutline size="1.5em" />
                </button>
              </div>
              <div className="tooltip tooltip-bottom flex" data-tip="추가">
                <button onClick={() => addQuesBtn(item.id)} className="mr-4">
                  <MdAddCircleOutline size="1.5em" />
                </button>
              </div>
              <Required {...item} />
            </div>
          </div>
        )}
      </Draggable>
    );
  });

  const noLists = () => { // 질문을 모두 삭제하였을 때, 미리보기 버튼 hide & 질문 추가 버튼 visible
    if (questions.length) return null;
    return (
      <div>
        <button onClick={() => addQuesBtn(0)} className="p-4 text-rose-400">
          <MdAddCircleOutline size="1.5em" />
        </button>
      </div>
    );
  };

  const moveToPreview = () => { // 미리 보기 기능
    if (questions.length === 0) return null;
    return (
      <Link to="/preview" className="inline-block">
        <button 
          type="button" 
          className="p-2 flex bg-rose-400 text-white border-1 rounded-md"
        >
          <MdOutlineRemoveRedEye size="1.5em" />
        </button>
      </Link>
    );
  };
  
  const onDragEnd  = (result: DropResult) => { // 질문 순서 변경 = 드래그 앤 드롭
    if (!result.destination) return;

    const from = result.source.index, to = result.destination.index;
    dispatch(changeQuesOrder({ from, to }));
  };


  return (
    <main>
      {noLists()}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="createLists" type="createLists">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {createLists}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {moveToPreview()}
    </main>
  );
};

export default CreateQuestion;
