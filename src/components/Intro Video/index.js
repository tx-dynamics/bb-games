import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import video from './static/intro.mp4'
import './styles/styles.scss'


export default function Index() {

    const [finish, setfinish] = useState(false)

    const handleKeys = (event) => {
        console.log(event.keyCode)
        if (event.keyCode === 82 || event.keyCode === 116) {
            event.preventDefault();
        }
    }

    useEffect(() => {
        if(window.sessionStorage.getItem('initial')){
            setfinish(true)
        }else{
            window.onload = function () {               
                window.sessionStorage.setItem('initial', true) 
                document.onkeydown = handleKeys
            }
        }
    }, [])

    

    const handleVideo = () => {
        setfinish(true)
    }
    
  return (
    <div>
        {finish && (<Navigate to="/home" replace={true} />)}
        <div className='video-container'>
            <video autoPlay onEnded={() => {handleVideo()}}>
                <source src={video} type="video/mp4"/>
            </video>
        </div>
    </div>
  )
}