import React, {useState, useEffect, useRef, useCallback} from 'react'
import { useNavigate } from "react-router-dom";
import './Style/mainScrees.scss'
import OrignalBackground from './Images/background.jpg'
import blurImg from './Images/blur_game_background.jpeg'
import Logo from './Images/Logo.png'
import LeftImg from './Images/left_animation.gif'
import RightImg from './Images/right_animation.gif'
import SmallLogo from './Images/small-logo.png'
import Coin from './Images/ethereium.png'
import dropdown from './Images/dropdown_icons.png'
import yellowTriangle from './Images/yellow_triangle.png'
import redTriangle from './Images/red_triangle.png'
import PlayText from './Images/PlayText.png'
import LoseText from './Images/LoseText.png'
import EnterText from './Images/EnterText.gif'
import PentagonGreen from './Images/Pentagon-Green.png'
import PentagonRed from './Images/Pentagon-Red.png'
import PentagonYellow from './Images/Pentagon-Yellow.png'
import PolygonGreen from './Images/Polygon-Green.png'
import PolygonRed from './Images/Polygon-Red.png'
import PolygonYellow from './Images/Polygon-Yellow.png'
import TriangleGreen from './Images/Triangle-Green.png'
import ProgressiveImage from "react-progressive-graceful-image";
// import { AiOutlineRight } from 'react-icons/ai';

function MainScreen({setLoader}) {
  const Ref = useRef(null);
  const [phase, setPhase] = useState('Game')
  const [shape, setShape] = useState('Box')
  const [message, setmessage] = useState('You have to play a quick game to enter in the project')
  const [B1selectedColor, setB1SelectedColor] = useState('yellow')
  const [B2selectedColor, setB2SelectedColor] = useState('yellow')
  const [timer, settimer] = useState('60')
  const [lock, setLock] = useState(false)
  const [RedPosition, setRedPosition] = useState(Math.random())
  let navigate = useNavigate();


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
    const t = window.sessionStorage.getItem('time') === null ? '60' : window.sessionStorage.getItem('time')
    settimer(t);

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

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if 
    // you entend to add more time
    const t = window.sessionStorage.getItem('time') === null ? 60 : parseInt(window.sessionStorage.getItem('time'))
    deadline.setSeconds(deadline.getSeconds() + t);
    return deadline;
  }

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    if(seconds <= 0){
      settimer('60')
      window.sessionStorage.setItem('B1selectedColor', 'yellow')
      // const Shape = window.sessionStorage.getItem('shape') === null ? 'Box' : window.sessionStorage.getItem('shape')
      window.sessionStorage.setItem('phase', 'Game')
      // window.sessionStorage.setItem('shape', Shape)
      window.sessionStorage.setItem("message", "You have to play a quick game to enter in the project")
      window.sessionStorage.removeItem('time')
      window.location.reload();

    }else{
      window.sessionStorage.setItem('time', seconds)
    }
    return {
        total, seconds
    };
  }

  useEffect(() => {
    if(window.sessionStorage.getItem('phase') === 'Wait'){
      clearTimer(getDeadTime());
    }
    window.sessionStorage.getItem('phase') === null ? setPhase('Game') : setPhase(window.sessionStorage.getItem('phase'))
    window.sessionStorage.getItem('message') === null ? setmessage('You have to play a quick game to enter in the project') : setmessage(window.sessionStorage.getItem('message'))
    window.sessionStorage.getItem('shape') === null ? setShape('Box') : setShape(window.sessionStorage.getItem('shape'))
    window.sessionStorage.getItem('B1selectedColor') === null ? setB1SelectedColor('yellow') : setB1SelectedColor(window.sessionStorage.getItem('B1selectedColor'))
    window.sessionStorage.getItem('B2selectedColor') === null ? setB2SelectedColor('yellow') : setB2SelectedColor(window.sessionStorage.getItem('B2selectedColor'))
  }, [phase, clearTimer])
  

  const handleColor = (color) => {
    if(color === 'red'){
      setLock(true)
      setB1SelectedColor('red')
      setmessage('You select the wrong box please select again')
      window.sessionStorage.setItem('message', 'You select the wrong box please select again')
      window.sessionStorage.setItem('B1selectedColor','red')

      setTimeout(() => {
        setPhase('Wait')
        window.sessionStorage.setItem('phase', 'Wait')
        clearTimer(getDeadTime());
      }, 3000);

    }else{
      setLock(true)
      setB2SelectedColor('green')
      window.sessionStorage.setItem('B2selectedColor','green')
      setTimeout(() => {
        if(shape === 'Box'){
          setRedPosition(Math.random())
          setLock(false)
          setShape('Triangle')
          setmessage('You have to play a quick game to enter in the project')
          setB1SelectedColor('yellow')
          setB2SelectedColor('yellow')
          window.sessionStorage.setItem('shape', 'Triangle')
          window.sessionStorage.setItem('message', 'You have to play a quick game to enter in the project')
          window.sessionStorage.setItem('B1selectedColor', 'yellow')
          window.sessionStorage.setItem('B2selectedColor', 'yellow')
        }else if(shape === 'Triangle'){
          setRedPosition(Math.random())
          setLock(false)
          setShape('Circle')
          setmessage('You have to play a quick game to enter in the project')
          setB1SelectedColor('yellow')
          setB2SelectedColor('yellow')
          window.sessionStorage.setItem('shape', 'Circle')
          window.sessionStorage.setItem('message', 'You have to play a quick game to enter in the project')
          window.sessionStorage.setItem('B1selectedColor', 'yellow')
          window.sessionStorage.setItem('B2selectedColor', 'yellow')
        }else if(shape === 'Circle'){
          setRedPosition(Math.random())
          setLock(false)
          setShape('Polygon')
          setmessage('You have to play a quick game to enter in the project')
          setB1SelectedColor('yellow')
          setB2SelectedColor('yellow')
          window.sessionStorage.setItem('shape', 'Polygon')
          window.sessionStorage.setItem('message', 'You have to play a quick game to enter in the project')
          window.sessionStorage.setItem('B1selectedColor', 'yellow')
          window.sessionStorage.setItem('B2selectedColor', 'yellow')
        }else if(shape === 'Polygon'){
          setRedPosition(Math.random())
          setLock(false)
          setShape('Pentagon')
          setmessage('You have to play a quick game to enter in the project')
          setB1SelectedColor('yellow')
          setB2SelectedColor('yellow')
          window.sessionStorage.setItem('shape', 'Pentagon')
          window.sessionStorage.setItem('message', 'You have to play a quick game to enter in the project')
          window.sessionStorage.setItem('B1selectedColor', 'yellow')
          window.sessionStorage.setItem('B2selectedColor', 'yellow')
        }else if(shape === 'Pentagon'){
          window.sessionStorage.clear()
          // window.sessionStorage.setItem('Auth', 'Authorized')
          setPhase('Enter')
          window.sessionStorage.setItem('phase', 'Enter')
        }else{
          alert('Invalid Shape Found!!')
        }
      }, 3000);
    }
  }

  const handleEnter = () => {
    window.sessionStorage.clear()
    window.sessionStorage.setItem('Auth', 'Authorized')
    navigate("/intro");
    window.location.reload();
  }
  

  return (
    <div className='mainScreen-outer-div'>
        <ProgressiveImage className='background-img' src={OrignalBackground} placeholder={blurImg}>
          {(src) => (
            <img
              className='background-img'
              src={src}
              alt="sea beach"
            />
          )}
          </ProgressiveImage>
        <div className='gird-layout'>
            <div className='left-div'>
                <div className='top-div'>
                  <span><img src={Coin} alt='coin'/></span>
                  <span>Collect ETH Reward</span>
                </div>
                <div className='img-div'>
                  <img src={LeftImg} alt='left-img'/>
                </div>
                {/* <div className='bottom-div'>
                  <a href='#NFT'>Mint Your NFT <AiOutlineRight /></a>
                </div> */}
            </div>

            <div className='center-div'>
              <div className='logo-img-div'>
                <img className='logo-img' src={Logo} alt='logo'/>
              </div>
              
              {
                phase === 'Enter' ?
                <div className='enter-text-div'>
                  <p>Click to enter to see the project</p>
                  <img onClick={handleEnter} src={EnterText} alt='enter text'/>
                </div> :
                <div>
                  {
                    phase === 'Wait' ?
                    <div className='game-message-div'>
                      <p>{`You have to wait ${timer} seconds now to replay this game`}</p>
                      <img className='LoseText' src={LoseText} alt='LoseText'/>
                    </div>
                    :
                    <div className='game-message-div'>
                      <p>{message}</p>
                      <img className='PlayText' src={PlayText} alt='PlayText'/>
                      <p><img className='hover-effect' src={dropdown} alt='dropdown icon'/></p>
                      {
                        shape === 'Box' ? 
                        <div>
                          {
                            RedPosition >= 0.5 ?
                            <div className='shapes-div'>
                              {
                                lock ?
                                <div className={`box ${B1selectedColor}`}/> :
                                <div onClick={() => handleColor('red')} className={`box ${B1selectedColor}`}/>
                              }
                              <div className='spacer'/>
                              {
                                lock ?
                                <div className={`box ${B2selectedColor}`}/> :
                                <div onClick={() => handleColor('green')} className={`box ${B2selectedColor}`}/>
                              }
                            </div> : 
                            <div className='shapes-div'>
                              {
                                lock ?
                                <div className={`box ${B2selectedColor}`}/> :
                                <div onClick={() => handleColor('green')} className={`box ${B2selectedColor}`}/>
                              }
                              <div className='spacer'/>
                              {
                                lock ?
                                <div className={`box ${B1selectedColor}`}/> :
                                <div onClick={() => handleColor('red')} className={`box ${B1selectedColor}`}/>
                              }
                            </div>
                          }
                          
                          
                        </div> : 
                        <div>
                          {
                            shape === 'Triangle' ? 
                            <div>
                              {
                                RedPosition >= 0.5 ?
                                <div className='shapes-div'>
                                  {
                                    lock ?
                                    <div>
                                      {
                                        B1selectedColor === 'yellow' ?
                                        <img className='triangle' src={yellowTriangle} alt='yellowTriangle'/> :
                                        <img className='triangle' src={redTriangle} alt='redTriangle'/>
                                      }
                                    </div> :
                                    <div>
                                      {
                                        B1selectedColor === 'yellow' ?
                                        <img className='triangle' onClick={() => handleColor('red')} src={yellowTriangle} alt='yellowTriangle'/> :
                                        <img className='triangle' onClick={() => handleColor('red')} src={redTriangle} alt='redTriangle'/>
                                      }
                                    </div>
                                  }
                                  <div className='spacer'/>
                                  {
                                    lock ?
                                    <div>
                                      {
                                        B2selectedColor === 'yellow' ?
                                        <img className='triangle' src={yellowTriangle} alt='yellowTriangle'/> :
                                        <img className='triangle' src={TriangleGreen} alt='greenTriangle'/>
                                      }
                                    </div> :
                                    <div>
                                      {
                                        B2selectedColor === 'green' ?
                                        <img className='triangle' onClick={() => handleColor('green')} src={TriangleGreen} alt='greenTriangle'/> :
                                        <img className='triangle' onClick={() => handleColor('green')} src={yellowTriangle} alt='yellowTriangle'/>
                                      }
                                    </div>
                                  }
                                </div> :
                                <div className='shapes-div'>
                                  {
                                    lock ?
                                    <div>
                                      {
                                        B2selectedColor === 'yellow' ?
                                        <img className='triangle' src={yellowTriangle} alt='yellowTriangle'/> :
                                        <img className='triangle' src={TriangleGreen} alt='greenTriangle'/>
                                      }
                                    </div> :
                                    <div>
                                      {
                                        B2selectedColor === 'green' ?
                                        <img className='triangle' onClick={() => handleColor('green')} src={TriangleGreen} alt='greenTriangle'/> :
                                        <img className='triangle' onClick={() => handleColor('green')} src={yellowTriangle} alt='yellowTriangle'/>
                                      }
                                    </div>
                                  }
                                  <div className='spacer'/>
                                  {
                                    lock ?
                                    <div>
                                      {
                                        B1selectedColor === 'yellow' ?
                                        <img className='triangle' src={yellowTriangle} alt='yellowTriangle'/> :
                                        <img className='triangle' src={redTriangle} alt='redTriangle'/>
                                      }
                                    </div> :
                                    <div>
                                      {
                                        B1selectedColor === 'yellow' ?
                                        <img className='triangle' onClick={() => handleColor('red')} src={yellowTriangle} alt='yellowTriangle'/> :
                                        <img className='triangle' onClick={() => handleColor('red')} src={redTriangle} alt='redTriangle'/>
                                      }
                                    </div>
                                  }
                                  
                                </div>
                              }
                            </div> : 
                            <div>
                              {
                                shape === 'Circle' ?
                                <div>
                                  <div>
                                    {
                                      RedPosition >= 0.5 ? 
                                      <div className='shapes-div'>
                                        {
                                          lock ?
                                          <div className={`circle ${B1selectedColor}`}/> :
                                          <div onClick={() => handleColor('red')} className={`circle ${B1selectedColor}`}/>
                                        }
                                        <div className='spacer'/>
                                        {
                                          lock ?
                                          <div className={`circle ${B2selectedColor}`}/> :
                                          <div onClick={() => handleColor('green')} className={`circle ${B2selectedColor}`}/>
                                        }
                                      </div> :
                                      <div className='shapes-div'>
                                        {
                                          lock ?
                                          <div className={`circle ${B2selectedColor}`}/> :
                                          <div onClick={() => handleColor('green')} className={`circle ${B2selectedColor}`}/>
                                        }
                                        <div className='spacer'/>
                                        {
                                          lock ?
                                          <div className={`circle ${B1selectedColor}`}/> :
                                          <div onClick={() => handleColor('red')} className={`circle ${B1selectedColor}`}/>
                                        }
                                      </div>
                                    }
                                  </div>
                                </div> : 
                                <div>
                                  {
                                    shape === 'Polygon' ?
                                    <div>
                                    {
                                      RedPosition >= 0.5 ?
                                      <div className='shapes-div'>
                                        {
                                          lock ?
                                          <div>
                                            {
                                              B1selectedColor === 'yellow' ?
                                              <img className='polygon' src={PolygonYellow} alt='PolygonYellow'/> :
                                              <img className='polygon' src={PolygonRed} alt='PolygonRed'/>
                                            }
                                          </div> :
                                          <div>
                                            {
                                              B1selectedColor === 'yellow' ?
                                              <img className='polygon' onClick={() => handleColor('red')} src={PolygonYellow} alt='PolygonYellow'/> :
                                              <img className='polygon' onClick={() => handleColor('red')} src={PolygonRed} alt='PolygonRed'/>
                                            }
                                          </div>
                                        }
                                        <div className='spacer'/>
                                        {
                                          lock ?
                                          <div>
                                            {
                                              B2selectedColor === 'yellow' ?
                                              <img className='polygon' src={PolygonYellow} alt='PolygonYellow'/> :
                                              <img className='polygon' src={PolygonGreen} alt='PolygonGreen'/>
                                            }
                                          </div> :
                                          <div>
                                            {
                                              B2selectedColor === 'green' ?
                                              <img className='polygon' onClick={() => handleColor('green')} src={PolygonGreen} alt='PolygonGreen'/> :
                                              <img className='polygon' onClick={() => handleColor('green')} src={PolygonYellow} alt='PolygonYellow'/>
                                            }
                                          </div>
                                        }
                                      </div> : 
                                      <div className='shapes-div'>
                                        {
                                          lock ?
                                          <div>
                                            {
                                              B2selectedColor === 'yellow' ?
                                              <img className='polygon' src={PolygonYellow} alt='PolygonYellow'/> :
                                              <img className='polygon' src={PolygonGreen} alt='PolygonGreen'/>
                                            }
                                          </div> :
                                          <div>
                                            {
                                              B2selectedColor === 'green' ?
                                              <img className='polygon' onClick={() => handleColor('green')} src={PolygonGreen} alt='PolygonGreen'/> :
                                              <img className='polygon' onClick={() => handleColor('green')} src={PolygonYellow} alt='PolygonYellow'/>
                                            }
                                          </div>
                                        }
                                        <div className='spacer'/>
                                        {
                                          lock ?
                                          <div>
                                            {
                                              B1selectedColor === 'yellow' ?
                                              <img className='polygon' src={PolygonYellow} alt='PolygonYellow'/> :
                                              <img className='polygon' src={PolygonRed} alt='PolygonRed'/>
                                            }
                                          </div> :
                                          <div>
                                            {
                                              B1selectedColor === 'yellow' ?
                                              <img className='polygon' onClick={() => handleColor('red')} src={PolygonYellow} alt='PolygonYellow'/> :
                                              <img className='polygon' onClick={() => handleColor('red')} src={PolygonRed} alt='PolygonRed'/>
                                            }
                                          </div>
                                        }
                                      </div>
                                    }
                                      
                                      
                                    </div> : 
                                    <div>
                                    {
                                      RedPosition >= 0.5 ?
                                      <div className='shapes-div'>
                                        {
                                          lock ?
                                          <div>
                                            {
                                              B1selectedColor === 'yellow' ?
                                              <img className='pentagon' src={PentagonYellow} alt='PentagonYellow'/> :
                                              <img className='pentagon' src={PentagonRed} alt='PentagonRed'/>
                                            }
                                          </div> :
                                          <div>
                                            {
                                              B1selectedColor === 'yellow' ?
                                              <img className='pentagon' onClick={() => handleColor('red')} src={PentagonYellow} alt='PentagonYellow'/> :
                                              <img className='pentagon' onClick={() => handleColor('red')} src={PentagonRed} alt='PentagonRed'/>
                                            }
                                          </div>
                                        }
                                        <div className='spacer'/>
                                        {
                                          lock ?
                                          <div>
                                            {
                                              B2selectedColor === 'yellow' ?
                                              <img className='pentagon' src={PentagonYellow} alt='PentagonYellow'/> :
                                              <img className='pentagon' src={PentagonGreen} alt='PentagonGreen'/>
                                            }
                                          </div> :
                                          <div>
                                            {
                                              B2selectedColor === 'green' ?
                                              <img className='pentagon' onClick={() => handleColor('green')} src={TriangleGreen} alt='greenTriangle'/> :
                                              <img className='pentagon' onClick={() => handleColor('green')} src={PentagonYellow} alt='PentagonGreen'/>
                                            }
                                          </div>
                                        }
                                      </div> :
                                      <div className='shapes-div'>
                                        { 
                                          lock ?
                                          <div>
                                            {
                                              B2selectedColor === 'yellow' ?
                                              <img className='pentagon' src={PentagonYellow} alt='PentagonYellow'/> :
                                              <img className='pentagon' src={PentagonGreen} alt='PentagonGreen'/>
                                            }
                                          </div> :
                                          <div>
                                            {
                                              B2selectedColor === 'green' ?
                                              <img className='pentagon' onClick={() => handleColor('green')} src={TriangleGreen} alt='greenTriangle'/> :
                                              <img className='pentagon' onClick={() => handleColor('green')} src={PentagonYellow} alt='PentagonGreen'/>
                                            }
                                          </div>
                                        }
                                        <div className='spacer'/>
                                        {
                                          lock ?
                                          <div>
                                            {
                                              B1selectedColor === 'yellow' ?
                                              <img className='pentagon' src={PentagonYellow} alt='PentagonYellow'/> :
                                              <img className='pentagon' src={PentagonRed} alt='PentagonRed'/>
                                            }
                                          </div> :
                                          <div>
                                            {
                                              B1selectedColor === 'yellow' ?
                                              <img className='pentagon' onClick={() => handleColor('red')} src={PentagonYellow} alt='PentagonYellow'/> :
                                              <img className='pentagon' onClick={() => handleColor('red')} src={PentagonRed} alt='PentagonRed'/>
                                            }
                                          </div>
                                        }
                                      </div>
                                    }
                                      
                                      
                                    </div>
                                  }
                                </div>
                              }
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
                  <span>Series 1</span>
                </div>
                <div className='img-div'>
                  <img src={RightImg} alt='right-img'/>
                </div>
                {/* <div className='bottom-div'>
                  <a href='#NFT'>White List <AiOutlineRight /></a>
                </div> */}
            </div>
        </div>
    </div>
  )
}

export default MainScreen