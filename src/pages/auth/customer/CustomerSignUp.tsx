import React from 'react';
import { FC , useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { db, auth } from '../../../config/firebase'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import '../../../styles/customer/signup.scss'
// import InputAdornment from '@material-ui/core/InputAdornment'
// import IconButton from '@material-ui/core/IconButton'
// import Visibility from '@material-ui/icons/Visibility'
// import VisibilityOff from '@material-ui/icons/VisibilityOff'


const RegisterCustomer: FC<IPageProps> = (props: any) => {

    const [signUp, setSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [phonenumber, setPhonenumber] = useState<string>('')

    const history = useHistory();

    const switchToVendor = () => {
        history.replace('/VendorSignUp')
        console.log('switched to vendor!')
    }

    const handleNew = async (id: any) => {
        const docRef = doc(db, "customers", id) 
         const payload = {
            firstname,
            lastname,
            email,
            phonenumber,
            password
        };
        const setDocRef = await setDoc(docRef, payload)
    }


    const customerSignUp = (e: any) => {
        e.preventDefault();

        if(password !== confirm)
            setError('Password does not match.')

        if (error !== '')
            setError('');

        setSignUp(true);
        createUserWithEmailAndPassword(auth, email, password)
        .then( async (result:any) => {   
            await handleNew(result.user.uid);
            history.replace('/CustomerDash'); 
        })
        .catch((error:any) => {
            //Logging.error(error);

            if(error.code === 'auth/weak-password'){
                setError('Please enter a strong password')
                //alert('weak pass')
            } 
            else if (error.code === 'auth/email-already-in-use') {
                setError('Email is already in use')
            } 
            else{
                setError('Unable to Sign Up. Try again later.')
                console.log({error})
            }

            setSignUp(false);
            setEmail('');
            setPassword('');
            setConfirm('');
            setFirstname('')
            setLastname('')
            setPhonenumber('')
        });

        setEmail('');
        setPassword('');
        setConfirm('');
        setFirstname('')
        setLastname('')
        setPhonenumber('')
    }


    
    return(
        <Container maxWidth="sm">
            <Box sx={{ width: 450, bgcolor: '#fffdfd', borderRadius: 20, display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                <div className='signup-wrapper' >
                    <div className='signup-heading'>
                        <h1>Sign Up</h1>
                    </div>
                    <div className='form'>
                        <Grid container spacing={1} className='big-grid'>
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}} >
                                <TextField 
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete="fname"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                placeholder="John"
                                onChange={e=>setFirstname(e.target.value)}
                                value={firstname}
                                autoFocus
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}}>
                                <TextField
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }} 
                                autoComplete="lname"
                                name="lastName"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                placeholder="Joe"
                                onChange={e=>setLastname(e.target.value)}
                                value={lastname}
                                autoFocus
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}}>
                                <TextField 
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete="phonenumber"
                                name="phoneNumber"
                                fullWidth
                                required
                                id="phoneNumber"
                                label="Phone Number"
                                placeholder="08012345679"
                                onChange={e=>setPhonenumber(e.target.value)}
                                value={phonenumber}
                                autoFocus
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}} >
                                <TextField 
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}}>
                                <TextField 
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete="current-password"
                                name="password"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                type='password'
                                placeholder="********"
                                autoFocus
                                onChange={e=> setPassword(e.target.value)}
                                value={password}
                                // onChange={e => {setPassword(e.target.value); handleChange('password')}}
                                //value={values.password}
                                //type={values.showPassword ? 'text' : 'password'}
                                // endAdornment={
                                //     <InputAdornment position="end">
                                //       <IconButton
                                //         aria-label="toggle password visibility"
                                //         onClick={handleClickShowPassword}
                                //         onMouseDown={handleMouseDownPassword}
                                //         edge="end"
                                //       >
                                //         {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                //       </IconButton>
                                //     </InputAdornment>
                                //   }
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}} >
                                <TextField 
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete="current-password"
                                name="confirmPassword"
                                required
                                fullWidth
                                id="confirmpassword"
                                type="password"
                                label="Confirm Password"
                                placeholder="********"
                                autoFocus
                                onChange={e => setConfirm(e.target.value)}
                                value={confirm}
                                /> 
                            </Grid> 
                        </Grid>
                        <button className='signup-button'
                        onClick={customerSignUp}
                        >Sign Up
                        </button>
                        <button className='signup-button' onClick={switchToVendor}>Vendor?</button>
                        <p>Already have an account?<Link to="/CustomerSignIn"> Sign In</Link></p>
                        <div className='links'>
                            <Link to='/'>&#8592; Go to Home Page</Link>
                        </div>
                    </div>
                </div>
            </Box>
        </Container>
    )
}

export default RegisterCustomer;


// export default function InputAdornments () {
//     const [values, setValues] = useState<State>({
//       password: '',
//       showPassword: false,
//     });

//     const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
//         setValues({ ...values, [prop]: event.target.value });
//     };

//     const handleClickShowPassword = () => {
//         setValues({
//         ...values,
//         showPassword: !values.showPassword,
//         });
//     }
// }

                                
// const handleMouseDownPassword = (event:MouseEvent<HTMLButtonElement>) => {
    //event.preventDefault();
 //};