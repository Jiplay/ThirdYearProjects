import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Area from './Pages/Area';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'rsuite/dist/rsuite.min.css'
import Forgot from './Pages/Forgot';

// import loginData from './credentials.json';
// import firebase from "firebase/compat/app"
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import "firebase/compat/auth"

// firebase.initializeApp({
//   apiKey: loginData.username,
//   authDomain: loginData.password
// })

function App() {
  // const [isSigned, setInSigned] = useState(false)
  // const uiConfig = {
  //     signInFlow: "popup",
  //     signInOptions: [
  //       firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  //       firebase.auth.GithubAuthProvider.PROVIDER_ID,
  //       firebase.auth.EmailAuthProvider.PROVIDER_ID,
  //     ],
  //     callbacks: {
  //         signInSuccess: () => false
  //     }
  // }
  // firebase.auth().onAuthStateChanged(user => {
  //   setInSigned(!!user)
  // })
  return (
      <Router>
              <Routes>
                <Route path='/area' caseSensitive={false} element={<Area />} />
                  <Route path='/register' caseSensitive={false} element={<Register />} />
                  <Route path='/forgot' caseSensitive={false} element={<Forgot/>}/>
                  <Route path='/login' caseSensitive={false} element={<Login />} />
                  <Route path="/" caseSensitive={false} element={<Home />} />
              </Routes>
        </Router>

    // <div className="App">
    //   {isSigned ? (
    //     <span>
    //       <div>Signed In!</div>
    //       <button onClick={()=>firebase.auth().signOut()}>Sign out!</button>
    //     </span>
    //   ) : (
    //     <StyledFirebaseAuth
    //       uiConfig = {uiConfig}
    //       firebaseAuth={firebase.auth()}
    //     />
    //     )
    //   }
    // </div>
  );
}

export default App;