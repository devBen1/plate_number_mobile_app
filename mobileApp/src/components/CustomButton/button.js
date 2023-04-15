import React from 'react';
import {Text, StyleSheet, Pressable, ActivityIndicator} from 'react-native';

const Button = ({onPress, text, type = 'PRIMARY', loading = {}}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}>
      {loading.status ? (
        <ActivityIndicator
          size={loading.size}
          style={loading.styles}
          color={loading.color}
        />
      ) : (
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#3B71F3',
  },
  container_SECONDARY: {},
  container_TERTIARY: {},
  text: {
    fontWeight: 'bold',
  },
  text_PRIMARY: {
    color: 'white',
  },
  text_SECONDARY: {},
  text_TERTIARY: {},
});

export default Button;
