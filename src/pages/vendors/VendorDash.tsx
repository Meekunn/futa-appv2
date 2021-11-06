import { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../../config/firebase'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import EditIcon from '@material-ui/icons/Edit'
import Image from '../../assets/image/signin.jpg'
import Header from '../../components/Header'
import '../../styles/pages/dashboard.scss'


const VendorDashboard = () => {

    const [dashboard, setDashboard] = useState<any>({})
    const [mail, setMail] = useState<string>('')
    const [fName, setFName] = useState<string>('')
    const [lName, setLName] = useState<string>('')
    const [pNumber, setPNumber] = useState<string>('')
    const [bName, setBName] = useState<string>('')
    const [getLocation, setGetLocation] = useState<string>('')
    const [getServices, setGetServices] = useState<string>('')
    const [getBio, setGetBio] = useState<string>('')

    const history = useHistory()

        
    useEffect(() => {
        userOnline()
    },[])

    const userOnline = () => {
        onAuthStateChanged (auth, async (user: any) => {
            if(user){
                const uid = user.uid
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
        setGetBio(docData.bio)
    }
    

    const logOut = () => {
    signOut(auth)
    .then((result:any) => {
        history.replace('/VendorSignIn')
    }).catch((error: any) => {
        console.log('Error in signing out')
    })
   } 

    return(
        <div style={{backgroundColor: '#000000'}}>
        <Header />
            <Box style={{backgroundColor: '#000000', borderRadius: '15px', margin: '20px'}}>
                <div className='dash-wrapper'>
                    <div className='dash-heading'>
                        <div className='img-container'>
                            <img src={Image} />
                            <Link to={{
                                pathname: "/VendorEdit",
                                state: dashboard 
                            }} className='edit-link'><EditIcon /></Link>
                        </div>
                        <h1>Hi, {fName}</h1>
                    </div>
                    <div className='form-container'>
                        <div>
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
                        </div>
                        <div>
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
                        </div>
                        <div>
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
                        </div>
                        <div>
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
                        </div>
                        <div>
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
                        </div>
                        <div>
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
                        </div>
                        <div>
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
                        </div>
                        <div>
                            <TextField
                            InputProps={{
                                readOnly: true,
                            }}
                            fullWidth
                            className='textfield'
                            id="standard-disabled"
                            label="Bio"
                            variant="standard"
                            value={getBio}
                            />
                        </div>
                    </div>
                    <div className='others'>
                        <Link to='/ChangePass' style={{textDecoration: 'none'}} className='other-link'><li>Change Password</li></Link>
                        <Link to='' style={{textDecoration: 'none'}} className='other-link'><li>Report</li></Link>
                        <button className='log-out'
                        onClick={logOut}>Logout</button>
                    </div>
                </div>
            </Box>
        </div>
    )
}

export default VendorDashboard