import React,{ useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { doc,setDoc } from 'firebase/firestore'
import { db, auth } from '../../config/firebase'
import TextField from '@material-ui/core/TextField'
import { Box } from '@material-ui/core'
import '../../styles/pages/edit.scss'

const EditCustomerInfo = () => {

    const [email, setEmail] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [phonenumber, setPhonenumber] = useState<string>('')
    
    const history = useHistory()
    
    useEffect(() => {

        const state = history.location.state as  ICustomerBasic | undefined
        setEmail(state?.email || '')
        setFirstname(state?.firstname || '')
        setLastname(state?.lastname || '')
        setPhonenumber(state?.phonenumber || '')

    },[])


    const handleEdit = async () => {
        const user = auth.currentUser
        if(user !== null){
            const uid = user.uid
            const docRef = doc(db, "customers", uid) 
            const payload = {
            firstname,
            lastname,
            email,
            phonenumber,
        }
        const setDocRef = await setDoc(docRef, payload, {merge: true})
        }
        history.push('/CustomerDash')
    }

    return(
        <div className='edit-wrapper'>
            <Box style={{backgroundColor: '#000000', borderRadius: '15px', margin: '20px'}}>
                <h1>Edit Information</h1>
                <div className='edit-container'>
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
                </div>
                <button onClick={handleEdit} className='save-btn'>Save</button>
                <Link to='/CustomerDash' className='back-link'>Back to Dashboard</Link>
            </Box>
        </div>
    )
}

export default EditCustomerInfo