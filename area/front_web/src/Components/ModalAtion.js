/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Modal, Button, Row, Col, Table, ListGroup} from 'react-bootstrap'
import CardArea from './CardArea';
// import axios from 'axios'
/* eslint-disable react-hooks/exhaustive-deps */
import './ModalAction.css'

function dateConvertor(date, bool) {
    let data = date.replace(' ', '');
    let resp = '2022-XX-YYT09:00:00-07:00'
  
    resp = resp.replace('YY', data.substring(0, 2))
    resp = resp.replace('XX', data.slice(-2))
  
    if (bool === 1) {
      resp = resp.slice(0, -14)
      resp = resp + '17:00:00-07:00'
    }
    return resp
  }

function ModalAction(props) {

    let action=["weather", "currency", 'LOL', 'LOL_tier', 'LOL_wins', 'LOL_losses', 'LOL_rank', 'LOL_hotstreak', 'LOL_veteran', 'COVIDFR', 'COVIDFR_rea', 'COVIDFR_irea', 'COVIDFR_ihosp', 'AQI']
    let reaction=["mail", "sms", "calendar"]

    const [date, setDate] = useState("17/03");
    const [title, setTitle] = useState("Area");
    var gapi = window.gapi

    var CLIENT_ID = "252043609237-qh1ced3fk37hqltvh30jajt59tts1cau.apps.googleusercontent.com"
    var API_KEY = "AIzaSyB_Ms58SWfl04H1ZhPR3-5pChdNn9tGJOg"
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    var SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const handleClick = (date, setTitle) => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('user loged in!'))

      gapi.auth2.getAuthInstance().signIn()
    })
    }


    const [cards, setCards] = useState([]);

    const [ displayAction, setDisplayAction ] = useState([]);
    const [ displayReaction, setDisplayReaction ] = useState([]);

    const [ getAction, setGetAction ] = useState([])

    const [city, setCity] = useState();
    const [temp, setTemp] = useState();
    const [device, setDevice] = useState();
    const [pseudo, setPseudo] = useState();
    const [pseudoValue, setPseudoValue] = useState();
    const [covid, setCovid] = useState();
    const [email, setEmail] = useState();
    const [sms, setSMS] = useState();

    const [deleteAct, setDeleteAct] = useState();
    const [deleteRecation, setDeleteReaction] = useState();

    const [showWeather, setShowWeather] = useState(false);
    const [showCurrency, setShowCurrency] = useState(false);
    const [showLol, setShowLol] = useState(false);
    const [showLol1, setShowLol1] = useState(false);
    const [showCovid, setShowCovid] = useState(false);

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);
    const [show7, setShow7] = useState(false);
    const [show8, setShow8] = useState(false);
    const [show9, setShow9] = useState(false);

    const [showDelete, setShowDelete] = useState(false);
    const [showDeleteWeather, setShowDeleteWeather] = useState(false);
    const [showDeleteCurrency, setShowDeleteCurrency] = useState(false);
    const [showDeleteLol, setShowDeleteLol] = useState(false);
    const [showDeleteLol1, setShowDeleteLol1] = useState(false);
    const [showDeleteCovid, setShowDeleteCovid] = useState(false);

    const handleCloseWeather = () => setShowWeather(false);
    const handleWeather = () => setShowWeather(true);
    const handleCloseCurrency = () => setShowCurrency(false);
    const handleCurrency = () => setShowCurrency(true);
    const handleCloseLol = () => setShowLol(false);
    const handleLol = () => setShowLol(true);
    const handleCloseLol1 = () => setShowLol1(false);
    const handleLol1 = () => setShowLol1(true);
    const handleCloseCovid = () => setShowCovid(false);
    const handleCovid = () => setShowCovid(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);
    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);
    const handleClose6 = () => setShow6(false);
    const handleShow6 = () => setShow6(true);
    const handleClose7 = () => setShow7(false);
    const handleShow7 = () => setShow7(true);
    const handleClose8 = () => setShow8(false);
    const handleShow8 = () => setShow8(true);
    const handleClose9 = () => setShow9(false);
    const handleShow9 = () => setShow9(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const handleCloseDeleteWeather = () => setShowDeleteWeather(false);
    const handleDeleteWeather = () => setShowDeleteWeather(true);
    const handleCloseDeleteCurrency = () => setShowDeleteCurrency(false);
    const handleDeleteCurrency = () => setShowDeleteCurrency(true);
    const handleCloseDeleteLol = () => setShowDeleteLol(false);
    const handleDeleteLol = () => setShowDeleteLol(true);
    const handleCloseDeleteLol1 = () => setShowDeleteLol1(false);
    const handleDeleteLol1 = () => setShowDeleteLol1(true);
    const handleCloseDeleteCovid = () => setShowDeleteCovid(false);
    const handleDeleteCovid = () => setShowDeleteCovid(true);

    const handlecity = (text) => {
        setCity(text);
    }

    const handleTemp = (text) => {
        setTemp(text);
    }

    const handleDevice = (text) => {
        setDevice(text);
    }

    const handlePseudo = (text) => {
        setPseudo(text);
    }

    const handlePseudoValue = (text) => {
        setPseudoValue(text);
    }

    const handleCovidint = (text) => {
        setCovid(text);
    }

    const handleEmail = (text) => {
        setEmail(text);
    }

    const handleSMS = (text) => {
        setSMS(text);
    }

    const handleDeleteReaction = (text) => {
        setDeleteReaction(text);
    }

    const handleDeleteAction = (text) => {
        setDeleteAct(text);
    }

    const update = () => {
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/update?user=' + JSON.parse(user).user.uid + '',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data.event));
            if (response.data.event === 'event') {
                var event = {
                    'summary': title,
                    'location': 'zoom.com/713705',
                    'description': 'Happy birthday :)',
                    'start': {
                    'dateTime': dateConvertor(date, 0),
                    'timeZone': 'America/Los_Angeles'
                    },
                    'end': {
                    'dateTime': dateConvertor(date, 1),
                    'timeZone': 'America/Los_Angeles'
                    },
                    'reminders': {
                    'useDefault': false,
                    'overrides': [
                        {'method': 'email', 'minutes': 24 * 60},
                        {'method': 'popup', 'minutes': 10}
                    ]
                    }
                }
                var request = gapi.client.calendar.events.insert({
                    'calendarId': 'primary',
                    'resource': event,
                })
                request.execute(event => {
                    console.log(event)
                    window.open(event.htmlLink)
                })
            }
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    useEffect(() => {
        const interval = setInterval(update, 120000);
        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        var axios = require('axios');
        var str;

        var config = {
          method: 'get',
          url: 'http://localhost:8080/profile?user=' + JSON.parse(user).user.uid + '',
          headers: { }
        };
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data.user))
          str = response.data.user.substr(1)
          setGetAction([...getAction, str.split(':')])
        })
        .catch(function (error) {
          console.log(error);
        });
    }, [])

    const user = localStorage.getItem('user')
    // console.log(JSON.parse(user).user.uid)

    const removeCard = (index) => {
        const newCards = [...cards];

        newCards.splice(index, 1)
        setCards(newCards);
    };

    const eventCard = () => {
        if (displayAction === 'weather' || displayAction === 'AQI')
            handleWeather()
        if (displayAction === 'currency')
            handleCurrency()
        if (displayAction === 'LOL')
            handleLol()
        if (displayAction ==='LOL_tier' || displayAction ==='LOL_wins' || displayAction ==='LOL_losses'|| displayAction ==='LOL_rank'  || displayAction ==='LOL_hotstreak' || displayAction ==='LOL_veteran')
            handleLol1()
        if (displayAction ==='COVIDFR' || displayAction ==='COVIDFR_rea' || displayAction ==='COVIDFR_irea'|| displayAction ==='COVIDFR_ihosp')
            handleCovid()
        props.onHide()
    }

    const eventCardDeleteWeather = () => {
        handleDeleteWeather()
        handleCloseDelete()
    }

    const eventCardDeleteCurrency = () => {
        handleDeleteCurrency()
        handleCloseDelete()
    }

    const eventCardDeleteLol = () => {
        handleDeleteLol()
        handleCloseDelete()
    }

    const eventCardDeleteLol1 = () => {
        handleDeleteLol1()
        handleCloseDelete()
    }

    const eventCardDeleteCovid = () => {
        handleDeleteCovid()
        handleCloseDelete()
    }

    const newAreaMailWeather = () => {
        handleClose()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + city + '_' + temp + '&data=' + email +'&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(JSON.parse(user).user.uid)
            // window.location.reload(false);
            // addCard()
            // getdata()
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaWeatherCalendar = () => {
        handleClose()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + city + '_' + temp + '&data=calendar&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            console.log(JSON.parse(user).user.uid)
            // window.location.reload(false);
            // addCard()
            // getdata()
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaDeviceCalendar = () => {
        handleClose3()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + device + '&data=calendar&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            // addCard()
            // getdata()
            // window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaLolCalendar = () => {
        handleClose4()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + pseudo + '&data=calendar&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            // getdata()
            // window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaLol1Calendar = () => {
        handleClose6()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + pseudo + '_' + pseudoValue + '&data=calendar&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            // window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaMailCovidCalendar = () => {
        handleClose8()
        var axios = require('axios');

        var config = {
          method: 'post',
          url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + covid + '&data=calendar&user=' + JSON.parse(user).user.uid+ '',
          headers: { }
        };
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        //   window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }


    const newAreaMailDevice = () => {
        handleClose2()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + device + '&data=' + email + '&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            // addCard()
            // getdata()
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaSMSWeather = () => {
        handleClose1()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + city + '_' + temp + '&data=' + sms +'&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            // addCard()
            // getdata()
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaSMSDevice = () => {
        handleClose3()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + device + '&data=' + sms +'&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            // addCard()
            // getdata()
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaMailLol = () => {
        handleClose4()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + pseudo + '&data=' + email + '&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            // getdata()
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaSMSLol = () => {
        handleClose5()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + pseudo + '&data=' + sms + '&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaMailLol1 = () => {
        handleClose6()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + pseudo + '_' + pseudoValue + '&data=' + email + '&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaSMSLol1 = () => {
        handleClose7()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + pseudo + '_' + pseudoValue + '&data=' + sms + '&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            // getdata()
            console.log(JSON.stringify(response.data));
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const newAreaMailCovid = () => {
        handleClose8()
        var axios = require('axios');

        var config = {
          method: 'post',
          url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + covid + '&data=' + email + '&user=' + JSON.parse(user).user.uid+ '',
          headers: { }
        };
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const newAreaSMSCovid = () => {
        handleClose9()
        var axios = require('axios');

        var config = {
          method: 'post',
          url: 'http://localhost:8080/newArea?action=' + displayAction + '&service=' + covid + '&data=' + sms + '&user=' + JSON.parse(user).user.uid+ '',
          headers: { }
        };
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          window.location.reload(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    const deleteAreaWeather = () => {
        handleCloseDeleteWeather()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/delArea?action=' + deleteAct + '&service=' + city + '_' + temp + '&data=' + deleteRecation + '&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const deleteAreaCurrency = () => {
        handleCloseDeleteCurrency()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/delArea?action=' + deleteAct + '&service=' + device + '&data=' + deleteRecation + '&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload(false);

        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const deleteAreaLol = () => {
        handleCloseDeleteLol()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/delArea?action=' + deleteAct + '&service=' + pseudo + '&data=' + deleteRecation + '&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const deleteAreaLol1 = () => {
        handleCloseDeleteLol1()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/delArea?action=' + deleteAct + '&service=' + pseudo + '_' + pseudoValue + '&data=' + deleteRecation + '&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const deleteAreaCovid = () => {
        handleCloseDeleteCovid()
        var axios = require('axios');

        var config = {
        method: 'post',
        url: 'http://localhost:8080/delArea?action=' + deleteAct + '&service=' + covid + '&data=' + deleteRecation + '&user=' + JSON.parse(user).user.uid +'',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            window.location.reload(false);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    const weatheraction = () => {
        if (displayReaction === 'mail')
            handleShow()
        if (displayReaction === 'sms')
            handleShow1()
        if(displayReaction === 'calendar')
            newAreaWeatherCalendar()
        handleCloseWeather()
    }

    const currencyaction = () => {
        if (displayReaction === 'mail')
            handleShow2()
        if (displayReaction === 'sms')
            handleShow3()
        if(displayReaction === 'calendar')
            newAreaDeviceCalendar()
        handleCloseCurrency()
    }

    const lolaction = () => {
        if (displayReaction === 'mail')
            handleShow4()
        if (displayReaction === 'sms')
            handleShow5()
        if(displayReaction === 'calendar')
            newAreaLolCalendar()
        handleCloseLol()
    }

    const lolaction1 = () => {
        if (displayReaction === 'mail')
            handleShow6()
        if (displayReaction === 'sms')
            handleShow7()
        if(displayReaction === 'calendar')
            newAreaLol1Calendar()
        handleCloseLol1()
    }

    const covidaction = () => {
        if (displayReaction === 'mail')
            handleShow8()
        if (displayReaction === 'sms')
            handleShow9()
        if(displayReaction === 'calendar')
            newAreaMailCovidCalendar()
        handleCloseCovid()
    }

    // const deleteAction = () => {
    // }

  return (
    <div>
        <Button style={{ marginRight: '10px' }} onClick={() => { handleClick(date, title);}} >Login calendar</Button>
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                List of action reaction
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Row >
                   <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Action</th>
                                </tr>
                            </thead>
                            <tbody key="tbody">
                                {action.map(( item, i )=>(
                                    <tr key={i} >
                                        <td >
                                            <input type='radio' key={i} value={item} name="radiovalues" onChange={(e) => setDisplayAction(e.target.value)}/>
                                        </td>
                                        <td  >
                                            <b>{item}</b>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                   </Col>
                   <Col>
                    <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Reaction</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {reaction.map((result, i)=>(
                                    <tr key={i}>
                                        <td>
                                            <input type='radio' value={result} key={i} name="radiovalue" onChange={(e) => setDisplayReaction(e.target.value)}/>
                                        </td>
                                        <td >
                                            <b key={i}>{result} </b>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                   </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => eventCard()}>Add Action/Reaction</Button>
                <Button variant="danger" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
        {cards.map((index, i) => (
            <CardArea onRemove={() => removeCard(index)} key={i} action={displayAction} reaction={displayReaction}/>
        ))}
        <Modal show={showWeather} onHide={handleCloseWeather}>
            <Modal.Header closeButton>
            <Modal.Title>Weather / AQI</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='city' placeholder='Ville exemple: Paris' value={city || ""} onChange={e => handlecity(e.target.value)}></input>
                <input type='text' className='inputsms' name='city' placeholder='temp exemple: 18' value={temp || ""} onChange={e => handleTemp(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={weatheraction}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleCloseWeather}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showCurrency} onHide={handleCloseCurrency}>
            <Modal.Header closeButton>
            <Modal.Title>Currency</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='device' placeholder='exemple: USD' value={device || ""} onChange={e => handleDevice(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={currencyaction}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleCloseCurrency}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showLol} onHide={handleCloseLol}>
            <Modal.Header closeButton>
            <Modal.Title>LOL</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='pseudo' placeholder='Pseudo' value={pseudo || ""} onChange={e => handlePseudo(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={lolaction}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleCloseLol}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showLol1} onHide={handleCloseLol1}>
            <Modal.Header closeButton>
            <Modal.Title>LOL</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='pseudo' placeholder='Pseudo' value={pseudo || ""} onChange={e => handlePseudo(e.target.value)}></input>
                <input type='text' className='inputsms' name='pseudo' placeholder='value' value={pseudoValue || ""} onChange={e => handlePseudoValue(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={lolaction1}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleCloseLol1}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showCovid} onHide={handleCloseCovid}>
            <Modal.Header closeButton>
            <Modal.Title>Covid</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='pseudo' placeholder='number' value={covid || ""} onChange={e => handleCovidint(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={covidaction}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleCloseCovid}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Mail</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputmail' name='email'  placeholder='exemple: jean.dupond@gmail.com' value={email || ""} onChange={e => handleEmail(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={newAreaMailWeather}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show2} onHide={handleClose2}>
            <Modal.Header closeButton>
            <Modal.Title>Mail</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputmail' name='email'  placeholder='exemple: jean.dupond@gmail.com' value={email || ""} onChange={e => handleEmail(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={newAreaMailDevice}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose2}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show1} onHide={handleClose1}>
            <Modal.Header closeButton>
            <Modal.Title>SMS</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='sms' placeholder='exemple: 33700000000' value={sms || ""} onChange={e => handleSMS(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={newAreaSMSWeather}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose1}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show3} onHide={handleClose3}>
            <Modal.Header closeButton>
            <Modal.Title>SMS</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='sms' placeholder='exemple: 33700000000' value={sms || ""} onChange={e => handleSMS(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={newAreaSMSDevice}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose3}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show4} onHide={handleClose4}>
            <Modal.Header closeButton>
            <Modal.Title>Mail</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <input type='text' className='inputmail' name='email'  placeholder='exemple: jean.dupond@gmail.com' value={email || ""} onChange={e => handleEmail(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={newAreaMailLol}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose4}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show5} onHide={handleClose5}>
            <Modal.Header closeButton>
            <Modal.Title>SMS</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='sms' placeholder='exemple: 33700000000' value={sms || ""} onChange={e => handleSMS(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={newAreaSMSLol}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose5}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show6} onHide={handleClose6}>
            <Modal.Header closeButton>
            <Modal.Title>Email</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='sms' placeholder='exemple: jean.dupond@gmail.com' value={email || ""} onChange={e => handleEmail(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={newAreaMailLol1}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose6}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show7} onHide={handleClose7}>
            <Modal.Header closeButton>
            <Modal.Title>SMS</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='sms' placeholder='exemple: 33700000000' value={sms || ""} onChange={e => handleSMS(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={newAreaSMSLol1}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose7}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show8} onHide={handleClose8}>
            <Modal.Header closeButton>
            <Modal.Title>Email</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='sms' placeholder='exemple: jean.dupond@gmail.com' value={email || ""} onChange={e => handleEmail(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={newAreaMailCovid}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose8}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={show9} onHide={handleClose9}>
            <Modal.Header closeButton>
            <Modal.Title>SMS</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='sms' placeholder='exemple: 33700000000' value={sms || ""} onChange={e => handleSMS(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={newAreaSMSCovid}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleClose9}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showDelete} onHide={handleCloseDelete}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Action</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <ListGroup defaultActiveKey="#link1">
                    <ListGroup.Item action onClick={eventCardDeleteWeather}>
                        Weather
                    </ListGroup.Item>
                    <ListGroup.Item action  onClick={eventCardDeleteCurrency}>
                        Currency
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={eventCardDeleteLol}>
                        LOL
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={eventCardDeleteLol1}>
                        LOL_tier
                    </ListGroup.Item>
                    <ListGroup.Item action  onClick={eventCardDeleteLol1}>
                        Lol_wins
                    </ListGroup.Item>
                    <ListGroup.Item action  onClick={eventCardDeleteLol1}>
                        Lol_losses
                    </ListGroup.Item>
                    <ListGroup.Item action  onClick={eventCardDeleteLol1}>
                        Lol_rank
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={eventCardDeleteLol1} >
                        LOL_hotstreak
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={eventCardDeleteLol1}>
                        LOL_veteran
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={eventCardDeleteWeather}>
                        AQI
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={eventCardDeleteCovid}>
                        COVIDFR
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={eventCardDeleteCovid}>
                        COVIDFR_rea
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={eventCardDeleteCovid}>
                        COVIDFR_irea
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={eventCardDeleteCovid}>
                        COVIDFR_ihosp
                    </ListGroup.Item>
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="danger" onClick={handleCloseDelete}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showDeleteWeather} onHide={handleCloseDeleteWeather}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Weather</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='lol1' placeholder='Action' value={deleteAct || ""} onChange={e => handleDeleteAction(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='City' value={city || ""} onChange={e => handlecity(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='temp' value={temp || ""} onChange={e => handleTemp(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='Reaction' value={deleteRecation || ""} onChange={e => handleDeleteReaction(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={deleteAreaWeather}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleCloseDeleteWeather}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showDeleteCurrency} onHide={handleCloseDeleteCurrency}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Currency</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='lol1' placeholder='Action' value={deleteAct || ""} onChange={e => handleDeleteAction(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='Currency' value={device || ""} onChange={e => handleDevice(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='Reaction' value={deleteRecation || ""} onChange={e => handleDeleteReaction(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={deleteAreaCurrency}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleCloseDeleteCurrency}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showDeleteLol} onHide={handleCloseDeleteLol}>
            <Modal.Header closeButton>
            <Modal.Title>Delete LOL</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='lol1' placeholder='Action' value={deleteAct || ""} onChange={e => handleDeleteAction(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='pseudo' value={pseudo || ""} onChange={e => handlePseudo(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='Reaction' value={deleteRecation || ""} onChange={e => handleDeleteReaction(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={deleteAreaLol}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleCloseDeleteLol}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showDeleteLol1} onHide={handleCloseDeleteLol1}>
            <Modal.Header closeButton>
            <Modal.Title>Delete LOL</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='lol1' placeholder='Action' value={deleteAct || ""} onChange={e => handleDeleteAction(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='pseudo' value={pseudo || ""} onChange={e => handlePseudo(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='value' value={pseudoValue || ""} onChange={e => handlePseudoValue(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='Reaction' value={deleteRecation} onChange={e => handleDeleteReaction(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={deleteAreaLol1}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleCloseDeleteLol1}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        <Modal show={showDeleteCovid} onHide={handleCloseDeleteCovid}>
            <Modal.Header closeButton>
            <Modal.Title>Delete Covid</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                <input type='text' className='inputsms' name='lol1' placeholder='Action' value={deleteAct || ""} onChange={e => handleDeleteAction(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='covid' value={covid || ""} onChange={e => handleCovidint(e.target.value)}></input>
                <input type='text' className='inputsms' name='lol1' placeholder='Reaction' value={deleteRecation || ""} onChange={e => handleDeleteReaction(e.target.value)}></input>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={deleteAreaCovid}>
                Save Changes
            </Button>
            <Button variant="danger" onClick={handleCloseDeleteCovid}>
                Close
            </Button>
            </Modal.Footer>
        </Modal>
        {getAction.map((items, index) => {
                return (
                <div key={index}>
                    {items.map((subItems, sIndex) => {
                    return  <CardArea key={sIndex} getAction={subItems} delAction={handleShowDelete} ></CardArea>;
                    })}
                </div>
                );
            })}
        <Button style={{ marginTop: '20px',marginBottom: '20px' }} onClick={() => update()}>Update</Button>
    </div>
  );
}

export default ModalAction;