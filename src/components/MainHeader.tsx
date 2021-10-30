import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/mainheader.scss';

const MainHeader = () => {

    return(
        <div className='mainheader'>
            <div className='mainheader-wrapper'>
                <div className='logo'>
                    <h1><span className='style'>F</span>uta<span className='style'>K</span>onnect</h1>
                </div>
                <div className='nav-bar'>
                    <a href="#"><li>About</li></a>
                    <a href="#"><li>Contact</li></a>
                    <Link to='/CustomerSignIn'><button>Sign In</button></Link>
                    <Link to='/CustomerSignUp'><button>Sign Up</button></Link>
                </div>
            </div>
        </div>
    )
}

export default MainHeader;