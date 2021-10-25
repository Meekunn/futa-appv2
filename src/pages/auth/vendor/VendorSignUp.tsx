import React from 'react';
import { FC , useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../../../config/firebase';
import Logging from '../../../config/logging';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import '../../../styles/vendor/signup.scss';

const RegisterVendor: FC<IVendors> = props => {

    const [signUp, setSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [brandName, setBrandName] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [service, setService] = useState<string>('')


    const handleNew = async () => {
        const collectionRef = collection(db, 'customers') 
        const payload = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            brandname: brandName,
            location: location,
            services: service
        };
        const docRef = await addDoc(collectionRef, payload)
        console.log('The ID is: '+ docRef.id) 
    }

    const history = useHistory();

    const vendorSignUp = async () => {
        if(password !== confirm)
            setError('Password does not match.')

        if (error !== '')
            setError('');

        setSignUp(true);

        createUserWithEmailAndPassword(auth, email, password)
        .then((result:any) => {

            Logging.info(result);
            history.push('/CustomerDash');
            handleNew()

        })
        .catch((error:any) => {
            //Logging.error(error);

            if(error.code === 'auth/weak-password'){
                setError('Please enter a strong password')
            } 
            else if (error.code === 'auth/email-already-in-use') {
                setError('Email is already in use')
            } 
            else{
                setError('Unable to Sign Up. Try again later.')
            }

            setSignUp(false);
            setEmail('');
            setPassword('');
            setConfirm('');
            setFirstName('')
            setLastName('')
        });

        setEmail('');
        setPassword('');
        setConfirm('');
        setFirstName('')
        setLastName('')
    }

    return(
        <Container maxWidth="sm">
            <Box className='box'>
                <div className='wrapper' >
                    <div className='heading'>
                        <h1 className='typo'>Vendor Form</h1>
                    </div>
                    <form>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="fname"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                placeholder="John"
                                onChange={e=>setFirstName(e.target.value)}
                                value={firstName}
                                autoFocus
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="lname"
                                name="lastName"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                placeholder="Joe"
                                onChange={e=>setLastName(e.target.value)}
                                value={lastName}
                                autoFocus
                                />    
                            </Grid>
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="bname"
                                name="brandName"
                                required
                                fullWidth
                                id="brandName"
                                label="Brand Name"
                                placeholder="Herdibles kitchen"
                                onChange={e=>setBrandName(e.target.value)}
                                value={brandName}
                                autoFocus
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="service"
                                name="Service"
                                required
                                fullWidth
                                id="Service"
                                label="Service"
                                placeholder="Cooking"
                                onChange={e=>setService(e.target.value)}
                                value={service}
                                autoFocus
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="Location"
                                name="location"
                                required
                                fullWidth
                                id="location"
                                label="Location"
                                placeholder="South Gate"
                                onChange={e=>setLocation(e.target.value)}
                                value={location}
                                autoFocus
                                />    
                            </Grid>
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="email"
                                name="Email"
                                required
                                fullWidth
                                id="Email"
                                label="Email address"
                                placeholder="johnjoe@gmail.com"
                                autoFocus
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="current-password"
                                name="password"
                                required
                                fullWidth
                                id="password"
                                type="password"
                                label="Password"
                                placeholder="********"
                                autoFocus
                                onChange={e => setPassword(e.target.value)}
                                value={password}
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="current-password"
                                name="confirmPassword"
                                required
                                fullWidth
                                id="confirmpassword"
                                type="confirmpassword"
                                label="ConfirmPassword"
                                placeholder="********"
                                autoFocus
                                onChange={e => setConfirm(e.target.value)}
                                value={confirm}
                                /> 
                            </Grid>     
                        </Grid>
                        <button className='submit-button'
                        type="submit" onClick={()=>vendorSignUp()}
                        >Submit
                        </button>
                        <p> Already have an account?</p>
                        <Link to="/SignIn"> Login </Link>
                    </form>
                </div>
            </Box>
        </Container>
    )
}

export default RegisterVendor;