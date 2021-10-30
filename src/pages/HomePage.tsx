import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { onSnapshot, collection } from 'firebase/firestore'
import { db, auth } from '../config/firebase'
import Image from '../assets/image/signin.jpg'
import Container from '@material-ui/core/Container'
//import Box from '@material-ui/core/Box'
import '../styles/components/homepage.scss'

const HomePage = () => {

    // const [brandname, setBrandname] = useState<string>('');
    // const [phonenumber, setPhonenumber] = useState<string>('');
    // const [services, setServices] = useState<string>('');
    // const [location, setLocation] = useState<string>('');
    // const [email, setEmail] = useState<string>('')
    const [dashboard, setDashboard] = useState<any>([{brandname: '', phonenumber: '', services: '',location: '', email: '' }]);


    useEffect(() => {
        getVendors();
    }, [])

    const getVendors = () => {
        const docRefs = collection(db, 'vendors')
        onSnapshot(docRefs, (snapshot) => {
            setDashboard(snapshot.docs.map((doc) => ({...doc.data(), brandname: doc.data().brandname, phonenumber: doc.data().phonenumber, services: doc.data().services, location: doc.data().location, email: doc.data().email})))
        })
    }

    return(
        <div className='main-container'>
            <Header />
            <Container>
                {dashboard.map((dash: any) => (
                    <div className='container'>
                    <div className='profile'>
                        <div className='img-container'>
                            <img src={Image} />
                        </div>
                        <div className='sub-wrapper'>
                            <h1>{dash.brandname}</h1>
                            <p>{dash.location}</p>
                            <p>{dash.services}</p>
                            <div className='contacts'>
                                <p>{dash.phonenumber}</p>
                                <p>{dash.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </Container>
        </div>
    )
}

export default HomePage;