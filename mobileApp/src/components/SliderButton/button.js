import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

const SliderButton = ({ onPress, text, type, loading = {} }) => {
    return (
        <TouchableOpacity style={[styles.button, styles[`button_${type}`]]} onPress={onPress}>
            {loading.status ? (
                <ActivityIndicator
                    size={loading.size}
                    style={loading.styles}
                    color={loading.color}
                />
            ) : (
                <Text style={styles.text}>{text}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 45,
        width: 80,
        height: 35,
        backgroundColor: '#3B71F3',
        elevation: 10,
        borderRadius: 20,
    },
    button_LEFT: {
        left: 10,
    },
    button_RIGHT: {
        right: 10,
    },
});

export default SliderButton;
