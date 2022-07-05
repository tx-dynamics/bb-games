import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import video360 from './static/360.mp4'
import originalVideo from './static/intro.mp4'
import './styles/styles.css'


export default function Index() {

    const [finish, setfinish] = useState(false)

    const handleKeys = (event) => {
        console.log(event.keyCode)
        if (event.keyCode === 82 || event.keyCode === 116) {
            event.preventDefault();
        }
    }

    useEffect(() => {

        if (navigator?.connection && !!navigator?.connection?.effectiveType) {
            if (/\slow-2g|2g|3g/.test(navigator?.connection?.effectiveType)) {
                const { rtt, downlink, effectiveType,  saveData } = navigator?.connection;
                console.log(`Effective network connection type: ${effectiveType}`);
                console.log(`Downlink Speed/bandwidth estimate: ${downlink}Mb/s`);
                console.log(`Round-trip time estimate: ${rtt}ms`);
                console.log(`Data-saver mode on/requested: ${saveData}`);
                console.log(navigator?.connection?.effectiveType)
                setfinish(true)
            }else{
                const { rtt, downlink, effectiveType,  saveData } = navigator?.connection;
                console.log(`Effective network connection type: ${effectiveType}`);
                console.log(`Downlink Speed/bandwidth estimate: ${downlink}Mb/s`);
                console.log(`Round-trip time estimate: ${rtt}ms`);
                console.log(`Data-saver mode on/requested: ${saveData}`);
                console.log(navigator?.connection?.effectiveType)
            }
        }

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
            <video id='video_id' autoPlay autobuffer playsinline onEnded={() => {handleVideo()}}>
                <source id='videoSource' src={
                    navigator?.connection?.effectiveType === '4g' ? video360 : originalVideo
                } type="video/mp4"/>
                Your Browser Does Not Support HTML5 Videos.
            </video>
        </div>
    </div>
  )
}