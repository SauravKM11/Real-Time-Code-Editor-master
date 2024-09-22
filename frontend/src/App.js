import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';

function App() {
  return (
    <>
    <div>
      <Toaster position='top-right' toastOptions={{
        sucess:{
          theme:{
            primary: '#4aed88'
          }
        }
      }}>
      </Toaster>
    </div>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/editor/:roomId' element={<EditorPage/>}/>
      </Routes>
    </>  
  );
}

export default App;
