import React from 'react'
// import { Button } from 'react-bootstrap';
import AreaNavbarr from '../Components/AreaNavbarr'
import EventArea from '../Components/EventArea';
// import { useLocation } from "react-router-dom";
// import CardArea from '../Components/CardArea';
// import { useState } from 'react';
// import axios from 'axios';

function Area() {

  // const location = useLocation();

  // console.log(location)

  // const user = localStorage.getItem('user')
  // console.log(JSON.parse(user).user.uid)

  return (
        <div>
            <AreaNavbarr/>
            <div style={{backgroundColor: 'blueviolet', minHeight: '93vh'}}>
                <EventArea/>
            </div>
        </div>
  );
}

export default Area;