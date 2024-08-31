import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { print,printToFile } from '../../services/pdfMaker';
const Invoice3 = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    amountDue: 0,
    clientName: '',
    clientAddress: '',
    items: [
      { id: 1, description: '', quantity: '', price: 0 },
      { id: 2, description: '', quantity: '', price: 0 },
    ],
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };
  const [preview, setPreview] = useState(0)
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Global styles */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            height: 100%;
        }
        .header {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
        }
        .headerText {
            font-size: 20px;
            font-weight: bold;
        }
        .body {
            padding-top: 20px;
        }
        .label {
            font-size: 16px;
            font-weight: bold;
        }
        .value {
            font-size: 16px;
            border-bottom: 1px solid #ccc;
            margin-bottom: 10px;
            padding: 5px;
        }
        .itemsContainer {
            padding-top: 20px;
        }
        .itemsHeader {
            font-size: 16px;
            font-weight: bold;
        }
        .itemRow {
            display: flex;
            padding: 10px 0;
            align-items: center;
        }
        .itemRowEven {
            background-color: #eee;
        }
        .itemRowOdd {
            background-color: #fff;
        }
        .itemDescription {
            flex: 1;
            font-size: 16px;
            border-bottom: 1px solid #ccc;
            padding: 5px;
        }
        .itemQuantity {
            width: 50px;
            font-size: 16px;
            text-align: center;
            border-bottom: 1px solid #ccc;
            padding: 5px;
        }
        .itemPrice {
            width: 100px;
            font-size: 16px;
            text-align: right;
            border-bottom: 1px solid #ccc;
            padding: 5px;
        }
        .clientInfo {
            display: flex;
            align-items: center;
            padding-top: 20px;
        }
        .clientText {
            flex: 1;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="headerText">INVOICE</h2>
        </div>
        <div class="clientInfo">
            <div class="clientText">
                <div class="label">Client:</div>
                <div class="value">${formData?.clientName}</div>
                <div class="value">${formData?.clientAddress}</div>
            </div>
        </div>
        <div class="body">
            <div class="label">Invoice Number:</div>
            <div class="value">${formData?.invoiceNumber}<</div>
            <div class="label">Invoice Date:</div>
            <div class="value">${formData?.invoiceDate}</div>
            <div class="label">Due Date:</div>
            <div class="value">${formData?.dueDate}</div>
            <div class="label">Amount Due:</div>
            <div class="value">$${formData?.amountDue}</div>
        </div>
        <div class="itemsContainer">
            <div class="itemsHeader">Items:</div>
            <!-- Repeat the following item rows dynamically based on your data -->
            <div class="itemRow itemRowEven">
                <div class="itemDescription">${formData?.items[0].description}</div>
                <div class="itemQuantity">${formData?.items[0].quantity}</div>
                <div class="itemPrice">$${formData?.items[0].price}</div>
            </div>
            <div class="itemRow itemRowOdd">
                <div class="itemDescription">${formData?.items[1].description}</div>
                <div class="itemQuantity">${formData?.items[1].quantity}</div>
                <div class="itemPrice">$${formData?.items[1].price}</div>
            </div>
        </div>
    </div>
</body>
</html>

`
  return (
    <View style = {styles.maincontainer}>
    <View style={styles.buttonContainer}>
      <Button style={styles.topButtons} mode = "contained" onPress={() => print(html)}>
      Print
      </Button>
      <Button style={styles.topButtons} mode = "contained" onPress={() => setPreview((old) => !old)}>
      {preview ? "Form" : "Preview"}
      </Button>
      <Button style={styles.topButtons} mode = "contained" onPress={() => printToFile(html)}>
       Share
      </Button>
    </View>
    {preview?<ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>INVOICE</Text>
      </View>
      <View style={styles.clientInfo}>
        <View style={styles.clientText}>
          <Text style={styles.label}>Client:</Text>
          <Text style={styles.value}>{formData.clientName}</Text>
          <Text style={styles.value}>{formData.clientAddress}</Text>
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Invoice Number:</Text>
        <Text style={styles.value}>{formData.invoiceNumber}</Text>
        <Text style={styles.label}>Invoice Date:</Text>
        <Text style={styles.value}>{formData.invoiceDate}</Text>
        <Text style={styles.label}>Due Date:</Text>
        <Text style={styles.value}>{formData.dueDate}</Text>
        <Text style={styles.label}>Amount Due:</Text>
        <Text style={styles.value}>{formData.amountDue}</Text>
      </View>
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsHeader}>Items:</Text>
        {formData.items.map((item, index) => {
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
    </ScrollView>:
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>INVOICE</Text>
      </View>
      <View style={styles.clientInfo}>
        <View style={styles.clientText}>
          <Text style={styles.label}>Client:</Text>
          <TextInput
            style={styles.value}
            value={formData.clientName}
            onChangeText={(value) => handleInputChange('clientName', value)}
            placeholder="Client Name"
          />
          <TextInput
            style={styles.value}
            value={formData.clientAddress}
            onChangeText={(value) => handleInputChange('clientAddress', value)}
            placeholder="Client Address"
            multiline
          />
        </View>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Invoice Number:</Text>
        <TextInput
          style={styles.value}
          value={formData.invoiceNumber}
          onChangeText={(value) => handleInputChange('invoiceNumber', value)}
          placeholder="Invoice Number"
        />
        <Text style={styles.label}>Invoice Date:</Text>
        <TextInput
          style={styles.value}
          value={formData.invoiceDate}
          onChangeText={(value) => handleInputChange('invoiceDate', value)}
          placeholder="Invoice Date"
        />
        <Text style={styles.label}>Due Date:</Text>
        <TextInput
          style={styles.value}
          value={formData.dueDate}
          onChangeText={(value) => handleInputChange('dueDate', value)}
          placeholder="Due Date"
        />
        <Text style={styles.label}>Amount Due:</Text>
        <TextInput
          style={styles.value}
          value={formData.amountDue}
          onChangeText={(value) => handleInputChange('amountDue', value)}
          placeholder="Amount Due"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.itemsContainer}>
        <Text style={styles.itemsHeader}>Items:</Text>
        {formData.items.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.itemRow,
              index % 2 === 0 ? styles.itemRowEven : styles.itemRowOdd,
            ]}
          >
            <TextInput
              style={styles.itemDescription}
              value={item.description}
              onChangeText={(value) => handleItemChange(index, 'description', value)}
              placeholder="Description"
            />
            <TextInput
              style={styles.itemQuantity}
              value={item.quantity}
              onChangeText={(value) => handleItemChange(index, 'quantity', value)}
              placeholder="Qty"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.itemPrice}
              value={item.price}
              onChangeText={(value) => handleItemChange(index, 'price', value)}
              placeholder="Price"
              keyboardType="numeric"
            />
          </View>
        ))}
      </View>
    </ScrollView>}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    height: '100%',
  },
  maincontainer:{
    flexGrow: 1,
    height:"100%",
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: "row" , justifyContent: 'space-evenly' 
 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
    padding: 5,
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
    alignItems: 'center',
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
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  itemQuantity: {
    width: 50,
    fontSize: 16,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  itemPrice: {
    width: 100,
    fontSize: 16,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 5,
  },
  clientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  clientText: {
    flex: 1,
  },
});

export default Invoice3;