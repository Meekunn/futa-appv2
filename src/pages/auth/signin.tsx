import React, { FC, useState} from 'react'
import { Link, useHistory} from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import Logging from '../../config/logging'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import '../../styles/customer/signin.scss'

const LoginCustomer: FC<IPageProps> = props => {

    const [authenticating, setAuthenticating] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')

    const history = useHistory()

    const CustomerSignIn = () =>{
        if(error !== '') setError('')

        setAuthenticating(true)

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            Logging.info(result)
            history.push('/')
        })
        .catch(error => {
            Logging.error(error)
            setAuthenticating(false)
            setError(error.message)
        })
    }

    return(
        <Container maxWidth='sm'>
            <Box className='box'>
                <div className='wrapper'>
                    <div className='heading'>
                        <h1>Sign In</h1>
                    </div>
                    <form>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12}>
                                <TextField 
                                autoComplete="email"
                                name="Email"
                                fullWidth
                                multiline
                                id="Email"
                                label="Enter Email"
                                placeholder="johnjoe@gmail.com"
                                onChange={e=>setEmail(e.target.value)}
                                value={email}
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="new-password"
                                name="password"
                                fullWidth
                                multiline
                                id="password"
                                label="Enter Password"
                                placeholder="********"
                                onChange={e=>setPassword(e.target.value)}
                                value={password}
                                autoFocus
                                />    
                            </Grid>
                            <button className='signin-button'
                            type="submit"
                            onClick={()=>CustomerSignIn()}
                            ><Link to='/CustomerDash'> Sign Up</Link>
                            </button>
                            <p> Don't have an account?<Link to="/SignUp"> Sign Up </Link> </p>
                            <Link to='/'>Go to Home Page</Link>
                            
                            {/* <p><Link to="/"> Forgot Password? </Link></p> */}
                        </Grid> 
                    </form>
                </div>
            </Box>
        </Container>
    )
}

export default LoginCustomer