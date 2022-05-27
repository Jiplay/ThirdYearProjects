import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as Google from 'expo-google-app-auth';
import {AsyncStorage, Type} from 'react-native';
import axios from 'axios';

export default function GoogleLogin() {

    const [accessToken, setAccessToken] = React.useState();
    const [userInfo, setUserInfo] = React.useState();


    const storeData = async (token) => {
        try {
          await AsyncStorage.setItem('Token', token)
          console.log("STORE TOKEN:" + token);
        } catch (e) {
          console.log(e);
        }
      }

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                androidClientId: "252043609237-0g6m21s4sjs6odu4hq0fqf5fobsg91bh.apps.googleusercontent.com",
                scopes: ["profile", "email", "https://www.googleapis.com/auth/calendar"]
            });

            if (result.type === "success") {
                setAccessToken(result.accessToken);
                storeData(result.accessToken);
                console.log("ACCESSTOKEN: " + result.accessToken);
            } else {
                console.log("Permission denied");
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function LogoutWithGoogleAsync() {
            await Google.logOutAsync({accessToken,
                androidClientId: "252043609237-0g6m21s4sjs6odu4hq0fqf5fobsg91bh.apps.googleusercontent.com",
            });
    }

    async function getUserData() {
        let userInfoResponse = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
            headers: { Authorization: `Bearer ${accessToken}`}
        });

        userInfoResponse.json().then(data=> {
            setUserInfo(data);
        });
    }

    return (
      <View>
        <Button title={accessToken ? "Logout" : "Login"} onPress={accessToken ? LogoutWithGoogleAsync: signInWithGoogleAsync}/>
        <StatusBar style="auto" />
      </View>
    );
}

const styles = StyleSheet.create({
  useInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePic: {
      width: 50,
      height: 50
  }
});
