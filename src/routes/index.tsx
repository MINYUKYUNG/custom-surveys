import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Create, Preview, Submit, NotFound } from '../pages';

function RouterView() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Create />} />
        <Route path={"/preview"} element={<Preview />} />
        <Route path={"/submit"} element={<Submit />} />
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterView;
