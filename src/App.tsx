import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Layout from './views/Layout';
import Home from './views/Home';
import Create from './views/Create';
import Profile from './views/Profile';
import Login from './views/Login';
import Single from './views/Single';
import Logout from './components/LogoutButton';
import { UserProvider } from './contexts/UserContext';
import Register from './views/Register';

function App() {

  return (
    <>
      <Router>
        <UserProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/single' element={<Single />} />
              <Route path='/create' element={<Create />}/>
              <Route path='/profile' element={<Profile />} />
              <Route path='/logout' element={<Logout />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
            </Route>
          </Routes>
        </UserProvider>
      </Router>
    </>
  )
}

export default App
