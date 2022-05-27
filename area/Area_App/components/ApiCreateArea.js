import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';

export default function ApiCreateArea(apiAction, actionValue, serviceValue, dataValue, userValue) {
    
    console.log("actionValue = " + actionValue);
    console.log("serviceValue = " + serviceValue);
    console.log("dataValue = " + dataValue);
    console.log("userValue = " + userValue);
    axios.post("https://web-server-area.herokuapp.com/"+apiAction+"Area?action="+actionValue+"&service="+serviceValue+"&data="+dataValue+"&user="+userValue, "")
        .then(response => {
            if (apiAction == "new") {
                console.log('pushing data to axios');
            } else {
                console.log('deleting data to axios');
            }
        })
        .catch(error => {
            console.log(error);
        });
}