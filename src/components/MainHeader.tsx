//import React from 'react';
import { Link } from 'react-router-dom'
import '../styles/components/mainheader.scss'

const MainHeader = () => {

    return(
        <div className='mainheader'>
            <div className='mainheader-wrapper'>
                <div className='logo'>
                    <h1><span className='style'>F</span>uta<span className='style'>K</span>onnect</h1>
                </div>
                <div className='nav-bar'>
                    <a href="/" className='link'><li>About</li></a>
                    <a href="/" className='link'><li>Contact</li></a>
                    <button className='button'><Link to='/CustomerSignIn'style={{backgroundColor: '#fffdfd', color: '#000', fontSize:'17px'}} className='btn-link'>Sign In</Link></button>
                    <button className='button'><Link to='/CustomerSignUp' style={{backgroundColor: '#fffdfd', color: '#000', fontSize:'17px'}} className='btn-link'>Sign Up</Link></button>
                </div>
            </div>
        </div>
    )
}

export default MainHeader;