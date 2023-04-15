import React from 'react';
import {DataTable} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

const Datatable = (header, body) => {
  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Plate No</DataTable.Title>
          <DataTable.Title>Vehicle Name</DataTable.Title>
          <DataTable.Title>Validity Date</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>SM700-FST</DataTable.Cell>
          <DataTable.Cell>Toyota Camery</DataTable.Cell>
          <DataTable.Cell>2020-03-30</DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingHorizontal: 0,
  },
});

export default Datatable;
