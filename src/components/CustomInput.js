import React from 'react';
import { View, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../data/colors';
import styles2 from '../data/styles';

const CustomInput = ({ iconName, placeholder, value, onChangeText, secureTextEntry = false }) => {
    return (
        <View style={styles2.inputContainer}>
            <AntDesign name={iconName} size={20} color={colors.icon} />
            <TextInput
                style={styles2.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                placeholderTextColor="#999"
                secureTextEntry={secureTextEntry} // Optionally hide the input text
            />
        </View>
    );
};

export default CustomInput;
