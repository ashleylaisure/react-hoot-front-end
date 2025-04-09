import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';

import HootList from './components/HootList/HootList';
import HootDetails from './components/HootDetails/HootDetails.jsx';
import HootForm from './components/HootForm/HootForm.jsx';

import * as hootService from './services/hootService.js'

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [hoots, setHoots] = useState([])

  const handleAddHoot = async (hootFormData) => {
    const newHoot = await hootService.create(hootFormData)
    setHoots([newHoot, ...hoots])
    // console.log('hootFormData', hootFormData)
    navigate('/hoots');
  }

  useEffect(() => {
    const fetchAllHoots = async () => {
      const hootsData = await hootService.index()

      // console.log(hootsData)
      setHoots(hootsData)
    }
    if(user) fetchAllHoots()
  }, [user])
  
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />

        {user ? (
          <>
            <Route path='/hoots' element={<HootList hoots={hoots}/>}/>
            <Route path='/hoots/:hootId/' element={<HootDetails />} />
            <Route path='/hoots/new' element={<HootForm handleAddHoot={handleAddHoot}/>} />
          </>
        ) : (
          <>
            <Route path='/sign-up' element={<SignUpForm />} />
            <Route path='/sign-in' element={<SignInForm />} />
          </>
        )}
        
      </Routes>
    </>
  );
};

export default App;
