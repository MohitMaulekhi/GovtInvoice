import React from 'react';
import { StyleSheet, View, Text, Image, Button } from 'react-native';

const Invoice3 = () => {

  const i = {
    invoiceNumber: '12345',
    invoiceDate: '01/01/2022',
    dueDate: '01/15/2022',
    amountDue: '$100.00',
    client: {
      name: 'John Doe',
      address: '123 Main St\nAnytown, USA 12345',
      logo: 'https://www.bootdey.com/image/280x280/FF00FF/000000',
    },
    items: [
      {
        id: 1,
        description: 'Item 1',
        quantity: 2,
        price: '$50.00',
      },
      {
        id: 2,
        description: 'Item 2',
        quantity: 1,
        price: '$25.00',
      },
      {
        id: 3,
        description: 'Item 3',
        quantity: 3,
        price: '$25.00',
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>INVOICE</Text>
      </View>
      <View style={styles.clientInfo}>
        <View style={styles.clientText}>
          <Text style={styles.label}>Client:</Text>
          <Text style={styles.value}>{i.client.name}</Text>
          <Text style={styles.value}>{i.client.address}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Invoice Number:</Text>
        <Text style={styles.value}>{i.invoiceNumber}</Text>
        <Text style={styles.label}>Invoice Date:</Text>
        <Text style={styles.value}>{i.invoiceDate}</Text>
        <Text style={styles.label}>Due Date:</Text>
        <Text style={styles.value}>{i.dueDate}</Text>
        <Text style={styles.label}>Amount Due:</Text>
        <Text style={styles.value}>{i.amountDue}</Text>
      </View>
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsHeader}>Items:</Text>
        {i.items.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <View
              key={item.id}
              style={[
                styles.itemRow,
                isEven ? styles.itemRowEven : styles.itemRowOdd,
              ]}
            >
              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemQuantity}>{item.quantity}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    height:"100%"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  body: {
    paddingTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  itemsContainer: {
    paddingTop: 20,
  },
  itemsHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemRowEven: {
    backgroundColor: '#eee',
  },
  itemRowOdd: {
    backgroundColor: '#fff',
  },
  itemDescription: {
    flex: 1,
    fontSize: 16,
  },
  itemQuantity: {
    width: 50,
    fontSize: 16,
    textAlign: 'center',
  },
  itemPrice: {
    width: 100,
    fontSize: 16,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 20,
  },
  button: {
    marginLeft: 10,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  clientLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  clientText: {
    flex: 1,
  },
});


export default Invoice3;


                                            