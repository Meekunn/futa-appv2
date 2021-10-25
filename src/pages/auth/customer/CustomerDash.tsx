import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Logging from '../../../config/logging';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { auth } from '../../../config/firebase';
import Image from '../../../assets/image/signin.jpg';
import '../../../styles/customer/dashboard.scss';
import Header from '../../../components/Header';


const CustomerDashboard = () => {

    const history = useHistory();

    const logOut = () => {
    signOut(auth)
    .then((result:any) => {
        console.log('Signed out!')
        Logging.info(result)
        history.push('/MainPage')
    }).catch((error: any) => {
        // An error happened.
        console.log('Error in signing out')
    });
   } 

    return(
        <div>
        <Header />
        <Container maxWidth='sm'>
            <Box>
                <div className='wrapper'>
                    <div className='heading'>
                        <div className='img-container'>
                            <img src={Image} />
                        </div>
                        <h1>Hi, Adedamola</h1>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            disabled
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="First Name"
                            defaultValue="Adedamola"
                            variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            disabled
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="Last Name"
                            defaultValue="Orofin"
                            variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            disabled
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="Email"
                            defaultValue="orofinadedamola@gmail.com"
                            variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            disabled
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="Phone Number"
                            defaultValue="09064877285"
                            variant="standard"
                            />
                        </Grid>
                    </Grid>
                    <div className='others'>
                        <a><li>Change Password</li></a>
                        <a><li>Report</li></a>
                        <button className='log-out'
                        onClick={()=>logOut()}><Link to='/'>Logout</Link></button>
                    </div>
                </div>
            </Box>
        </Container>
        </div>
    )
}

export default CustomerDashboard