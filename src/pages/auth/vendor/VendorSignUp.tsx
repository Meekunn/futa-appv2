import React from 'react'
import { FC , useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { db, auth } from '../../../config/firebase'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import '../../../styles/pages/signup.scss'

const RegisterVendor: FC<IVendors> = props => {

    const [signUp, setSignUp] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [brandname, setBrandname] = useState<string>('')
    const [phonenumber, setPhonenumber] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [services, setServices] = useState<string>('')
    const [showpass, setShowpass] = useState<boolean>(true)
    const [showconfirm, setShowconfirm] = useState<boolean>(true)

    const history = useHistory()

    const switchToCustomer = () => {
        history.replace('/CustomerSignUp')
    }

    const handleShowPassword = () => {
        setShowpass(!showpass)
    }
    const handleShowConfirm = () => {
        setShowconfirm(!showconfirm)
    }

    const handleNew = async (id: any) => {
        const docRef = doc(db, "vendors", id) 
        const payload = {
            firstname,
            lastname,
            email,
            phonenumber,
            brandname,
            location,
            services
        }
        const setDocRef = await setDoc(docRef, payload)
    }

    const verifyEmail = (user: any) => {
        if(user) {
            sendEmailVerification(user)
            history.push('/verifyemail')
        }
    }

    const vendorSignUp = async (e: any) => {
        e.preventDefault()

        if(password !== confirm)
            setError('Password does not match.')
            alert('Password does not match')

        if (error !== '')
            setError('')

        setSignUp(true)

        createUserWithEmailAndPassword(auth, email, password)
        .then( async (result:any) => {
            const user = auth.currentUser
            if (user){verifyEmail(user)
                await handleNew(result.user.uid)
                if (user.emailVerified){
                    history.replace('/VendorDash')
                } 
                else {
                    history.replace('/verifyemail')
                }
            }
        })
        .catch((error:any) => {

            if(error.code === 'auth/weak-password'){
                setError('Please enter a strong password')
                alert('Please enter a strong password')
            } 
            else if (error.code === 'auth/email-already-in-use') {
                setError('Email is already in use')
                alert('Email is already in use')
            } 
            else{
                setError('Unable to Sign Up. Try again later.')
                alert('Oops, Try again later')
            }

            setSignUp(false)
            setEmail('')
            setPassword('')
            setConfirm('')
            setFirstname('')
            setLastname('')
            setBrandname('')
            setLocation('')
            setServices('')
            setPhonenumber('')
        })

        setEmail('')
        setPassword('')
        setConfirm('')
        setFirstname('')
        setLastname('')
        setBrandname('')
        setLocation('')
        setServices('')
        setPhonenumber('')
    }

    return(
        <Container maxWidth="sm">
            <Box sx={{ width: 500, bgcolor: '#fffdfd', borderRadius: 20, display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                <div className='signup-wrapper' >
                    <div className='signup-heading'>
                        <h1 className='signup-header'>Sign Up</h1>
                    </div>
                    <div className='form'>
                        <Grid container spacing={1} className='big-grid'>
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}} >
                                <TextField 
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete="bname"
                                name="brandName"
                                required
                                fullWidth
                                id="brandName"
                                label="Brand Name"
                                placeholder="Herdibles Kitchen"
                                onChange={e=>setBrandname(e.target.value)}
                                value={brandname}
                                autoFocus
                                />    
                            </Grid> 
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
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}} >
                                <TextField 
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete="location"
                                name="Location"
                                fullWidth
                                id="location"
                                label="Location"
                                placeholder="South"
                                onChange={e=>setLocation(e.target.value)}
                                value={location}
                                autoFocus
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}} >
                                <TextField 
                                style= {{backgroundColor: '#fffdfd' }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                autoComplete="service"
                                name="services"
                                fullWidth
                                id="services"
                                label="Services"
                                placeholder="Cooking"
                                onChange={e=>setServices(e.target.value)}
                                value={services}
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
                                <FormControl style={{ width: '100%', backgroundColor: '#fffdfd'}} >
                                    <InputLabel htmlFor="standard-adornment-password" shrink={true} >Password</InputLabel>
                                    <Input
                                    style= {{backgroundColor: '#fffdfd' }}
                                    id="standard-adornment-password"
                                    type={showconfirm? 'password': 'text'}
                                    placeholder="********"
                                    required
                                    onChange={e=>setPassword(e.target.value)}
                                    value={password}
                                    autoFocus
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <button
                                            style={{padding: '5px', backgroundColor: '#fffdfd', outline: 'none', border: 'none'}}
                                            onClick={() => handleShowConfirm()}
                                            >{showconfirm? <Visibility /> : <VisibilityOff />}
                                            </button>
                                        </InputAdornment>
                                    }
                                    />
                                </FormControl> 
                            </Grid> 
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}} >
                                <FormControl style={{ width: '100%', backgroundColor: '#fffdfd'}} >
                                    <InputLabel htmlFor="standard-adornment-password" shrink={true} >Confirm Password</InputLabel>
                                    <Input
                                    style= {{backgroundColor: '#fffdfd' }}
                                    id="standard-adornment-password"
                                    type={showpass? 'password': 'text'}
                                    placeholder="********"
                                    required
                                    onChange={e=>setConfirm(e.target.value)}
                                    value={confirm}
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
                        </Grid>
                        <button className='signup-button'
                        onClick={vendorSignUp}
                        disabled={signUp}
                        >Sign Up
                        </button>
                        <button className='signup-button' onClick={switchToCustomer}>Customer?</button>
                        <p>Already have an account?<Link to="/VendorSignIn" className='p-link'> Sign In</Link></p>
                        <div className='links'>
                            <Link to='/' className='nav-link'>&#8592 Go to Home Page</Link>
                        </div>
                    </div>
                </div>
            </Box>
        </Container>
    )
}

export default RegisterVendor

