import React from 'react';
import { FC , useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import Logging from '../../../config/logging'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import '../../../styles/vendor/signup.scss'

const RegisterVendor = () => {
    return(
        <Container maxWidth="sm">
            <Box className='box'>
                <div className='wrapper' >
                    <div className='heading'>
                        <h1 className='typo'>Vendor Form</h1>
                    </div>
                    <form>
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="bname"
                                name="brandName"
                                required
                                fullWidth
                                id="brandName"
                                label="Brand Name"
                                placeholder="Herdibles kitchen"
                                autoFocus
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="service"
                                name="Service"
                                required
                                fullWidth
                                id="Service"
                                label="Service"
                                placeholder="Cooking"
                                autoFocus
                                />    
                            </Grid> 
                            <Grid item xs={12} sm={12} >
                                <TextField 
                                autoComplete="Location"
                                name="location"
                                required
                                fullWidth
                                id="location"
                                label="Location"
                                placeholder="South Gate"
                                autoFocus
                                />    
                            </Grid>    
                        </Grid>
                        <button className='submit-button'
                        type="submit"
                        >Submit
                        </button>
                    </form>
                </div>
            </Box>
        </Container>
    )
}

export default RegisterVendor;