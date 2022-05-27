import React, { useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import Navbarr from '../Components/Navbarr';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Components/firebase-config'
import { useNavigate } from "react-router-dom";
import './Login.css'


function Register() {

    const navigate = useNavigate();
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('')

    const register = async () => {
        try{
            if (registerPassword === registerPasswordConfirm) {
                const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
                var axios = require('axios');
                var config = {
                method: 'post',
                url: 'https://web-server-area.herokuapp.com/register?user=' + user.user.uid + '',
                headers: { }
                };

                axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    console.log(user.user.uid)
                    localStorage.setItem('user', JSON.stringify(user))
                    navigate("/area")
                })
                .catch(function (error) {
                console.log(error);
                });
                // console.log(user)
                // navigate("/area")
            }
        } catch (error) {
            console.log(error.message);
        }

    }

  return (
      <div>
          <Navbarr/>
            <div className='loginpage'>
                <Row style={{ position: 'fixed', top: '50%', left:'50%', transform:'translate(-50%, -50%)' }}>
                    <Card style={{ width: '30rem', borderRadius: '0px'  }}>
                        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                        <Card.Body>
                        <Card.Title style={{ textAlign: 'center' }}>Register</Card.Title>
                        <Card.Text>
                            {/* Some quick example text to build on the card title and make up the bulk of
                            the card's content. */}
                            <input className='logininput' type='text' placeholder='Email' value={registerEmail} onChange={(e) => {setRegisterEmail(e.target.value)}} />
                            <input className='logininput' type='password' placeholder='Password' value={registerPassword} onChange={(e) => {setRegisterPassword(e.target.value)}}/>
                            <input className='logininput' type='password' placeholder='Confirm password' value={registerPasswordConfirm} onChange={(e) => {setRegisterPasswordConfirm(e.target.value)}}/>
                        </Card.Text>
                        <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                            <button className='loginbutton' onClick={register}>Register</button>
                        </div>
                        {/* <Row style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '10px' }}>
                            <Col><hr style={{ width: '100%' }}/></Col>
                            <Col md={2}>or</Col>
                            <Col><hr style={{ width: '100%' }}/></Col>
                        </Row> */}
                        {/* <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                            <button className='logingooglebutton'>
                                <FcGoogle style={{ fontSize: '25px', marginRight: '20px' }}/>
                                Register with Google
                            </button>
                        </div>
                        <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                            <button className='logingithubbutton'>
                                <AiFillGithub style={{ fontSize: '25px', marginRight: '25px' }}/>
                                Register with Github
                            </button>
                        </div> */}
                        </Card.Body>
                    </Card>
                </Row>
            </div>
        </div>
  );
}

export default Register;