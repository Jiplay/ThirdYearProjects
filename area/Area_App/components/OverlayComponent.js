import React, { useState } from 'react';
import { Button, Overlay, Icon } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

type OverlayComponentProps = {};

const OverlayComponent: React.FunctionComponent<OverlayComponentProps> = () => {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

const SelectAction = () => {
    toggleOverlay();
};

  return (
    <View>
      <Button
        title="Dashboard"
        onPress={toggleOverlay}
        buttonStyle={styles.button}
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>Choose your Actions:</Text>
        <Button
            buttonStyle={styles.button2}
          icon={
            <Icon
              name="github"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Github"
          onPress={SelectAction}
        />
        <Button
            buttonStyle={styles.button2}
          icon={
            <Icon
              name="gitlab"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10 }}
            />
          }
          title="Gitlab"
          onPress={toggleOverlay}
        />
        <Button
            buttonStyle={styles.button2}
          icon={
            <Icon
              name="twitch"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10}}
            />
          }
          title="Twitch"
          onPress={toggleOverlay}
        />
        <Button
            buttonStyle={styles.button2}
          icon={
            <Icon
              name="twitter"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10}}
            />
          }
          title="Twitter follow"
          onPress={toggleOverlay}
        />
        
        <Button
            buttonStyle={styles.button2}
          icon={
            <Icon
              name="twitter-with-circle"
              type="entypo"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10}}
            />
          }
          title="Twitter Ligne H"
          onPress={toggleOverlay}
        />  

        <Button
            buttonStyle={styles.button2}
          icon={
            <Icon
              name="retweet"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10}}
            />
          }
          title="Twitter Mentions"
          onPress={toggleOverlay}
        />  

        <Button
            buttonStyle={styles.button2}
          icon={
            <Icon
              name="newspaper-o"
              type="font-awesome"
              color="white"
              size={25}
              iconStyle={{ marginRight: 10}}
            />
          }
          title="Newspaper"
          onPress={toggleOverlay}
        />
      </Overlay>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'gray',
  },
  button2: {
    backgroundColor: 'gray',
  },
  textPrimary: {
    marginVertical: 10,
    textAlign: 'center',
    fontSize: 20,
  },
});

export default OverlayComponent;