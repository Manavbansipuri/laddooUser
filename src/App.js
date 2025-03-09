import { ToastContainer, Zoom } from 'react-toastify';
import './App.css';
import MusicUploadForm from './components/Card/MusicUploadFrame';

function App() {
  return (
    <div>

      <div>
        <div className="h-screen w-full flex items-center justify-center bg-gray-900">
          <div className="h-full w-[390px] bg-white shadow-lg rounded-lg overflow-hidden">
            <MusicUploadForm />
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="dark"
          transition={Zoom}
        />


      </div>

    </div>

  );
}

export default App;
