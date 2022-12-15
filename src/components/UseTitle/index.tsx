import { useSelector } from 'react-redux';
import { RootState } from '../../store';

function Useitle() {
  const { title, description } = useSelector((state: RootState) => state.tAndD);

  return (
    <header className="mb-5 border border-transparent rounded-2xl overflow-hidden">
      <div className="h-3 bg-rose-400" />
      <div className="bg-white flex flex-col p-7">
        <h1 className="text-2xl mb-5">{title || '제목 없는 설문지'}</h1>
        <h2 className="mb-3">{description || '설문지 설명'}</h2>
        <div className="text-sm text-red-600 pt-5 border-t">* 필수사항</div>
      </div>
    </header>
  );
}

export default Useitle;
