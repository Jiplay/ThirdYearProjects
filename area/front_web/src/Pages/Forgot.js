import React, { useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import Navbarr from '../Components/Navbarr';
// import { sendPasswordResetEmail } from 'firebase/auth';

import { useNavigate } from "react-router-dom";
import './Login.css'


function Forgot() {

    const navigate = useNavigate();
    const [emailResetPassword, setEmailResetPassword] = useState('')

    const forgotPassword = () =>{
        navigate("/login")
    }

    return (
        <div>
            <Navbarr/>
            <div className='loginpage'>
                <Row style={{ position: 'fixed', top: '50%', left:'50%', transform:'translate(-50%, -50%)' }}>
                    <Card style={{ width: '30rem', borderRadius: '0px'  }}>
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                            <Card.Title style={{ textAlign: 'center' }}>New password</Card.Title>
                            <Card.Text>
                                {/* Some quick example text to build on the card title and make up the bulk of
                                the card's content. */}
                                <input className='logininput' type='text' placeholder='Email' value={emailResetPassword} onChange={(e) => {setEmailResetPassword(e.target.value)}}/>
                                {/* <input className='logininput' type='password' placeholder='Confirm New Password' value={confirmNewPasswword} onChange={(e) => {setConfirmNewPassword(e.target.value)}}/> */}
                            </Card.Text>
                            <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                                <button className='loginbutton' onClick={forgotPassword} >Change Password</button>
                            </div>
                        </Card.Body>
                    </Card>
                </Row>
            </div>
        </div>
    );
}

export default Forgot;