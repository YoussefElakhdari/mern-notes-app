import Navbar from './Components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Notes from './pages/Notes';
import Create from './pages/Create';
import { useAuth } from './contexts/Auth';
import { Routes , Route , Navigate } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import Update from './pages/Update';

function App() {

  const { user } = useAuth();
  return ( 
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path='/Notes' element={<Notes />} />
            <Route path='/Notes/create' element= {<Create />} />
            <Route path='/Notes/update/:id' element= {<Update />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={
          user ? <Navigate to='/' /> : <Register />
        } />
        <Route path='/login' element={
          user ? <Navigate to='/' /> : <Login />
        } />
      </Routes>
    </>
  )
}

export default App
