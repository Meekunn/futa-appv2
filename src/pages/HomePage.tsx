import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { onSnapshot, collection } from 'firebase/firestore'
import { db } from '../config/firebase'
import Image from '../assets/image/signin.jpg'
import Container from '@material-ui/core/Container'
import '../styles/components/homepage.scss'

const HomePage = () => {

    const [vendors, setVendors] = useState<any>([{brandname: '', phonenumber: '', services: '',location: '', email: '', bio:'' }]);

    useEffect(() => {
        getVendors();
    }, [])

    

    const getVendors = () => {
        const docRefs = collection(db, 'vendors')
        onSnapshot(docRefs, (snapshot) => {
            setVendors(snapshot.docs.map((doc) => (
                {...doc.data(), 
                brandname: doc.data().brandname, 
                phonenumber: doc.data().phonenumber, 
                services: doc.data().services, 
                bio: doc.data().bio,
                location: doc.data().location, 
                email: doc.data().email})))
        })
    }

    return(
        <div className='main-container'>
            <Header />
            <Container>
                {vendors.map((vendor: any) => (
                    <div className='container'>
                    <div className='profile'>
                        <div className='img-container'>
                            <img src={Image} alt='profile-pic' />
                        </div>
                        <div className='sub-wrapper'>
                            <h1>{vendor.brandname}</h1>
                            <p>{vendor.location}</p>
                            <p>{vendor.services}</p>
                            <div className='contacts'>
                                <p>{vendor.phonenumber}</p>
                                <p>{vendor.email}</p>
                            </div>
                            <p>{vendor.bio}</p>
                        </div>
                    </div>
                </div>
                ))}
            </Container>
        </div>
    )
}

export default HomePage;