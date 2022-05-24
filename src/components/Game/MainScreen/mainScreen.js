import React, {useState, useEffect, useRef, useCallback} from 'react'
import { useNavigate } from "react-router-dom";
import './Style/mainScrees.scss'
import Logo from './Images/Logo.png'
import LeftImg from './Images/left_animation.gif'
import RightImg from './Images/right_animation.gif'
import SmallLogo from './Images/small-logo.png'
import Coin from './Images/ethereium.png'
import dropdown from './Images/dropdown_icons.png'
import yellowTriangle from './Images/yellow_triangle.png'
import redTriangle from './Images/red_triangle.png'
import { AiOutlineRight } from 'react-icons/ai';
// import CircleType from 'circletype';

function MainScreen() {
  const Ref = useRef(null);
  // const [Color, setColor] = useState('#eeeeee')
  // const colorList = ['#DAF7A6','#FFC300','#FF5733','#C70039','#900C3F','#581845']
  const [phase, setPhase] = useState('Start')
  const [shape, setShape] = useState('Box')
  // const [index, setIndex] = useState(0)
  const [message, setmessage] = useState('You have to play a quick game to enter in the project')
  const [selectedColor, setSelectedColor] = useState('yellow')
  const [timer, settimer] = useState('60')
  let navigate = useNavigate();

  // const colorChanger = useCallback(() => {
  //   console.log(phase)
  //   if(phase === 'Start'){
  //     setInterval(() => {
  //       setColor(colorList[index])
  //       if(index+1 === colorList.length){
  //         setIndex(0)
  //       }else{
  //         setIndex(index+1)
  //       }
  //     }, 100);
  //   }else{
  //     new CircleType(document.getElementById('PlayText')).radius(384);
  //   }

  // },[index],)


  const startTimer = useCallback(
    (e) => {
      let { total, seconds } = getTimeRemaining(e);
      if (total >= 0) {

          // update the timer
          // check if less than 10 then we need to 
          // add '0' at the begining of the variable
          settimer(seconds)
      } 
      },[],
  )

  const clearTimer = useCallback((e) => {
      // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next    
    settimer('60');

    // If you try to remove this line the 
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
        startTimer(e);
    }, 1000)
    Ref.current = id;
    },[startTimer],
  )

  useEffect(() => {
    clearTimer(getDeadTime());
    window.sessionStorage.getItem('phase') === null ? setPhase('Start') : setPhase(window.sessionStorage.getItem('phase'))
    window.sessionStorage.getItem('message') === null ? setmessage('Click to enter to see the project') : setmessage(window.sessionStorage.getItem('message'))
    window.sessionStorage.getItem('shape') === null ? setShape('Box') : setShape(window.sessionStorage.getItem('shape'))
    window.sessionStorage.getItem('selectedColor') === null ? setSelectedColor('yellow') : setSelectedColor(window.sessionStorage.getItem('selectedColor'))
  }, [phase, clearTimer])
  

  // useEffect(() => {
  //   colorChanger()
  // }, [colorChanger])

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    if(seconds === 0){
      settimer('60')
      window.sessionStorage.clear()
      window.location.reload();
    }
    return {
        total, seconds
    };
  }

  

  

const getDeadTime = () => {
  let deadline = new Date();

  // This is where you need to adjust if 
  // you entend to add more time
  deadline.setSeconds(deadline.getSeconds() + 60);
  return deadline;
}

  
  

  const handleColor = (color) => {
    if(color === 'red'){
      if(selectedColor === 'yellow'){
        setmessage('You select the wrong box please select again')
        setSelectedColor('red')
        window.sessionStorage.setItem('message', 'You select the wrong box please select again')
        window.sessionStorage.setItem('selectedColor','red')
      }else{
        setPhase('Wait')
        window.sessionStorage.setItem('phase', 'Wait')
        clearTimer(getDeadTime());

        setTimeout(() => {
          settimer('60')
          window.sessionStorage.clear()
          window.location.reload();
        }, 60000);
      }
      
    }else{
      if(shape === 'Box'){
        setShape('Triangle')
        setmessage('You have to play a quick game to enter in the project')
        setSelectedColor('yellow')
        window.sessionStorage.setItem('shape', 'Triangle')
        window.sessionStorage.setItem('message', 'You have to play a quick game to enter in the project')
        window.sessionStorage.setItem('selectedColor', 'yellow')
      }else if(shape === 'Triangle'){
        setShape('Circle')
        setmessage('You have to play a quick game to enter in the project')
        setSelectedColor('yellow')
        window.sessionStorage.setItem('shape', 'Circle')
        window.sessionStorage.setItem('message', 'You have to play a quick game to enter in the project')
        window.sessionStorage.setItem('selectedColor', 'yellow')
      }else{
        window.sessionStorage.clear()
        window.sessionStorage.setItem('Auth', 'Authorized')
        navigate("/home");
        window.location.reload();
      }
    }
  }

  const handleEnter = () => {
    setPhase('Game')
    setmessage('You have to play a quick game to enter in the project')
    window.sessionStorage.setItem("phase", "Game")
    window.sessionStorage.setItem("message", "You have to play a quick game to enter in the project")
  }
  

  return (
    <div className='mainScreen-outer-div'>
        <div className='gird-layout'>
            <div className='left-div'>
                <div className='top-div'>
                  <span><img src={Coin} alt='coin'/></span>
                  <span>Collect ETH Reward</span>
                </div>
                <div className='img-div'>
                  <img src={LeftImg} alt='left-img'/>
                </div>
                <div className='bottom-div'>
                  <a href='#NFT'>Mint Your NFT <AiOutlineRight /></a>
                </div>
            </div>

            <div className='center-div'>
              <img src={Logo} alt='logo'/>
              {
                phase === 'Start' ?
                <div className='enter-text-div'>
                  <p>Click to enter to see the project</p>
                  <h1 onClick={handleEnter} style={{color: '#ffffff'}}>ENTER</h1>
                </div> :
                <div>
                  {
                    phase === 'Wait' ?
                    <div className='game-message-div'>
                      <p>{`You have to wait ${timer} seconds now to replay this game`}</p>
                      <h1 id='PlayText'>You Lose!</h1>
                    </div>
                    :
                    <div className='game-message-div'>
                      <p>{message}</p>
                      <h1 id='PlayText'>Tap to Play !</h1>
                      <p><img className='hover-effect' src={dropdown} alt='dropdown icon'/></p>
                      {
                        shape === 'Box' ? 
                        <div className='shapes-div'>
                          <div onClick={() => handleColor('red')} className={`box ${selectedColor}`}/>
                          <div onClick={() => handleColor('green')} className='box yellow'/>
                        </div> : 
                        <div>
                          {
                            shape === 'Triangle' ? 
                            <div className='shapes-div'>
                              <div>
                                {
                                  selectedColor === 'yellow' ?
                                  <img className='triangle' onClick={() => handleColor('red')} src={yellowTriangle} alt='yellowTriangle'/> :
                                  <img className='triangle' onClick={() => handleColor('red')} src={redTriangle} alt='redTriangle'/>
                                }
                              </div>
                              <div>
                                <img className='triangle' onClick={() => handleColor('green')} src={yellowTriangle} alt='yellowTriangle'/>
                              </div>
                            </div> : 
                            <div className='shapes-div'>
                              <div onClick={() => handleColor('red')} className={`circle ${selectedColor}`}/>
                              <div onClick={() => handleColor('green')} className='circle yellow'/>
                            </div>
                          }
                        
                        </div>
                      }
                    </div> 
                  }
                </div>
                
              }
              
              
            </div>

            <div className='right-div'>
                <div className='top-div'>
                  <span><img src={SmallLogo} alt='small-logo'/></span>
                  <span>Series <span>1</span></span>
                </div>
                <div className='img-div'>
                  <img src={RightImg} alt='right-img'/>
                </div>
                <div className='bottom-div'>
                  <a href='#NFT'>White List <AiOutlineRight /></a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainScreen