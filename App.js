import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { CustomButton } from './Components/CustomButton';

export default function App() {
  return (
    <View style={styles.container}>

      <StatusBar style="auto"/>

      <View style={[styles.cardcontainer, styles.shadows]}>
        <Image style={styles.cardimage} source={require('./assets/Creditcard/card.jpeg')}></Image>
      </View>

      <View style={[styles.form,styles.shadows]}>

        <View style={styles.row}>

          <View style={styles.expiration}>

            <Text>Expiration Date</Text>

            <View style={styles.row}>
              <TextInput style={styles.inputDate}></TextInput>
              <TextInput style={styles.inputDate}></TextInput>
            </View>

          </View>

          <View style={styles.cvv}>
            <Text>CVV</Text>
            <TextInput style={styles.inputCVV}></TextInput>
          </View>
        </View>

        <CustomButton title="Submit" onPress={() => {}} colorList={['#94c2dd','#e697d5','#4c7ddd']}></CustomButton>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#DBDAEA',
    justifyContent: 'center',
  },

  cardcontainer:{
    position: 'relative',
    width: '80%',
    maxWidth: 300,
    height: '26%',
    backgroundColor: 'gray',
    alignSelf: 'center',
    top: '13%',
    borderRadius: 16,
    overflow: 'hidden',
    zIndex:1,
  },

  cardimage:{
    flex: 1,
    width: null,
  },

  shadows:{
    shadowColor: '#211F37',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },

  row:{
    width: '100%',
    backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  form:{
    height: '50%',
    width: '90%',
    maxWidth: 550,
    backgroundColor: '#FAF9F6',
    alignSelf: 'center',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  expiration:{
    width: '60%',
    backgroundColor: 'yellow',
  },

  cvv:{
    width: '40%',
    backgroundColor: 'green',
  },

  inputDate:{
    width: '40%',
    backgroundColor: 'blue',
  },

  inputCVV:{
    width: '60%',
    backgroundColor: 'blue',
    paddingLeft: '10%'
  }
});
