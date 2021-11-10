import React, {useState} from 'react'
import { Redirect, useHistory, Link } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { updatePassword } from 'firebase/auth'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import '../../styles/pages/changepass.scss'

const ChangePassword = () => {

    const [changing, setChanging] = useState<boolean>(false)
    const [password, setPassword] = useState<string>('')
    const [old, setOld] = useState<string>('')
    const [confirm, setConfirm] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [showpass, setShowpass] = useState<boolean>(true)
    const [showconfirm, setShowconfirm] = useState<boolean>(true)
    const [showold, setShowold] = useState<boolean>(true)

    const history = useHistory()

    const handleShowNew = () => {
        setShowpass(!showpass)
    }
    const handleShowConfirm = () => {
        setShowconfirm(!showconfirm)
    }
    const handleShowOld = () => {
        setShowold(!showold)
    }

    const changePasswordRequest = () => {
        if (password !== confirm)
        {
            setError('Make sure your passwords are matching')
            return
        }

        if (error !== '') setError('')

        setChanging(true)

        const user = auth.currentUser
        if (user){
            updatePassword(user, password)
            .then(() => {
                alert('Password change successful.')
                history.push('/')
            })
            .catch((error: any) => {
                alert(error)
                setChanging(false)
                setError(error.message)
            })
        }
    }

    if (auth.currentUser?.providerData[0]?.providerId !== 'password')
        return <Redirect to="/" />

    return(
        <Container maxWidth="sm">
            <Box sx={{ width: 500, bgcolor: '#fffdfd', borderRadius: 20, display: 'flex',justifyContent: 'center', alignItems: 'center' }}>
                <div className='change-pass-wrapper' >
                    <div className='change-pass-heading'>
                        <h1 className='change-pass-header'>Change Password</h1>
                    </div>
                    <div className='form'>
                        <Grid container spacing={1} className='big-grid'>
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}}>
                                <FormControl style={{ width: '100%', backgroundColor: '#fffdfd'}} >
                                    <InputLabel htmlFor="standard-adornment-password" shrink={true} >Old Password</InputLabel>
                                    <Input
                                    style= {{backgroundColor: '#fffdfd' }}
                                    id="standard-adornment-password"
                                    type={showold? 'password': 'text'}
                                    placeholder="********"
                                    required
                                    onChange={e=>setOld(e.target.value)}
                                    value={old}
                                    autoFocus
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <button
                                            style={{padding: '5px', backgroundColor: '#fffdfd', outline: 'none', border: 'none'}}
                                            onClick={handleShowOld}
                                            >{showold? <Visibility /> : <VisibilityOff />}
                                            </button>
                                        </InputAdornment>
                                    }
                                    />
                                </FormControl> 
                            </Grid> 
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}}>
                                <FormControl style={{ width: '100%', backgroundColor: '#fffdfd'}} >
                                    <InputLabel htmlFor="standard-adornment-password" shrink={true} >New Password</InputLabel>
                                    <Input
                                    style= {{backgroundColor: '#fffdfd' }}
                                    id="standard-adornment-password"
                                    type={showpass? 'password': 'text'}
                                    placeholder="********"
                                    required
                                    onChange={e=>setPassword(e.target.value)}
                                    value={password}
                                    autoFocus
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <button
                                            style={{padding: '5px', backgroundColor: '#fffdfd', outline: 'none', border: 'none'}}
                                            onClick={handleShowNew}
                                            >{showpass? <Visibility /> : <VisibilityOff />}
                                            </button>
                                        </InputAdornment>
                                    }
                                    />
                                </FormControl> 
                            </Grid> 
                            <Grid item xs={12} sm={12} className='grid' style={{backgroundColor: '#fffdfd'}} >
                                <FormControl style={{ width: '100%', backgroundColor: '#fffdfd'}} >
                                    <InputLabel htmlFor="standard-adornment-password" shrink={true} >Confirm New Password</InputLabel>
                                    <Input
                                    style= {{backgroundColor: '#fffdfd' }}
                                    id="standard-adornment-password"
                                    type={showconfirm? 'password': 'text'}
                                    placeholder="********"
                                    required
                                    onChange={e=>setConfirm(e.target.value)}
                                    value={confirm}
                                    autoFocus
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <button
                                            style={{padding: '5px', backgroundColor: '#fffdfd', outline: 'none', border: 'none'}}
                                            onClick={() => handleShowConfirm()}
                                            >{showconfirm? <Visibility /> : <VisibilityOff />}
                                            </button>
                                        </InputAdornment>
                                    }
                                    />
                                </FormControl> 
                            </Grid> 
                        </Grid>
                        <button className='change-button'
                        onClick={changePasswordRequest}
                        disabled={changing}
                        style={{marginTop: '5px'}}
                        >Change Password
                        </button>
                        <div className='links'>
                            <Link to='/' className='nav-link'>&#8592 Home Page</Link>
                        </div>
                    </div>
                </div>
            </Box>
        </Container>
    )
}

export default ChangePassword