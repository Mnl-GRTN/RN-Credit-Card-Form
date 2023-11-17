import React from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const CustomButton = ({title, onPress, colorList}) => {
    return (
        <TouchableOpacity style={styles.pressable_button} onPress={onPress}>
            <LinearGradient style={styles.gradient_button} colors={colorList} start={{x: 0, y: 0}} end={{x:1, y:0}}>
                <Text style={{color:'white', fontWeight: 'bold'}}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    pressable_button: {
        borderRadius: 8,
        width:'100%',
        height:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginVertical: 12,
        overflow: 'hidden',
        alignSelf: 'center',
    },

    gradient_button: {
        flex: 1,
        width: "100%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

