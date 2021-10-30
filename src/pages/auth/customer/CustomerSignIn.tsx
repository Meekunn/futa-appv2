import React, { FC, useState} from 'react'
import { Link, useHistory} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../config/firebase'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import '../../../styles/customer/signin.scss'

const LoginCustomer: FC<IPageProps> = props => {

    const [authenticating, setAuthenticating] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const history = useHistory()

    const switchToVendor = () => {
        history.replace('/VendorSignIn')
    }

    const customerSignIn = (e: any) =>{
        e.preventDefault();
        if (error !== '') setError('');

        setAuthenticating(true);

        signInWithEmailAndPassword(auth, email, password)
        .then((result:any) => {
            //Logging.info(result);
            history.push('/CustomerDash');
            console.log('succesful', {result})
        })
        .catch((error:any) => {
            //Logging.error(error);
            setAuthenticating(false);
            setError(error.message);
            console.log('unsuccessful', {error})
        });
    }


    return(
        <Container maxWidth='sm'>
            <Box sx={{ width: 450, mt: 10, bgcolor: '#fffdfd', borderRadius: 20, display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                <div className='signin-wrapper'>
                    <div className='signin-heading'>
                        <h1>Sign In</h1>
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
                                <TextField 
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete="new-password"
                                name="password"
                                fullWidth
                                id="password"
                                type='password'
                                label="Enter Password"
                                placeholder="********"
                                onChange={e=>setPassword(e.target.value)}
                                value={password}
                                autoFocus
                                />    
                            </Grid>
                            <button className='signin-button'
                            onClick={customerSignIn}
                            >Sign In
                            </button>
                            <button className='signin-button' onClick={switchToVendor}>Sign In as Vendor</button>
                            <p>Don't have an account?<Link to="/CustomerSignUp"> Sign Up</Link></p>
                            <div className='links'>
                                <Link to='/'>&#8592; Go to Home Page</Link>
                                <Link to=''>Forgot Password?</Link>
                            </div>
                        </Grid> 
                    </div>
                </div>
            </Box>
        </Container>
    )
}

export default LoginCustomer