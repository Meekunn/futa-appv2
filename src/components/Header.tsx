import React from 'react';
import '../styles/components/header.scss'

const Header = () => {
    return(
        <div className='header'>
            <div className='wrapper'>
            <div className='logo'>
                <h1><span className='style'>f</span>uta<span className='style'>K</span>onnect</h1>
            </div>
            <div className='nav-bar'>
            <a href="#"><li>About</li></a>
            <a href="#"><li>Contact</li></a>
            <button>Sign In</button>
            <button>Sign Up</button>
        </div>
        </div>
        </div>
    )
}

export default Header;