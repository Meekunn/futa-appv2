import React from 'react'
import { Link, useHistory} from 'react-router-dom'
import { auth } from '../../config/firebase'
import { sendEmailVerification } from 'firebase/auth'
import '../../styles/pages/forgotpass.scss'

const VerifyEmailNotification = () => {

    const history = useHistory()
    const user = auth.currentUser
    //let userOnline

    // const checkUserOnline = () => {
    //     if(user){
    //         userOnline = user
    //         return userOnline
    //     }
    // }
    
    const resendVerificationEmail =() =>  {
        if(user) {
            sendEmailVerification(user)
            history.push('/verifyEmail');
        }
    }

    return(
        <div style={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            {/* {userOnline.emailVerified? 
                <div>
                    <p className='pass-email-sent'>Verified!, Process to Login</p>
                </div> 
            :  */}
                <div>
                    <p className='pass-email-sent'>Check your Inbox for Verification Link</p>
                    <button className='forgot-btn' onClick={resendVerificationEmail}>RESEND</button>
                </div>
            {/* } */}
            <div>
                <Link to='/CustomerSignIn' className='nav-link'> Customer Login Page</Link>
                <Link to='/VendorSignIn' className='nav-link'> Vendor Login Page</Link>
            </div>    
        </div>
    )
}

export default VerifyEmailNotification