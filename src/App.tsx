import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Layout from './views/Layout';
import Home from './views/Home';
import Create from './views/Create';
import Profile from './views/Profile';
import Login from './views/Login';
import Single from './views/Single';
import Logout from './views/Logout';
import { UserProvider } from './contexts/UserContext';

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
              <Route path='/login' element={<Login />} />
            </Route>
          </Routes>
        </UserProvider>
      </Router>
    </>
  )
}

export default App
