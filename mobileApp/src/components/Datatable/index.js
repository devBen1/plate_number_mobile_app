/* eslint-disable no-shadow */
import React from 'react';
import { DataTable } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const optionsPerPage = [2, 3, 4];

const Datatable = ({ headData = ['FRSC Number', 'Plate No', 'Vehicle Name'], bodyData, type = 'default' }) => {
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.container}>
      <DataTable>
        <DataTable.Header>
          {headData.map((item, index) => (
            <DataTable.Title key={index}>{item}</DataTable.Title>
          ))}
        </DataTable.Header>

        {bodyData.map((item, index) => (
          <>
            {type === 'default' ?
              <>
                <DataTable.Row key={index}>
                  <DataTable.Cell key={index}>{item.frscRegNo}</DataTable.Cell>
                  <DataTable.Cell key={index}>{item.plateNo}</DataTable.Cell>
                  <DataTable.Cell key={index}>{item.vehicleinfos[0].vehicleName}</DataTable.Cell>
                  {/* <DataTable.Cell key={index}>
                    <AntDesign name="edit" color="grey" size={12} />
                    <AntDesign name="delete" color="red" size={12} />
                  </DataTable.Cell> */}
                </DataTable.Row>
              </>
              :
              <>
                <DataTable.Row key={index}>
                  <DataTable.Cell key={index}>{item.userFullName}</DataTable.Cell>
                  <DataTable.Cell key={index}>{item.userEmail}</DataTable.Cell>
                  <DataTable.Cell key={index}>{item.role}</DataTable.Cell>
                </DataTable.Row>
              </>
            }
          </>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={3}
          onPageChange={(page) => setPage(page)}
          label="1-2 of 6"
          optionsPerPage={optionsPerPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          showFastPagination
          optionsLabel={'Rows per page'}
        />
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
