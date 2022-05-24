import './App.scss';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MainScreen from './components/Game/MainScreen/mainScreen';
import Home from './components/Project/index'
import { useEffect, useState } from 'react';

function App() {
  const [Auth, setAuth] = useState('Unauthorized')

  useEffect(() => {
    const auth = window.sessionStorage.getItem('Auth')
    if(auth === 'Authorized'){
      setAuth('Authorized')
    }
  }, [Auth])
  

  return (
    <div className="App">
      {
        Auth === 'Unauthorized' ?
        <Router>
          <Routes>
            <Route path='/*' element = {<MainScreen />}/>
          </Routes>
        </Router> :
        <Router>
          <Routes>
            <Route path='/home' element = {<Home/>}/>
            <Route path='/*' element = {<MainScreen />}/>
          </Routes>
        </Router>
      }
      
    </div>
  );
}

export default App;
