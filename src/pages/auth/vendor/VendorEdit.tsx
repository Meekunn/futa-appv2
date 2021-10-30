import React,{ useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { doc,setDoc } from 'firebase/firestore';
import { db, auth } from '../../../config/firebase';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const EditVendorInfo = () => {

    const [email, setEmail] = useState<string>('');
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [phonenumber, setPhonenumber] = useState<string>('')
    const [brandname, setBrandname] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [services, setServices] =useState<string>('')
    
    const history = useHistory();
    
    useEffect(() => {

        const state = history.location.state as  IVendorBasic | undefined
        setEmail(state?.email || '')
        setFirstname(state?.firstname || '')
        setLastname(state?.lastname || '')
        setPhonenumber(state?.phonenumber || '')
        setBrandname(state?.brandname || '')
        setLocation(state?.location || '')
        setServices(state?.services || '')

    }, [] )


    const handleEdit = async () => {
        const user = auth.currentUser;
        if(user !== null){
            const uid = user.uid
            const docRef = doc(db, "vendors", uid) 
            const payload = {
            firstname,
            lastname,
            email,
            phonenumber,
            brandname,
            location,
            services
        };
        const setDocRef = await setDoc(docRef, payload, {merge: true})
        }
    }

    return(
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Brand Name"
                    variant="standard"
                    onChange={e=>setBrandname(e.target.value)}
                    value={brandname}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="First Name"
                    variant="standard"
                    onChange={e=>setFirstname(e.target.value)}
                    value={firstname}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Last Name"
                    variant="standard"                           
                    onChange={e=>setLastname(e.target.value)}
                    value={lastname}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Email"
                    variant="standard"                         
                    onChange={e=>setEmail(e.target.value)}
                    value={email}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Phone Number"
                    variant="standard"
                    onChange={e=>setPhonenumber(e.target.value)}
                    value={phonenumber}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Location"
                    variant="standard"
                    onChange={e=>setLocation(e.target.value)}
                    value={location}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Services"
                    variant="standard"
                    onChange={e=>setServices(e.target.value)}
                    value={services}
                    />
                </Grid>
            </Grid>
            <button onClick={handleEdit}><Link to='/VendorDash'>Save</Link></button>
            <Link to='/VendorDash'>Back to Dashboard</Link>
        </div>
    )
}

export default EditVendorInfo;