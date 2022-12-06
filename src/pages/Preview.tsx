import { UseTitle, UseQuestion } from '../components';
import { pageConst } from '../constants';

function Preview() {
  return (
    <div className="Preview">
      <UseTitle />
      <UseQuestion pageUrl={pageConst.PREVIEW_PAGE_URL}/>
    </div>
  );
};

export default Preview;
