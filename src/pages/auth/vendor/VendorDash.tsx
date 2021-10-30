import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../config/firebase';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Image from '../../../assets/image/signin.jpg';
import Header from '../../../components/Header';
import '../../../styles/customer/dashboard.scss';


const VendorDashboard = () => {

    const [dashboard, setDashboard] = useState<any>({});
    const [mail, setMail] = useState<string>('');
    const [fName, setFName] = useState<string>('');
    const [lName, setLName] = useState<string>('');
    const [pNumber, setPNumber] = useState<string>('');
    const [bName, setBName] = useState<string>('')
    const [getLocation, setGetLocation] = useState<string>('')
    const [getServices, setGetServices] = useState<string>('')

    const history = useHistory();

        
    useEffect(() => {
        userOnline()
    },[])

    const userOnline = () => {
        onAuthStateChanged (auth, async (user: any) => {
            if(user){
                const uid = user.uid;
                getUserInfo(uid)
            } else{
                return
            }
        })
    }

    const getUserInfo = async (id: any) => {
        const docRef = doc(db, 'vendors', id)
        const docSnap = await getDoc(docRef)
        const docData = docSnap.data() 
        if(!docData) return
        setDashboard(docData)
        setMail(docData.email)
        setFName(docData.firstname)
        setLName(docData.lastname)
        setPNumber(docData.phonenumber)
        setGetLocation(docData.location)
        setBName(docData.brandname)
        setGetServices(docData.services)
    }
    

    const logOut = () => {
    signOut(auth)
    .then((result:any) => {
        history.replace('/VendorSignIn')
    }).catch((error: any) => {
        console.log('Error in signing out')
    });
   } 

    return(
        <div>
        <Header />
        <Container maxWidth='sm'>
            <Box>
                <div className='dash-wrapper'>
                    <div className='dash-heading'>
                        <div className='img-container'>
                            <img src={Image} />
                            <Link to={{
                                pathname: "/VendorEdit",
                                state: dashboard 
                            }}>Edit</Link>
                        </div>
                        <h1>Hi, {fName}</h1>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="Brand Name"
                            variant="standard"
                            value={bName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="First Name"
                            variant="standard"
                            value={fName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="Last Name"
                            variant="standard"
                            value={lName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="Email"
                            variant="standard"
                            value={mail}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="Phone Number"
                            variant="standard"
                            value={pNumber}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="Location"
                            variant="standard"
                            value={getLocation}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="Services"
                            variant="standard"
                            value={getServices}
                            />
                        </Grid>
                    </Grid>
                    <div className='others'>
                        <a><li>Change Password</li></a>
                        <a><li>Report</li></a>
                        <button className='log-out'
                        onClick={logOut}>Logout</button>
                    </div>
                </div>
            </Box>
        </Container>
        </div>
    )
}

export default VendorDashboard;