import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios';

export default function RegisterUser(props) {
    
    axios.post("https://web-server-area.herokuapp.com/register?user=" + props, "")
        .then(response => {
            console.log('puhsing data from axios');
        })
        .catch(error => {
            console.log(error);
        });
}