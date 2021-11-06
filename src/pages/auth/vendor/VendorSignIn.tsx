import React, { FC, useState, forwardRef, SyntheticEvent} from 'react'
import { Link, useHistory} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../config/firebase'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert,{AlertProps} from '@material-ui/lab/Alert'
import '../../../styles/pages/signin.scss'

const LoginVendor: FC<IPageProps> = props => {

    const [authenticating, setAuthenticating] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [open, setOpen] = useState<boolean>(false)
    const [showpass, setShowpass] = useState<boolean>(true)

    const history = useHistory()

    const switchToCustomer = () => {
        history.replace('/CustomerSignIn')
    }

    const handleShowPassword = () => {
        setShowpass(!showpass)
    }

    const vendorSignIn = (e: any) =>{
        e.preventDefault()
        if (error !== '') setError('')

        setAuthenticating(true)

        signInWithEmailAndPassword(auth, email, password)
        .then((result:any) => {
            handleClick()
            history.replace('/VendorDash')
        })
        .catch((error:any) => {
            setAuthenticating(false)
            setError(error.message)
            alert('Incorrect Email or Password')
        })
    }

    const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
      ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
    })

    const handleClick = () => {
        setOpen(true)
    }

    const handleClose = (event?: SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
          return
        }
        setOpen(false)
    }

    return(
        <Container maxWidth='sm'>
            <Box sx={{ width: 450, mt: 10, bgcolor: '#fffdfd', borderRadius: 20, display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                <div className='signin-wrapper'>
                    <div className='signin-heading'>
                        <h1 className='signin-header'>Sign In</h1>
                    </div>
                    <div className='form'>
                        <Grid container spacing={2} className='big-grid'>
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}}>
                                <TextField 
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className='textfield'
                                autoComplete="email"
                                name="Email"
                                fullWidth
                                id="Email"
                                label="Enter Email"
                                placeholder="johnjoe@gmail.com"
                                onChange={e=>setEmail(e.target.value)}
                                value={email}
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} style={{backgroundColor: '#fffdfd'}}>
                                <FormControl style={{ width: '100%', backgroundColor: '#fffdfd'}} >
                                    <InputLabel htmlFor="standard-adornment-password" shrink={true} >Password</InputLabel>
                                    <Input
                                    style= {{backgroundColor: '#fffdfd' }}
                                    id="standard-adornment-password"
                                    type={showpass? 'password': 'text'}
                                    placeholder="********"
                                    onChange={e=>setPassword(e.target.value)}
                                    value={password}
                                    autoFocus
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <button
                                            style={{padding: '5px', backgroundColor: '#fffdfd', outline: 'none', border: 'none'}}
                                            onClick={() => handleShowPassword()}
                                            >{showpass? <Visibility /> : <VisibilityOff />}
                                            </button>
                                        </InputAdornment>
                                    }
                                    />
                                </FormControl>  
                            </Grid>
                            <button className='signin-button'
                            onClick={(e)=>vendorSignIn(e)}
                            disabled={authenticating}
                            >Sign In
                            </button>
                            <Snackbar open={open} autoHideDuration={500} onClose={handleClose}>
                                <Alert style={{ width: '100%' }} onClose={handleClose} severity="success" >
                                 Login Successful!
                                </Alert>
                            </Snackbar>
                            <button className='signin-button' onClick={switchToCustomer}>Sign In as Customer</button>
                            <p>Don't have an account?<Link to="/VendorSignUp" className='p-link'> Sign Up</Link></p>
                            <div className='links'>
                                <Link to='/' className='nav-link'>&#8592; Go to Home Page</Link>
                                <Link to='/ForgotPass' className='nav-link'>Forgot Password?</Link>
                            </div>
                        </Grid> 
                    </div>
                </div>
            </Box>
        </Container>
    )
}

export default LoginVendor