import React,{ useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { doc,setDoc } from 'firebase/firestore'
import { db, auth } from '../../config/firebase'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import '../../styles/pages/edit.scss'

const EditVendorInfo = () => {

    const [email, setEmail] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [phonenumber, setPhonenumber] = useState<string>('')
    const [brandname, setBrandname] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [services, setServices] =useState<string>('')
    const [bio, setBio] = useState<string>('')
    
    const history = useHistory()
    
    useEffect(() => {

        const state = history.location.state as  IVendorBasic | undefined
        setEmail(state?.email || '')
        setFirstname(state?.firstname || '')
        setLastname(state?.lastname || '')
        setPhonenumber(state?.phonenumber || '')
        setBrandname(state?.brandname || '')
        setLocation(state?.location || '')
        setServices(state?.services || '')
        setBio(state?.bio || '')
    }, [] )


    const handleEdit = async () => {
        const user = auth.currentUser
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
        }
        const setDocRef = await setDoc(docRef, payload, {merge: true})
        }
        history.push('/VendorDash')
    }

    return(
        <div className='edit-wrapper'>
            <Box style={{backgroundColor: '#000000', borderRadius: '15px', margin: '20px'}}>
                <h1>Edit Information</h1>
                <div className='edit-container'>
                <div>
                    <TextField
                    InputLabelProps={{className:'label'}}
                    InputProps={{className: 'input'}}
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Brand Name"
                    variant="standard"
                    onChange={e=>setBrandname(e.target.value)}
                    value={brandname}
                    />
                </div>
                <div>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="First Name"
                    variant="standard"
                    onChange={e=>setFirstname(e.target.value)}
                    value={firstname}
                    />
                </div>
                <div>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Last Name"
                    variant="standard"                           
                    onChange={e=>setLastname(e.target.value)}
                    value={lastname}
                    />
                </div>
                <div>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Email"
                    variant="standard"                         
                    onChange={e=>setEmail(e.target.value)}
                    value={email}
                    />
                </div>
                <div>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Phone Number"
                    variant="standard"
                    onChange={e=>setPhonenumber(e.target.value)}
                    value={phonenumber}
                    />
                </div>
                <div>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Location"
                    variant="standard"
                    onChange={e=>setLocation(e.target.value)}
                    value={location}
                    />
                </div>
                <div>
                    <TextField
                    fullWidth
                    className='textfield'
                    id="standard-disabled"
                    label="Services"
                    variant="standard"
                    onChange={e=>setServices(e.target.value)}
                    value={services}
                    />
                </div>
                <div>
                    <TextField
                    fullWidth
                    multiline
                    className='textfield'
                    id="standard-disabled"
                    label="Bio"
                    variant="standard"
                    onChange={e=>setBio(e.target.value)}
                    value={bio}
                    />
                </div>
            </div>
            <button onClick={handleEdit} className='save-btn'>Save</button>
            <Link to='/VendorDash' className='back-link'><li>Back to Dashboard</li></Link>
            </Box>
        </div>
    )
}

export default EditVendorInfo