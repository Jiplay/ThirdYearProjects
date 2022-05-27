import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {Card} from 'react-native-elements';
import ApiCreateArea from '../components/ApiCreateArea.js';


export default function CallUser(props) {

    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const getData = async () => {
        axios.get("https://web-server-area.herokuapp.com/profile?user=" + props.uid)
            .then(response => {
                const temp = response.data;
                setData(temp)
            })
            .catch(error => {
                console.log(error);
            });
            setLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    const DelArea = async (v1, v2, v3) => {
        let uid;
        try {
            uid = await AsyncStorage.getItem('key')
        } catch(e) {
        }
        console.log(v1+v2+v3);
        ApiCreateArea("del",v1, v2, v3, uid)
    }



    function GetDispArea(props) {
        if (data.user == null) {
            return <Text>No Area</Text>
        } else if (data.user != null) {
            const val = data.user;
            const t = val.split(':');
            let x = 0;
            var MyCards = [];
            while (t[x+1] != null) {
                const temp = t[x+1].split(',');
                x += 1;            
                MyCards.push(
                    <View key = {x}>
                        <Card>
                            <Text>
                                {temp[0]} {temp[1]} {temp[2]}
                            </Text>
                            <Button title="x" color="red" onPress={() => DelArea(temp[0], temp[1], temp[2])}/>
                        </Card>
                    </View>
                )
            }
            return (
                <View>
                {MyCards}
                </View>
            )
        }
    }

  return (
    <View>
        <GetDispArea/>
      <StatusBar style="auto" />
    </View>
  );
}


