import React from 'react';
import ModalDropdown from 'react-native-modal-dropdown';
import { StyleSheet } from 'react-native';

export const CustomModal = ({handleOptionSelect, options, defaultValue}) => {
    
    return(
        <ModalDropdown
            defaultValue={defaultValue}
            options={options}
            style={styles.inputDate}
            dropdownStyle={styles.dropdown}
            dropdownTextStyle={styles.dropdownText}
            textStyle={styles.dropdownHeadText}
            onSelect={handleOptionSelect}
            defaultIndex={0}>
        </ModalDropdown>
    );
};

    const styles = StyleSheet.create({
        inputDate:{
            width: '45%',
            height: 40,
            justifyContent: 'center',
            borderColor: '#94c2dd',
            borderWidth: 1,
            borderRadius: 6,
            paddingLeft: '3%',
        },
        
        dropdown:{
            width: '30%',
        },
        
        dropdownText:{
            fontSize: 16,
        },
        
        dropdownHeadText:{
            fontSize: 16,
            color: '#5A83BA',
        }
    });
