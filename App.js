import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput} from 'react-native';
import { CustomButton } from './Components/CustomButton';
import { CustomModal } from './Components/Modaldropdown';
import React, { useState } from 'react';

export default function App() {
  const [month, setMonth] = useState('Month');
  const [year, setYear] = useState('Year');
  const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const years = ["2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034"];
  const handleMonthsSelect = (index, value) => {
    setMonth(value);
  }
  const handleYearsSelect = (index, value) => {
    setYear(value);
  }

  return (
    <View style={styles.container}>

      <StatusBar style="auto"/>

      <View style={[styles.cardcontainer, styles.shadows]}>
        <Image style={styles.cardimage} source={require('./assets/Creditcard/card.jpeg')}></Image>
      </View>

      <View style={[styles.form,styles.shadows]}>

        <Text style={styles.form_text}>Card Number</Text>
        <TextInput style={styles.input}></TextInput>
        
        <Text style={styles.form_text}>Card Holder</Text>
        <TextInput style={styles.input}></TextInput>

        <View style={styles.row}>

          <View style={styles.form_group_modal}>

            <Text style={styles.form_text}>Expiration Date</Text>

            <View style={styles.form_group_modal_row}>
              {/* <TextInput style={styles.inputDate}></TextInput> */}
              <CustomModal handleOptionSelect={handleMonthsSelect} defaultValue={"Month"} options={months}></CustomModal>
              <CustomModal handleOptionSelect={handleYearsSelect} defaultValue={"Year"} options={years}></CustomModal>
              {/* <TextInput style={styles.inputDate}></TextInput> */}
            </View>

          </View>

          <View style={styles.form_cvv}>
            <Text style={styles.form_text}>CVV</Text>
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

  form:{
    height: '50%',
    width: '90%',
    maxWidth: 550,
    backgroundColor: '#FAF9F6',
    alignSelf: 'center',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'flex-end',
  },

  row:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    
  },
  
  form_group_modal:{
    width: '65%',
  },

  form_group_modal_row:{
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  form_cvv:{
    width: '35%',
    paddingLeft: '10%'
  },

  inputCVV:{
    width: '100%',
    height: 40,
    borderColor: '#94c2dd',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: '10%',
    color: '#5A83BA',
    fontSize: 16,
  },

  form_text:{
    fontSize: 14,
  },

  input:{
    width: '100%',
    height: 40,
    borderColor: '#94c2dd',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: '2%',
  },

});
