import React, {useState} from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Icon } from 'react-native-elements';
import OverlayComponent from '../components/OverlayComponent'

type TwitchCardsComponentsProps = {};

const TwitchCards: React.FunctionComponent<TwitchCardsComponentsProps> = () => {

    const [showing, setShowing] = useState(true);

  return (
    <>
      <ScrollView >
        <View style={styles.container}>
          {showing ? (<Card>
          <Button
                icon={
                <Icon
                    name="cross"
                    type="entypo"
                    color="white"
                    size={15}
                />
                }
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)' }}
              onPress={() => setShowing(!showing)}/>
            <Card.Title>Twitch
          </Card.Title>
            <Card.Divider />
            <Text style={styles.cardcontent}>1</Text>
            <Text style={styles.cardcontent}>2</Text>
            <Text style={styles.cardcontent}>3</Text>
          </Card>
          ) : null }
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  cardcontent: {
      textAlign: 'center',
  }
});

export default TwitchCards;