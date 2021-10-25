import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/mainheader.scss';

const Header = () => {

    return(
        <div className='mainheader'>
            <div className='mainheader-wrapper'>
                <div className='logo'>
                    <h1><span className='style'>f</span>uta<span className='style'>K</span>onnect</h1>
                </div>
                <div className='nav-bar'>
                    <a href="#"><li>About</li></a>
                    <a href="#"><li>Contact</li></a>
                    <button><Link to='/SignIn'>Sign In</Link></button>
                    <button><Link to='/SignUp'>Sign Up</Link></button>
                </div>
            </div>
        </div>
    )
}

export default Header;