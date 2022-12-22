import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editTAndD } from '../../store/tAndD';
import { RootState } from '../../store';
import { tAndDConst } from '../../constants';

function CreateTitle() {
  const dispatch = useDispatch();
  const { title, description } = useSelector((state: RootState) => state.tAndD);

  const updateTAndD = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;

    if (name === 'title') dispatch(editTAndD({ title: value, description }));
    else dispatch(editTAndD({ title, description: value }));
  };

  return (
    <header className="mb-5 border border-transparent rounded-2xl overflow-hidden">
      <div className="h-3 bg-rose-400" />
      <div className="bg-white flex flex-col p-7">
        <input
          type="text"
          name="title"
          placeholder={tAndDConst.TANDD_DEFAULT_TITLE}
          defaultValue={title}
          onChange={updateTAndD}
          className="focus-visible:outline-none border-b-2 focus:border-rose-400 text-2xl mb-5"
        />
        <input
          type="text"
          name="desc"
          placeholder={tAndDConst.TANDD_DEFAULT_DESCRIPTION}
          defaultValue={description}
          onChange={updateTAndD}
          className="focus-visible:outline-none border-b-2 focus:border-rose-400"
        />
      </div>
    </header>
  );
}

export default CreateTitle;
