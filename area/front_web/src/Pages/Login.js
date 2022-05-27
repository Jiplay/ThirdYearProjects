import React, { useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { FcGoogle } from 'react-icons/fc'
import { AiFillGithub } from 'react-icons/ai'
import Navbarr from '../Components/Navbarr';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Components/firebase-config';
import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import './Login.css'


function Login() {

    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState('')
    const [loginpassword, setLoginPassword] = useState ('')

    const login = async () => {
        try{
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginpassword)
            console.log(user.user.uid)
            localStorage.setItem('user', JSON.stringify(user))
            navigate("/area")
        } catch (error) {
            console.log(error.message)
        }
    }

    const signInWithGoogle = () =>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((user) => {
            console.log(user)
            console.log(user.user.uid)
            localStorage.setItem('user', JSON.stringify(user))
            // localStorage.setItem('usergoogle', JSON.stringify(result.user.accessToken))
            navigate("/area");
            })
            .catch((error) => {
            console.log(error);
            })
    }

    const signInWithGithub = () =>{
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
        .then((user) => {
            console.log(user);
            console.log(user.user.uid)
            localStorage.setItem('user', JSON.stringify(user))
            navigate("/area");
            })
            .catch((error) => {
            console.log(error);
            })
    }

  return (
      <div>
        <Navbarr/>
        <div className='loginpage'>
            <Row style={{ position: 'fixed', top: '50%', left:'50%', transform:'translate(-50%, -50%)' }}>
                <Card style={{ width: '30rem', borderRadius: '0px'  }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                    <Card.Title style={{ textAlign: 'center' }}>Log in</Card.Title>
                    <Card.Text>
                        {/* Some quick example text to build on the card title and make up the bulk of
                        the card's content. */}
                        <input className='logininput' type='text' placeholder='Email' value={loginEmail} onChange={(e) => {setLoginEmail(e.target.value)}}/>
                        <input className='logininput' type='password' placeholder='Password' value={loginpassword} onChange={(e) => {setLoginPassword(e.target.value)}}/>
                    </Card.Text>
                    <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <button className='loginbutton' onClick={login} >Login</button>
                    </div>
                    <Card.Text style={{ textAlign: 'center', justifyContent:'center', marginTop: '10px' }}>
                        don't have an account?
                        <a href='/register'> Create an account</a>
                    </Card.Text>
                    <Row style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '10px' }}>
                        <Col><hr style={{ width: '100%' }}/></Col>
                        <Col md={2}>or</Col>
                        <Col><hr style={{ width: '100%' }}/></Col>
                    </Row>
                    <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <button className='logingooglebutton' onClick={signInWithGoogle}>
                            <FcGoogle style={{ fontSize: '25px', marginRight: '20px' }}/>
                            Login with Google
                        </button>
                    </div>
                    <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                        <button className='logingithubbutton' onClick={signInWithGithub}>
                            <AiFillGithub style={{ fontSize: '25px', marginRight: '25px' }}/>
                            Login with Github
                        </button>
                    </div>
                    </Card.Body>
                    <Card.Text style={{ textAlign: 'center', justifyContent:'center', marginBottom: '20px' }}>
                        <a href='/forgot'>forgot password?</a>
                    </Card.Text>
                </Card>
            </Row>
        </div>
    </div>
  );
}

export default Login;