import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = props => {
  return (
    <View style={styles.card}>
      <View style={styles.column}>
        <View style={styles.colBody}>{props.children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  column: {
    float: 'left',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingRight: 10,
  },
  colBody: {
    boxShadow: '0 4 8 0 rgba(0, 0, 0, 0.2)',
    padding: 20,
    alignItems: 'center',
  },
});

export default Card;
