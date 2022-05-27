import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState, useEffect} from 'react';
import { StyleSheet, Text, View, CheckBox, TextInput, ScrollView} from 'react-native';

import { IconButton } from '../components';
import Firebase from '../config/firebase';
import { AuthenticatedUserContext } from '../navigation/AuthenticatedUserProvider';

import {AsyncStorage, Type} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker'
import { Button, Overlay, Icon} from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import NavBar from '../components/NavBar';
import Cards from '../components/Cards';
import Header from 'react-native-elements';
import RegisterUser from '../components/ApiRegisterUser';
import CallUser from '../components/ApiCallUser.js';
import ApiCreateArea from '../components/ApiCreateArea.js';
import ApiUpdateArea from '../components/ApiUpdateArea.js';

import GoogleLogin from '../components/GoogleLogin';

const auth = Firebase.auth();
let register = false;

export default function HomeScreen() {

    const { user } = useContext(AuthenticatedUserContext);
    const uid = user.uid;
    const MINUTE_MS = 60000;
    const [MenuVisibility, setMenuVisible] = useState(false);
    const [S1isSelected, setS1Selection] = useState(false);
    const [S2isSelected, setS2Selection] = useState(false);
    const [S3isSelected, setS3Selection] = useState(false);
    const [S4isSelected, setS4Selection] = useState(false);
    const [S5isSelected, setS5Selection] = useState(false);
    const [S6isSelected, setS6Selection] = useState(false);
    const [S7isSelected, setS7Selection] = useState(false);
    const [S8isSelected, setS8Selection] = useState(false);
    const [S9isSelected, setS9Selection] = useState(false);
    const [S10isSelected, setS10Selection] = useState(false);
    const [S11isSelected, setS11Selection] = useState(false);
    const [S12isSelected, setS12Selection] = useState(false);
    const [S13isSelected, setS13Selection] = useState(false);
    const [S14isSelected, setS14Selection] = useState(false);
    
    const [SMSisSelected, setSMSSelection] = useState(false);
    const [EMAILisSelected, setEMAILSelection] = useState(false);
    const [CALisSelected, setCALSelection] = useState(false);
    
    let [phonenumber, onChangeNumber] = React.useState(null);
    let [emailaddress, onChangeMail] = React.useState(null);

    let [S1text, onChangeS1] = React.useState(null);
    let [S2text, onChangeS2] = React.useState(null);
    let [S2textBIS, onChangeS2BIS] = React.useState(null);
    let [S3text, onChangeS3] = React.useState(null);
    let [S4text, onChangeS4] = React.useState(null);
    let [S4textBIS, onChangeS4BIS] = React.useState(null);
    let [S5text, onChangeS5] = React.useState(null);
    let [S5textBIS, onChangeS5BIS] = React.useState(null);
    let [S6text, onChangeS6] = React.useState(null);
    let [S6textBIS, onChangeS6BIS] = React.useState(null);
    let [S7text, onChangeS7] = React.useState(null);
    let [S7textBIS, onChangeS7BIS] = React.useState(null);
    let [S8text, onChangeS8] = React.useState(null);
    let [S8textBIS, onChangeS8BIS] = React.useState(null);
    let [S9text, onChangeS9] = React.useState(null);
    let [S9textBIS, onChangeS9BIS] = React.useState(null);
    let [S10text, onChangeS10] = React.useState(null);
    let [S11text, onChangeS11] = React.useState(null);
    let [S12text, onChangeS12] = React.useState(null);
    let [S13text, onChangeS13] = React.useState(null);
    let [S14text, onChangeS14] = React.useState(null);
    let [S14textBIS, onChangeS14BIS] = React.useState(null);
    
    const storeData = async () => {
      try {
        await AsyncStorage.setItem('key', uid)
        console.log("STORE VALEUR:" + uid);
      } catch (e) {
        console.log(e);
      }
    }

    if (register == false) {
        RegisterUser(uid);
        storeData();
        register = true;
    }

    const UpdateCards = async () => {
        console.log("updating Area for uid: " + uid);
        ApiUpdateArea(uid);
    }


    useEffect(() => {
      const interval = setInterval(() => {
        ApiUpdateArea(uid);
      }, MINUTE_MS);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])

    const handleSignOut = async () => {
      try {
        await auth.signOut();
      } catch (error) {
        console.log(error);
      }
    };

    const CreateAreaWithValue = () => {
        console.log("Create Area");
        setMenuVisible(!MenuVisibility);
        if (S1isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","currency", S1text, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","currency", S1text, emailaddress, uid);
            } 
            else {
                ApiCreateArea("new","currency", S1text, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S1text = "";
        }
        if (S2isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","weather", S2text+"_"+S2textBIS, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","weather", S2text+"_"+S2textBIS, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","weather", S2text+"_"+S2textBIS, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S2text = "";
        }
        if (S3isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","LOL", S3text, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","LOL", S3text, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","LOL", S3text, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S3text = "";
        }
        if (S4isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","LOL_tier", S4text+"_"+S4textBIS, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","LOL_tier", S4text+"_"+S4textBIS, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","LOL_tier", S4text+"_"+S4textBIS, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S4text = "";
        }
        if (S5isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","LOL_wins", S5text+"_"+S5textBIS, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","LOL_wins", S5text+"_"+S5textBIS, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","LOL_wins", S5text+"_"+S5textBIS, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S5text = "";
        }
        if (S6isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","LOL_losses", S6text+"_"+S6textBIS, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","LOL_losses", S6text+"_"+S6textBIS, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","LOL_losses", S6text+"_"+S6textBIS, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S6text = "";
        }
        if (S7isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","LOL_rank", S7text+"_"+S7textBIS, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","LOL_rank", S7text+"_"+S7textBIS, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","LOL_rank", S7text+"_"+S7textBIS, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S7text = "";
        }
        if (S8isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","LOL_hotstreak", S8text+"_"+S8textBIS, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","LOL_hotstreak", S8text+"_"+S8textBIS, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","LOL_hotstreak", S8text+"_"+S8textBIS, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S8text = "";
        }
        if (S9isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","LOL_veteran", S9text+"_"+S9textBIS, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","LOL_veteran", S9text+"_"+S9textBIS, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","LOL_veteran", S9text+"_"+S9textBIS, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S9text = "";
        }
        if (S10isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","COVIDFR", S10text, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","COVIDFR", S10text, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","COVIDFR", S10text, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S10text = "";
        }
        if (S11isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","COVIDFR_rea", S11text, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","COVIDFR_rea", S11text, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","COVIDFR_rea", S11text, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S11text = "";
        }
        if (S12isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","COVIDFR_irea", S12text, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","COVIDFR_irea", S12text, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","COVIDFR_irea", S12text, "calendar", uid);

            }
            phonenumber = "";
            emailaddress = "";
            S12text = "";
        }
        if (S13isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","COVIDFR_ihosp", S13text, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","COVIDFR_ihosp", S13text, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","COVIDFR_ihosp", S13text, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S13text = "";
        }
        if (S14isSelected == true) {
            if (SMSisSelected == true) {
                ApiCreateArea("new","AQI", S14text+"_"+S14textBIS, phonenumber, uid);
            } else if (EMAILisSelected == true) {
                ApiCreateArea("new","AQI", S14text+"_"+S14textBIS, emailaddress, uid);
            }
            else {
                ApiCreateArea("new","AQI", S14text+"_"+S14textBIS, "calendar", uid);
            }
            phonenumber = "";
            emailaddress = "";
            S14text = "";
        }

    }

    const displayMenu = () => {
        setMenuVisible(!MenuVisibility);
    }
  return (
      <View style={styles.container}>
      <StatusBar style='dark-content' />
      <View style={styles.row}>        

        <Button title="Add Area" onPress={displayMenu}/>
        <Overlay isVisible={MenuVisibility} onBackdropPress={displayMenu}>
            <ScrollView>
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S1isSelected}
                  onValueChange={setS1Selection}
                />
                <Text style={styles.textbox}>Currency</Text>
            </View>
                <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS1}
                  value={S1text}
                  placeholder="Currency (Ex: USD)"
                />
            
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S2isSelected}
                  onValueChange={setS2Selection}
                />
                <Text style={styles.textbox}>Weather</Text>
            </View>
            
            <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS2}
                  value={S2text}
                  placeholder="Ville (Ex: Paris)"
                />
                <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS2BIS}
                  value={S2textBIS}
                  placeholder="Temperature (Ex: 7)"
                />

            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S3isSelected}
                  onValueChange={setS3Selection}
                />
                <Text style={styles.textbox}>LOL Profil</Text>
            </View>
                <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS3}
                  value={S3text}
                  placeholder="Pseudo (Ex: Trapzy)"
                />
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S4isSelected}
                  onValueChange={setS4Selection}
                />
                <Text style={styles.textbox}>LOL Tier</Text>
            </View>
             <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS4}
                  value={S4text}
                  placeholder="Pseudo (Ex: Trapzy)"
                />
                <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS4BIS}
                  value={S4textBIS}
                  placeholder="Tier (Ex: GOLD)"
                />
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S5isSelected}
                  onValueChange={setS5Selection}
                />
                <Text style={styles.textbox}>LOL Wins</Text>
            </View>
             <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS5}
                  value={S5text}
                  placeholder="Pseudo (Ex: Trapzy)"
                />
                <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS5BIS}
                  value={S5textBIS}
                  placeholder="Wins (Ex: 50)"
                />
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S6isSelected}
                  onValueChange={setS6Selection}
                />
                <Text style={styles.textbox}>LOL Losses</Text>
            </View>
            <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS6}
                  value={S6text}
                  placeholder="Pseudo (Ex: Trapzy)"
                />
                <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS6BIS}
                  value={S6textBIS}
                  placeholder="Losses (Ex: 50)"
                />
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S7isSelected}
                  onValueChange={setS7Selection}
                />
                <Text style={styles.textbox}>LOL Rank</Text>
            </View>
            <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS7}
                  value={S7text}
                  placeholder="Pseudo (Ex: Trapzy)"
                />
                <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS7BIS}
                  value={S7textBIS}
                  placeholder="Rank (Ex: III)"
                />
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S8isSelected}
                  onValueChange={setS8Selection}
                />
                <Text style={styles.textbox}>LOL HotStreak</Text>
            </View>
            <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS8}
                  value={S8text}
                  placeholder="Pseudo (Ex: Trapzy)"
                />
                <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS8BIS}
                  value={S8textBIS}
                  placeholder="0/1 (Ex: 0)"
                />
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S9isSelected}
                  onValueChange={setS9Selection}
                />
                <Text style={styles.textbox}>LOL Veteran</Text>
            </View>
            <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS9}
                  value={S9text}
                  placeholder="Pseudo (Ex: Trapzy)"
                />
                <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS9BIS}
                  value={S9textBIS}
                  placeholder="0/1 (Ex: 0)"
                />

            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S10isSelected}
                  onValueChange={setS10Selection}
                />
                <Text style={styles.textbox}>COVIDFR</Text>
            </View>
            <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS10}
                  value={S10text}
                  placeholder="Nombre de cas (Ex: 2000)"
                />
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S11isSelected}
                  onValueChange={setS11Selection}
                />
                <Text style={styles.textbox}>COVIDFR_rea</Text>
            </View>
            <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS11}
                  value={S11text}
                  placeholder="Nombre de cas en réanimation (Ex: 2000)"
                />
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S12isSelected}
                  onValueChange={setS12Selection}
                />
                <Text style={styles.textbox}>COVIDFR_irea</Text>
            </View>
            <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS12}
                  value={S12text}
                  placeholder="Nombre de cas en réanimation hier (Ex: 2000)"
                />
            <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S13isSelected}
                  onValueChange={setS13Selection}
                />
                <Text style={styles.textbox}>COVIDFR_ihosp</Text>
            </View>
            <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS13}
                  value={S13text}
                  placeholder="Nombre de cas hospitalisé hier (Ex: 2000)"
                />

                <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={S14isSelected}
                  onValueChange={setS14Selection}
                />
                <Text style={styles.textbox}>AQI</Text>
            </View>
            <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS14}
                  value={S14text}
                  placeholder="Ville (Ex: Gonesse)"
                />
                <TextInput
                  style={styles.inputservice}
                  onChangeText={onChangeS14BIS}
                  value={S14textBIS}
                  placeholder="Qualité d'air (Ex: 7)"
                />
                <View
              style={{
                  margin: 20,
                borderBottomColor: 'teal',
                borderBottomWidth: 1,
              }}
            />
                <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={SMSisSelected}
                  onValueChange={setSMSSelection}
                />
                <Text style={styles.textbox}>SMS</Text>
              </View>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeNumber}
                  value={phonenumber}
                  placeholder="Téléphone"
                />
                  <View style={styles.wrapper}>
                <CheckBox style={styles.box}
                  value={EMAILisSelected}
                  onValueChange={setEMAILSelection}
                />
              <Text style={styles.textbox}>email</Text>
              </View>

                <TextInput
                  style={styles.input}
                  onChangeText={onChangeMail}
                  value={emailaddress}
                  placeholder="e-mail"
                />
              <View style={styles.wrapper}>
                
                <CheckBox style={styles.box}
                  value={CALisSelected}
                  onValueChange={setCALSelection}
                />
              <Text style={styles.textbox}>Calendrier</Text>
              </View>
            </ScrollView>
            <Button
                title="Create Area"
                onPress={CreateAreaWithValue}
                />
        </Overlay>
        <GoogleLogin/>
        
        
        {/* <Text>{uid}</Text> */}


        <IconButton
          name='logout'
          size={24}
          color='#fff'
          onPress={handleSignOut}
            />
      </View>
        <View style={styles.container}>
        <CallUser uid={uid}/>
        </View>
        <View style={styles.updateButton}>    
        <Button title="Update" onPress={UpdateCards}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8A2BE2',
    paddingTop: 50,
    paddingHorizontal: 12
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff'
  },
  text: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#fff'
  },
  box: {
    // transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }]
  },
  textbox: {
    fontSize: 15,
    lineHeight: 30,
    marginLeft: 0,
  },
  textboxright: {
      fontSize: 15,
    lineHeight: 30,
    marginLeft: 50,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    paddingVertical: 0,
  },
  input: {
    lineHeight: 30,
  },
  inputservice: {
  },
  updateButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
