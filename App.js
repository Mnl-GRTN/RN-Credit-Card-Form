import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TextInput, Animated, ScrollView, Image} from 'react-native';
import { CustomButton } from './Components/CustomButton';
import { CustomModal } from './Components/Modaldropdown';
import React, { useState, useRef } from 'react';

export default function App() {
  //Form States and Options
  const [month, setMonth] = useState('MM');
  const [year, setYear] = useState('YY');
  const [cvv, setCvv] = useState('XXX');
  const [cvvInput, setCvvInput] = useState('');
  const [cardHolder, setCardHolder] = useState('Name');
  const [src , setSrc] = useState(require('./assets/Creditcard/visa.png'));
  const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
  const years = ["2023","2024","2025","2026","2027","2028","2029","2030","2031","2032","2033","2034"];

  // Special State for the card number to handle the inputs
  let defaultCardNumber = '#### #### #### ####';
  const [cardNumber, setCardNumber] = useState(defaultCardNumber);
  const [cardNumberInputRef, setCardNumberRef] = useState(''); // Create a ref for card number input

  // Card Types
  const cardTypes = {
    amex: { startPattern: /^(34|37)/, mask: '#### ###### #####', image: require('./assets/Creditcard/amex.png') },
    visa: { startPattern: /^4/, mask: '#### #### #### ####', image: require('./assets/Creditcard/visa.png') },
    mastercard: { startPattern: /^5[1-5]/, mask: '#### #### #### ####', image: require('./assets/Creditcard/mastercard.png') },
    discover: { startPattern: /^6/, mask: '#### #### #### ####', image: require('./assets/Creditcard/discover.png') },
    dinersclub: { startPattern: /^(30|36|38)/, mask: '#### ###### #####', image: require('./assets/Creditcard/dinersclub.png') },
  };

  // Function to identify the card type
  const identifyCardType = (cardNumberInput) => {
    for (const type in cardTypes) {
      // Check if the first digits match the card type
      if (cardTypes[type].startPattern.test(cardNumberInput)) {
        return cardTypes[type];
      }
    }
    return { mask: '#### #### #### ####', image: require('./assets/Creditcard/visa.png') }; // Default card type
  };
  
  // Function to handle the card number input
  const handleCardNumberInput = (cardNumberInput) => {
    const regex = /^[0-9]*$/;
    const { mask, image } = identifyCardType(cardNumberInput.substring(0, 2)); // Check the first two digits
  
    let updatedCardNumber = '';
    let formattedInput = '';
    let j = 0;
  
    const cleanedCardNumberInput = cardNumberInput.replace(/\s/g, '');
  
    if (regex.test(cleanedCardNumberInput)) {
      for (let i = 0; i < mask.length; i++) {
        if (mask[i] === '#') {
          if (j < cleanedCardNumberInput.length) {
            if (j < 4 || j > 11) {
              updatedCardNumber += cleanedCardNumberInput[j];
            } else {
              updatedCardNumber += '●';
            }
            formattedInput += cleanedCardNumberInput[j];
            j++;
          } else {
            updatedCardNumber += '#';
          }
        } else if (mask[i] === ' ') {
          updatedCardNumber += ' ';
          formattedInput += ' ';
        }
      }
  
      formattedInput = formattedInput.replace(/[^0-9\s]/g, '');
      formattedInput = formattedInput.replace(/\s+$/, '');
  
      setSrc(image);
      setCardNumber(updatedCardNumber);
      setCardNumberRef(formattedInput);
    } else {
      setCardNumberRef(cardNumberInput.replace(/[^0-9]/g, ''));
    }
  };
  
  const handleCVVInput = (cvvInput) => {
    // Remove any non-digit characters
    const cleanedCVVInput = cvvInput.replace(/[^0-9]/g, '');
  
    // Set the display value based on the input length or placeholder
    const newCVVInput = cleanedCVVInput.length > 0 ? cleanedCVVInput : '';
  
    // Update the displayed CVV and the actual input value separately
    setCvvInput(newCVVInput);
    setCvv(cleanedCVVInput);
  };
  
  // Function to handle the card holder input
  const handleCardHolderInput = (cardHolderInput) => {
    if (cardHolderInput === '') {
      setCardHolder('Name');
    }
    else if (cardHolderInput.length > 15) {
      setCardHolder(cardHolderInput.slice(0,15)+'...');
    }
    else{
      setCardHolder(cardHolderInput);
    }
  };

  //Form Handlers
  const handleMonthsSelect = (index,value) => {
    setMonth(value);
  }
  const handleYearsSelect = (index,value) => {
    setYear(value.slice(-2));
  }


  
  //State to set visibility of card elements
  const [visibleOnCard, setvisibleOnCard] = useState(true);

  // Card Animation

  // useRef to keep the value of the animated value between renders
  const animatedValue = useRef(new Animated.Value(0)).current;
  
  // Function to rotate the card
  const rotateCard = (toValue) => {
    setvisibleOnCard(!visibleOnCard);
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Interpolate the animated value to rotate the card
  const rotateY = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });



  return (
    // ScrollView to unfocus the input when the user clicks outside of it
    <ScrollView contentContainerStyle={styles.container}>

      <StatusBar style="auto"/>

      <Animated.View style={[styles.cardcontainer, styles.shadows, { transform : [{ rotateY }] } ]}>
        {/* ImageBackground to allow children */}
        <ImageBackground style={styles.cardimage} source={require('./assets/Creditcard/card.jpeg')}>
          {visibleOnCard && <Image source={require('./assets/Creditcard/chip.png')} style={styles.card_chip}></Image>}
          <Animated.Image source={src} style={[styles.card_network, {transform: [{rotateY}] } ]}></Animated.Image>
          {visibleOnCard && <Text style={styles.card_number}>{cardNumber}</Text>}
          {visibleOnCard && <Text style={styles.card_holder_label}>Card Holder</Text>}
          {visibleOnCard && <Text style={styles.card_holder}>{cardHolder}</Text>}
          {visibleOnCard && <Text style={styles.card_expiration_label}>Expires</Text>}
          {visibleOnCard && <Text style={styles.card_expiration}>{month}/{year}</Text>}
          {visibleOnCard === false &&
          <Animated.View style={[styles.card_container_cvv, {transform : [{rotateY}] }]}>
            <Text style={styles.card_cvv}>CVV : {cvv}</Text>
          </Animated.View>}
        </ImageBackground>
      </Animated.View>

      <View style={[styles.form,styles.shadows]}>

        <Text style={styles.form_text}>Card Number</Text>
        <TextInput
        value={cardNumberInputRef}
        style={styles.input}
        onChangeText={cardNumberInput => handleCardNumberInput(cardNumberInput)}
        autoComplete='cc-number'
        inputMode='numeric'
        keyboardType='numeric'
        maxLength={20}/>
        
        <Text style={styles.form_text}>Card Holder</Text>
        <TextInput
        style={styles.input}
        onChangeText={newCardHolder => handleCardHolderInput(newCardHolder)}
        autoComplete='family-name'/>

        <View style={styles.row}>

          <View style={styles.form_group_modal}>

            <Text style={styles.form_text}>Expiration Date</Text>

            <View style={styles.form_group_modal_row}>
              <CustomModal handleOptionSelect={handleMonthsSelect} defaultValue={"Month"} options={months}></CustomModal>
              <CustomModal handleOptionSelect={handleYearsSelect} defaultValue={"Year"} options={years}></CustomModal>
            </View>

          </View>

          <View style={styles.form_cvv}>
            <Text style={styles.form_text}>CVV</Text>
            <TextInput
            style={styles.inputCVV}
            onFocus={() => {rotateCard(180)}}
            onBlur={() => {rotateCard(0)}}
            value={cvvInput}
            onChangeText={newCVV => handleCVVInput(newCVV)}
            inputMode='numeric'
            keyboardType='numeric'
            maxLength={3}/>
          </View>

        </View>

        <CustomButton title="Submit" onPress={() => {}} colorList={['#94c2dd','#e697d5','#4c7ddd']}></CustomButton>
      </View>

    </ScrollView>
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
    width: 300,
    height: 200,
    backgroundColor: 'gray',
    alignSelf: 'center',
    top: 100,
    borderRadius: 16,
    overflow: 'hidden',
    zIndex:100,
  },

  cardimage:{
    flex: 1,
    display: 'flex',
    justifyContent:'center',
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
    height: 400,
    width: '90%',
    maxWidth: 550,
    maxHeight: 450,
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
    paddingLeft: 8,
    color: '#5A83BA',
    fontSize: 16,
  },

  form_text:{
    fontSize: 14,
  },

  input:{
    width: '100%',
    height: 40,
    color: '#5A83BA',
    fontSize: 16,
    borderColor: '#94c2dd',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: '2%',
    paddingLeft: 8,
  },

  card_expiration:{
    position: 'absolute',
    right: 24,
    bottom: 24,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },

  card_holder:{
    position: 'absolute',
    left: 24,
    bottom: 24,
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },

  card_holder_label:{
    position: 'absolute',
    left: 24,
    bottom: 48,
    fontSize: 13,
    color: '#071a50',
    fontWeight: '700',
    letterSpacing: 1,
  },

  card_expiration_label:{
    position: 'absolute',
    right: 24,
    bottom: 48,
    fontSize: 13,
    color: '#071a50',
    fontWeight: '700',
    letterSpacing: 1,
  },

  card_chip:{
    position: 'absolute',
    top: 16,
    left: 24,
    resizeMode: 'contain',
    width: '25%',
    height: '25%',
  },

  card_network:{
    position: 'absolute',
    top: 16,
    right: 24,
    resizeMode: 'contain',
    width: '25%',
    height: '25%',
  },

  card_number:{
    position: 'relative',
    left: 24,
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold',
  },

  card_container_cvv:{
    position: 'absolute',
    width: '90%',
    height: '20%',
    backgroundColor: 'white',
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems:'flex-end',
    paddingRight: 16,
  },

  card_cvv:{
    fontSize: 14,
    color: '#071a50',
    fontWeight: '700',
    letterSpacing: 1,
  }


});
