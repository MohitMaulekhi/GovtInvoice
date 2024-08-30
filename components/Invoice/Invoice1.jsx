import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';



export default Invoice1 = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    customerName: '',
    customerEmail: '',
    customerAddress: '',
    items: [
      { id: 1, name: '', quantity: '', price: '', total: '' },
      { id: 2, name: '', quantity: '', price: '', total: '' },
    ],
    total: '',
  });

  const handleOnChange = (name, value, index = null) => {
    if (index !== null) {
      // Update a specific item in the items array
      const updatedItems = [...invoiceData.items];
      updatedItems[index][name] = value;
      setInvoiceData({ ...invoiceData, items: updatedItems });
    } else {
      // Update other fields in the invoiceData object
      setInvoiceData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const calculateTotal = () => {
    const total = invoiceData.items.reduce((sum, item) => {
      const itemTotal = parseFloat(item.quantity) * parseFloat(item.price);
      return sum + (isNaN(itemTotal) ? 0 : itemTotal);
    }, 0);
    setInvoiceData({ ...invoiceData, total: total.toFixed(2) });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoice</Text>
      </View>
      <View style={styles.invoiceInfoContainer}>
        <View style={styles.invoiceInfo}>
          <Text style={styles.label}>Invoice Number:</Text>
          <TextInput
            style={styles.input}
            value={invoiceData.invoiceNumber}
            onChangeText={(value) => handleOnChange('invoiceNumber', value)}
            placeholder="Enter Invoice Number"
          />
        </View>
        <View style={styles.invoiceInfo}>
          <Text style={styles.label}>Invoice Date:</Text>
          <TextInput
            style={styles.input}
            value={invoiceData.invoiceDate}
            onChangeText={(value) => handleOnChange('invoiceDate', value)}
            placeholder="Enter Invoice Date"
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.customerInfoContainer}>
        <Text style={styles.subtitle}>Customer Information</Text>
        <View style={styles.customerInfo}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={invoiceData.customerName}
            onChangeText={(value) => handleOnChange('customerName', value)}
            placeholder="Enter Customer Name"
          />
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={invoiceData.customerEmail}
            onChangeText={(value) => handleOnChange('customerEmail', value)}
            placeholder="Enter Customer Email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.customerInfo}>
          <Text style={styles.label}>Address:</Text>
          <TextInput
            style={styles.input}
            value={invoiceData.customerAddress}
            onChangeText={(value) => handleOnChange('customerAddress', value)}
            placeholder="Enter Customer Address"
          />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.itemsContainer}>
        <Text style={styles.subtitle}>Invoice Items</Text>
        {invoiceData.items.map((item, index) => (
          <View style={styles.item} key={item.id}>
            <TextInput
              style={styles.itemNameInput}
              value={item.name}
              onChangeText={(value) => handleOnChange('name', value, index)}
              placeholder="Item Name"
            />
            <TextInput
              style={styles.itemDetailsInput}
              value={item.quantity}
              onChangeText={(value) => handleOnChange('quantity', value, index)}
              placeholder="Quantity"
              keyboardType="numeric"
              onBlur={calculateTotal} // Recalculate total on quantity change
            />
            <TextInput
              style={styles.itemDetailsInput}
              value={item.price}
              onChangeText={(value) => handleOnChange('price', value, index)}
              placeholder="Price"
              keyboardType="numeric"
              onBlur={calculateTotal} // Recalculate total on price change
            />
          </View>
        ))}
      </View>
      <View style={styles.divider} />
      <View style={styles.totalContainer}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.total}>${invoiceData.total}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  invoiceInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  invoiceInfo: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  customerInfoContainer: {
    marginTop: 20,
  },
  customerInfo: {
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemsContainer: {
    marginTop: 20,
  },
  item: {
    marginBottom: 10,
  },
  itemNameInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemDetailsInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  itemTotal: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});