import React, {SyntheticEvent, useState} from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import RoomIcon from '@material-ui/icons/Room'
import StoreIcon from '@material-ui/icons/Store'
import SearchIcon from '@material-ui/icons/Search'
import PersonIcon from '@material-ui/icons/Person'

const MainHeader =() => {

    const [value, setValue] = useState<number>(0)

    const handleChange = (event:SyntheticEvent<EventTarget>, newValue: number) => {
        setValue(newValue)
    }

    return(
        <div className='header'>
            <div className='wrapper'>
                <div className='logo'>
                    <h1><span className='style'>f</span>uta<span className='style'>K</span>onnect</h1>
                </div>
                <Tabs value={value} onChange={handleChange} aria-label="icon label tabs example">
                    <Tab icon={<RoomIcon />} label="FIND OFFICE" />
                    <Tab icon={<StoreIcon />} label="VENDORS" />
                    <Tab icon={<SearchIcon />} label="SEARCH" />
                    <Tab icon={<PersonIcon />} label="DASHBOARD" />
                </Tabs>
            </div>
        </div>
    )
}

export default MainHeader;