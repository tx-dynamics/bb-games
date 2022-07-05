import React,{ useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import MainScreen from './components/Game/MainScreen/mainScreen';
import LandingPage from './components/Landing Page/index';
import Intro from './components/Intro Video/index'
import LoadingScreen from './components/Loading Screen/index'
// import Home from './components/Project/index'
import './App.scss';


function App() {
  const [Auth, setAuth] = useState('Unauthorized')
  const [Loader, setLoader] = useState(true)

  useEffect(() => {
    const auth = window.sessionStorage.getItem('Auth')
    if(auth === 'Authorized'){
      setAuth('Authorized')
      setTimeout(() => {
        setLoader(false)
      }, 1000);
    }else{
      setTimeout(() => {
        setLoader(false)
      }, 1000);
    }
  }, [Auth])
  

  return (
    <div className="App">
      {
        Auth === 'Unauthorized' ?
        <div>
          {
            Loader ? <LoadingScreen/> :
            <Router>
              <Routes>
                <Route path='/*' element = {<MainScreen />}/>
              </Routes>
            </Router>
          }
        </div> :
        <Router>
          <Routes>
            <Route path='/home' element = {<LandingPage/>}/>
            <Route path='/intro' element = {<Intro/>}/>
            <Route path='/*' element = {<Intro />}/>
          </Routes>
        </Router>
      }
      
    </div>
  );
}

export default App;
