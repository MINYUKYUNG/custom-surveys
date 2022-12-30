import { ResponseTitle, ResponseForm } from '../components';
import { pageConst } from '../constants';

function Preview() {
  return (
    <div className="Preview">
      <ResponseTitle />
      <ResponseForm pageUrl={pageConst.PREVIEW_PAGE_URL} />
    </div>
  );
}

export default Preview;
