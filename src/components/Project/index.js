import React from 'react'
import './Styles/index.scss'
import Ellipse from './Images/Ellipse.png'
import sideWave from './Images/sideWave.png'
import BigCirles from './Images/Group 4.png'
import SmallCirles from './Images/Group 3.png'
import EtheriumCoin from './Images/etherium.png'
import Lock from './Images/lock.png'
import EtheriumGif from './Images/etherium.gif'
import { AiOutlineRight } from 'react-icons/ai';


function Index() {
  return (
    <div className='home-page-outer-div'>
      <img className='ellipse-img' src={Ellipse} alt='Ellipse'/>
      <img className='sideWave-img' src={sideWave} alt='sideWave'/>
      <img className='bigCircles-img' src={BigCirles} alt='BigCirles'/>
      <img className='smallCircles-img' src={SmallCirles} alt='SmallCirles'/>
      <img className='etherium-coin-img' src={EtheriumCoin} alt='EtheriumCoin'/>
      <img className='lock-img' src={Lock} alt='Lock'/>
      <img className='etherium-gif' src={EtheriumGif} alt='EtheriumGif'/>
      <div className='introduction-div'>
        <p className='intro'>Discover, and collect<br/>extraordinary<br/><span>monster</span> NFTs</p>
        <p className='discription'>Lorem ipsum dolor sit amet, consectetur<br/>adipiscing elit. Erat vel congue condimentum.</p>
        <a className='custom-button' href='/home'>Collect Now <AiOutlineRight/></a>
      </div>
    </div>
  )
}

export default Index