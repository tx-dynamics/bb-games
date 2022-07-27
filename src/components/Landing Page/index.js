import React from 'react';
import './styles/styles.scss'
import LeftImg from '../Game/MainScreen/Images/left_animation.gif'
import RightImg from '../Game/MainScreen/Images/right_animation.gif'
import Logo from '../Game/MainScreen/Images/Logo.png'
import trash from './images/trash.png'
import file from './images/file.png'
import twitter from './images/twitter.png'
import ProgressiveImage from "react-progressive-graceful-image";
import OrignalBackground from './images/background.png'
import blurImg from './images/blur_background.png'
import { makeStyles } from '@material-ui/core/styles';
import {
    Modal,
    Backdrop,
    TextField,
    Fade,
    Box,
    FormHelperText,
    Button
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      border: '1px solid black',
      borderRadius: '10px',
      padding: theme.spacing(3, 10, 3),
      color: 'white'
    },
}));


function Index() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleWhiteList = () => {
        
    }
    
    return (
        <div>
            <ProgressiveImage className='background-img' src={OrignalBackground} placeholder={blurImg}>
            {(src) => (
                <img
                className='background-img'
                src={src}
                alt="sea beach"
                />
            )}
            </ProgressiveImage>
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
                        <div onClick={() => {setOpen(true)}}><span>MINT YOUR NFT</span></div>
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <Formik
                        initialValues={{
                            wallet: '',
                            userCount: ''
                        }}
                        validationSchema={Yup.object().shape({
                            wallet: Yup.string().required(),
                            userCount: Yup.string().required(),
                        })}
                        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                            setSubmitting(true)
                            console.log(values)

                            // After user enter the details process code goes here

                            handleClose()
                        }}
                    >
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values,
                            setFieldValue
                        }) => (
                            <form
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    error={Boolean(touched.wallet && errors.wallet)}
                                    fullWidth
                                    helperText={touched.wallet && errors.wallet}
                                    label="Wallet Address"
                                    margin="normal"
                                    name="wallet"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="wallet"
                                    value={values.wallet}
                                    variant="outlined"
                                />

                                <TextField
                                    error={Boolean(touched.userCount && errors.userCount)}
                                    fullWidth
                                    helperText={touched.userCount && errors.userCount}
                                    label="Count of NFT Users to MINT"
                                    margin="normal"
                                    name="userCount"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    type="userCount"
                                    value={values.userCount}
                                    variant="outlined"
                                />

                                <Box className='model-btn-div' mt={2}>
                                    <Button
                                        color="secondary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Submit
                                    </Button>
                                    {errors.submit && (
                                        <Box mt={3}>
                                            <FormHelperText error>{errors.submit}</FormHelperText>
                                        </Box>
                                    )}
                                </Box>
                            </form>
                        )}
                    </Formik>
                    
                </div>
                </Fade>
            </Modal>
        </div>
    );
}

export default Index;