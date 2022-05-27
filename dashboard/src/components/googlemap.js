import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

const mapStyles = {
  width: '460px',
  height: '300px',
  padding: '40px',
  display: 'flex',
  border: '5px grey',
  borderRadius: '10px'
};

class GMap extends Component {
  constructor() {
    super();
    this.state = { 
      data: [],
      some: ''
    };
  }

  async componentDidMount() {
    var resp
        resp = await 
        fetch('http://localhost:8080/', {
          headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'mode': 'no-cors'
          }
        })
    const json = await resp.json();
    this.setState(json)
  }
  componentDidMount
  render()
{
    if (this.state.client !== undefined) {
      return (
        <div>
          <Map
            google={this.props.google}
            zoom={13}
            style={mapStyles}
             initialCenter={{
                 lat: this.state.client.latitude,
                 lng: this.state.client.longitude,
              
             }}
            >
           <Marker
            onClick={this.onMarkerClick}
            name={'Location'}
          />
  
          </Map>
          
        </div>
      );
    } else {
      return (
        <div>
        </div>
      );
    }
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBwNQxssNfIqA_wXcXj4s8COoIxAtoz4J4'
})(GMap);
