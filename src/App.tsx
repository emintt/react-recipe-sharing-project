import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Layout from './views/Layout';
import Home from './views/Home';
import Create from './views/Create';
import Profile from './views/Profile';
import Login from './views/Login';
import Single from './views/Single';
import { UserProvider } from './contexts/UserContext';
import Register from './views/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { CommentProvider } from './contexts/CommentContext';


function App() {

  return (
    <>
      <Router>
        <UserProvider>
          <CommentProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route path='/' element={<Home />} />
                  <Route path='/single' element={<Single />} />
                <Route path='/create' element={<ProtectedRoute><Create /></ProtectedRoute>}/>
                <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
              </Route>
            </Routes>
          </CommentProvider>
        </UserProvider>
      </Router>
    </>
  )
}

export default App
