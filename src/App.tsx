import './App.css';
import RouterView from './routes';

function App() {
  return (
    <div className="min-h-screen flex justify-center bg-rose-100">
      <div className="w-full max-w-screen-md p-5">
        <RouterView />
      </div>
    </div>
  );
}

export default App;
