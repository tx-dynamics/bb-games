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
import PlayText from './Images/PlayText.png'
import LoseText from './Images/LoseText.png'
import EnterText from './Images/EnterText.gif'
// import ProgressiveImage from "react-progressive-graceful-image";

function MainScreen() {
  const Ref = useRef(null);
  const [phase, setPhase] = useState('Game')
  const [shape, setShape] = useState('Circle')
  const [message, setmessage] = useState('You have to play a quick game to enter in the project')
  const [leftColor, setLeftColor] = useState('yellow')
  const [rightColor, setRightColor] = useState('yellow')
  const [leftShapeColor, setLeftShapeColor] = useState('yellow')
  const [rightShapeColor, setRightShapeColor] = useState('yellow')
  const [timer, settimer] = useState('60')
  const [lock, setLock] = useState(false)
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
      // window.sessionStorage.setItem('B1selectedColor', 'yellow')
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

  const handleSides = (value) => {

    let No = 0

    if(value === 'new'){
      No = Math.random()
      window.sessionStorage.setItem('No', No)
    }else{
      No = window.sessionStorage.getItem('No') === 'null' ? Math.random() : window.sessionStorage.getItem('No')
      window.sessionStorage.setItem('No', No)
    }
    
    console.log(No)
    if(No > 0.5){
      setLeftColor('red')
      setRightColor('green')
    }else{
      setLeftColor('green')
      setRightColor('red')
    }
  }



  useEffect(() => {
    if(window.sessionStorage.getItem('phase') === 'Wait'){
      clearTimer(getDeadTime());
    }
    handleSides('old')
    window.sessionStorage.getItem('phase') === null ? setPhase('Game') : setPhase(window.sessionStorage.getItem('phase'))
    window.sessionStorage.getItem('message') === null ? setmessage('You have to play a quick game to enter in the project') : setmessage(window.sessionStorage.getItem('message'))
    window.sessionStorage.getItem('shape') === null ? setShape('Circle') : setShape(window.sessionStorage.getItem('shape'))

  }, [clearTimer])




  const handleColor = (color, side) => {
    setLock(true)

    if(color === 'red'){
      if(side === 'left'){
        setLeftShapeColor('red')
      }else{
        setRightShapeColor('red')
      }

    setTimeout(() => {
      setmessage('You select the wrong box please select again')
      window.sessionStorage.setItem('message', 'You select the wrong box please select again')
      setPhase('Wait')
      window.sessionStorage.setItem('phase', 'Wait')
      clearTimer(getDeadTime());
    }, 3000);

    }else{
      if(side === 'left'){
        setLeftShapeColor('green')
      }else{
        setRightShapeColor('green')
      }

      setTimeout(() => {
        setLock(false)
        if(shape === 'Circle'){
          handleSides('new')
          if(side === 'left'){
            setLeftShapeColor('yellow')
          }else{
            setRightShapeColor('yellow')
          }
          setShape('Triangle')
          setmessage('You have to play a quick game to enter in the project')
          window.sessionStorage.setItem('shape', 'Triangle')
          window.sessionStorage.setItem('message', 'You have to play a quick game to enter in the project')
        }else if(shape === 'Triangle'){
          handleSides('new')
          if(side === 'left'){
            setLeftShapeColor('yellow')
          }else{
            setRightShapeColor('yellow')
          }
          setShape('Box')
          setmessage('You have to play a quick game to enter in the project')
          window.sessionStorage.setItem('shape', 'Box')
          window.sessionStorage.setItem('message', 'You have to play a quick game to enter in the project')
        }else if(shape === 'Box'){
          handleSides('new')
          if(side === 'left'){
            setLeftShapeColor('yellow')
          }else{
            setRightShapeColor('yellow')
          }
          setShape('Pentagon')
          setmessage('You have to play a quick game to enter in the project')
          window.sessionStorage.setItem('shape', 'Pentagon')
          window.sessionStorage.setItem('message', 'You have to play a quick game to enter in the project')
        }else if(shape === 'Pentagon'){
          handleSides('new')
          if(side === 'left'){
            setLeftShapeColor('yellow')
          }else{
            setRightShapeColor('yellow')
          }
          setShape('Hexagon')
          setmessage('You have to play a quick game to enter in the project')
          window.sessionStorage.setItem('shape', 'Hexagon')
          window.sessionStorage.setItem('message', 'You have to play a quick game to enter in the project')
        }else if(shape === 'Hexagon'){
          window.sessionStorage.clear()
          setPhase('Enter')
          window.sessionStorage.setItem('phase', 'Enter')
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
        {/* <ProgressiveImage className='background-img' src={OrignalBackground} placeholder={blurImg}>
          {(src) => (
            <img
              className='background-img'
              src={src}
              alt="sea beach"
            />
          )}
          </ProgressiveImage> */}
        <div className='gird-layout'>
            <div className='left-div'>
                <div>
                  <div className='top-div'>
                    <span><img src={Coin} alt='coin'/></span>
                    <span>Collect ETH Reward</span>
                  </div>
                  <div className='img-div'>
                    <img src={LeftImg} alt='left-img'/>
                  </div>
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
                        shape === 'Circle' ? 
                        <div>
                          {
                            <div className='shapes-div'>
                              {
                                lock ?
                                <div className={`circle ${leftShapeColor}`}/> :
                                <div onClick={() => handleColor(leftColor, 'left')} className={`circle ${leftShapeColor}`}/>
                              }
                              <div className='spacer'/>
                              {
                                lock ?
                                <div className={`circle ${rightShapeColor}`}/> :
                                <div onClick={() => handleColor(rightColor, 'right')} className={`circle ${rightShapeColor}`}/>
                              }
                            </div>
                          }
                        </div> : 
                        <div>
                          {
                            shape === "Triangle" ?
                            <div>
                              {
                                <div className='shapes-div'>
                                  {
                                    lock ?
                                    <div className={`triangle ${leftShapeColor}`}/> :
                                    <div onClick={() => handleColor(leftColor, 'left')} className={`triangle ${leftShapeColor}`}/>
                                  }
                                  <div className='spacer'/>
                                  {
                                    lock ?
                                    <div className={`triangle ${rightShapeColor}`}/> :
                                    <div onClick={() => handleColor(rightColor, 'right')} className={`triangle ${rightShapeColor}`}/>
                                  }
                                </div>
                              }
                            </div> : 
                            <div>
                              {
                                shape === "Box" ?
                                <div>
                                  {
                                    <div className='shapes-div'>
                                      {
                                        lock ?
                                        <div className={`box ${leftShapeColor}`}/> :
                                        <div onClick={() => handleColor(leftColor, 'left')} className={`box ${leftShapeColor}`}/>
                                      }
                                      <div className='spacer'/>
                                      {
                                        lock ?
                                        <div className={`box ${rightShapeColor}`}/> :
                                        <div onClick={() => handleColor(rightColor, 'right')} className={`box ${rightShapeColor}`}/>
                                      }
                                    </div>
                                  }
                                </div> : 
                                <div>
                                  {
                                    shape === "Pentagon" ?
                                    <div>
                                      {
                                        <div className='shapes-div'>
                                          {
                                            lock ?
                                            <div className={`pentagon ${leftShapeColor}`}/> :
                                            <div onClick={() => handleColor(leftColor, 'left')} className={`pentagon ${leftShapeColor}`}/>
                                          }
                                          <div className='spacer'/>
                                          {
                                            lock ?
                                            <div className={`pentagon ${rightShapeColor}`}/> :
                                            <div onClick={() => handleColor(rightColor, 'right')} className={`pentagon ${rightShapeColor}`}/>
                                          }
                                        </div>
                                      }
                                    </div> : 
                                    <div>
                                      {
                                        <div className='shapes-div'>
                                          {
                                            lock ?
                                            <div className={`hexagon ${leftShapeColor}`}/> :
                                            <div onClick={() => handleColor(leftColor, 'left')} className={`hexagon ${leftShapeColor}`}/>
                                          }
                                          <div className='spacer'/>
                                          {
                                            lock ?
                                            <div className={`hexagon ${rightShapeColor}`}/> :
                                            <div onClick={() => handleColor(rightColor, 'right')} className={`hexagon ${rightShapeColor}`}/>
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
                <div>
                  <div className='top-div'>
                    <span><img src={SmallLogo} alt='small-logo'/></span>
                    <span>Series 1</span>
                  </div>
                  <div className='img-div'>
                    <img src={RightImg} alt='right-img'/>
                  </div>
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