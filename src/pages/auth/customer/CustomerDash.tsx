import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../config/firebase';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save'
import EditIcon from '@material-ui/icons/Edit'
import Image from '../../../assets/image/signin.jpg';
import '../../../styles/customer/dashboard.scss';
import Header from '../../../components/Header';


const CustomerDashboard = () => {

    const [dashboard, setDashboard] = useState<any>({});
    const [mail, setMail] = useState<string>('');
    const [fName, setFName] = useState<string>('');
    const [lName, setLName] = useState<string>('');
    const [pNumber, setPNumber] = useState<string>('');

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
                console.log('no info found')
            }
        })
    }

    const getUserInfo = async (id: any) => {
        const docRef = doc(db, 'customers', id)
        const docSnap = await getDoc(docRef)
        const docData = docSnap.data()
        if(!docData) return
        setDashboard(docData)
        setMail(docData.email)
        setFName(docData.firstname)
        setLName(docData.lastname)
        setPNumber(docData.phonenumber)
    }
    

    const logOut = () => {
    signOut(auth)
    .then((result:any) => {
        history.replace('/CustomerSignIn')
    }).catch((error: any) => {
        console.log('Error in signing out')
    });
   } 

    return(
        <div>
        <Header />
        <Container maxWidth='sm'>
            <Box sx={{ width: 500, bgcolor: 'rgb(203 211 244)', borderRadius: 20, display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                <div className='dash-wrapper'>
                    <div className='dash-heading'>
                        <div className='img-container'>
                            <img src={Image} />
                        </div>
                        <h1>Hi, {fName}</h1>
                        <Link to={{
                            pathname: "/CustomerEdit",
                            state: dashboard 
                        }}> <EditIcon/> 
                        </Link>
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

export default CustomerDashboard;


                    