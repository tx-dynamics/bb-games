import React from 'react';
import './styles/styles.scss'
import LeftImg from '../Game/MainScreen/Images/left_animation.gif'
import RightImg from '../Game/MainScreen/Images/right_animation.gif'
import Logo from '../Game/MainScreen/Images/Logo.png'
import trash from './images/trash.png'
import file from './images/file.png'
import twitter from './images/twitter.png'
// import ProgressiveImage from "react-progressive-graceful-image";
import OrignalBackground from './images/background.png'
import blurImg from './images/blur_background.png'


function Index() {
    

    const handleMintNFT = () => {

    }

    const handleWhiteList = () => {
        
    }
    
    return (
        <div>
            {/* <ProgressiveImage className='background-img' src={OrignalBackground} placeholder={blurImg}>
            {(src) => (
                <img
                className='background-img'
                src={src}
                alt="sea beach"
                />
            )}
            </ProgressiveImage> */}
            <div className='landing-page-outer-div'>
                <div>
                    <div className='landing-page-inner-div'>
                        <div className='gird-layout'>
                            <div className='left-div'>
                                {/* <div className='top-div'>
                                    <span><img src={Coin} alt='coin'/></span>
                                    <span>Collect ETH Reward</span>
                                </div> */}
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
                                <div className='center-text-div'>
                                    <p>Kindly Select On Of The<br/>Following Options To Continue!</p>
                                </div>
                            </div>

                            <div className='right-div'>
                                {/* <div className='top-div'>
                                    <span><img src={SmallLogo} alt='small-logo'/></span>
                                    <span>Series 1</span>
                                </div> */}
                                <div className='img-div'>
                                    <img src={RightImg} alt='right-img'/>
                                </div>
                                {/* <div className='bottom-div'>
                                <a href='#NFT'>White List <AiOutlineRight /></a>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='center-buttons-div'>
                        <div onClick={handleMintNFT}><span>MINT YOUR NFT</span></div>
                        <span className='spacer'/>
                        <div onClick={handleWhiteList}><span>WHITE LIST</span></div>
                    </div>
                    <div className='actions-div'>
                        <div className='action'>
                            <img className='trash' src={trash} alt='trash can icon'/>
                            <p>Discard</p>
                        </div>
                        <div className='action'>
                            <img className='paper' src={file} alt='file icon'/>
                            <p>White Paper</p>
                        </div>
                        <div className='action'>
                            <img className='twitter' src={twitter} alt='twitter icon'/>
                            <p>Twitter</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;