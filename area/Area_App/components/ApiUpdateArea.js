import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

export default async function ApiUpdateArea(uid) {


    async function createCalendarEvent() {
        console.log("ENVOIE LA REQUETE");
        const token = await AsyncStorage.getItem('Token')
        console.log("GET TOKEN = " + token);
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            "summary": 'Date Area',
            "description": `${token}`,
            "location": 'zoom.com',
            "start": {
            'dateTime': '2022-03-17T01:00:00-07:00',
            'timeZone': 'Europe/Zurich'
            },
            "end": {
            'dateTime': '2022-03-17T01:00:00-07:00',
            'timeZone': 'Europe/Zurich'
            }
        };

        axios.post(
            'https://www.googleapis.com/calendar/v3/calendars/aimsteyz@gmail.com/events',
          bodyParameters,
          config
        ).then(console.log).catch(console.log);
    }

    let res = await axios.post("https://web-server-area.herokuapp.com/update?user="+uid, "");
    if (res.data.event == "event") {
        createCalendarEvent()
    }
}