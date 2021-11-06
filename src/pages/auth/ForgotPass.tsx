import React, {useState} from 'react'
import { auth } from '../../config/firebase'
import { Link } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import '../../styles/pages/forgotpass.scss'

const ForgotPassword = () => {
    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const resetPasswordRequest = () => {
        if (error !== '') setError('');

        setSending(true);

        sendPasswordResetEmail(auth, email)
        .then(() => {
            setSent(true);
            setSending(false);
        })
        .catch((error: any) => {
            setError(error.message);
            setSending(false);
        });
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            { sent ? 
                <div>
                    <p className='pass-email-sent'>Check Your Email for a Link and Instructions</p>
                    <Link to='/' className='nav-link'>&#8592; Go to Home Page</Link>
                </div>
            :
                <Box sx={{ marginTop:'100px', width: '500px', bgcolor: '#fffdfd', borderRadius: 5, display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                <div className='forgot-wrapper'>
                <div className='forgot-heading'>
                    <h1 className='forgot-header'>Forgot Password</h1>
                </div>
                <div className='form'>
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
                </div>
                <button disabled={sending} className='forgot-btn' onClick={resetPasswordRequest}>Submit</button>
                <div className='links'>
                    <Link to='/' className='nav-link'>&#8592; Go to Home Page</Link>
                </div>
                </div>
            </Box>
            }
        </div>
    )
}

export default ForgotPassword