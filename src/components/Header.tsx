import React from 'react'
import { Link } from 'react-router-dom'
import RoomIcon from '@material-ui/icons/Room'
import StoreIcon from '@material-ui/icons/Store'
import SearchIcon from '@material-ui/icons/Search'
import PersonIcon from '@material-ui/icons/Person'
import '../styles/components/header.scss'

const Header =() => {

    return(
        <div className='header'>
            <div className='header-wrapper'>
                <div className='logo'>
                    <h1><span className='style'>f</span>uta<span className='style'>K</span>onnect</h1>
                </div>
                <div className='nav-bar'>
                    <div className='tabs'>
                        <Link to='/' className='a-link'><RoomIcon/><li>FIND OFFICE</li></Link>
                    </div>
                    <div className='tabs'>
                        <Link to='/HomePage' className='a-link'><StoreIcon/><li>VENDORS</li></Link>
                    </div>
                    <div className='tabs'>
                        <Link to='/Search' className='a-link'><SearchIcon/><li>SEARCH</li></Link>
                    </div>
                    <div className='tabs'>
                        <Link to='/CustomerDash' className='a-link'><PersonIcon/><li>DASHBOARD</li></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;