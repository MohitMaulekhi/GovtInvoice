import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { print,printToFile } from '../../services/pdfMaker';

export default Invoice1 = () => {
  
  const [preview, setPreview] = useState(1)
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
            padding: 20px;
            margin-top: 80px;
        }
        .divider {
            border-bottom: 1px solid #ccc;
            margin: 20px 0;
        }
        .bold {
            font-weight: bold;
        }

        /* Header styles */
        .header {
            text-align: center;
        }
        .title {
            font-size: 24px;
            font-weight: bold;
        }

        /* Invoice info styles */
        .invoice-info {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
        }

        /* Customer info styles */
        .customer-info {
            margin-top: 20px;
        }
        .subtitle {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        /* Item styles */
        .item {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
        }
        .item-name {
            font-size: 16px;
        }
        .item-total {
            font-weight: bold;
        }

        /* Total styles */
        .total-container {
            display: flex;
            justify-content: flex-end;
            margin-top: 20px;
        }
        .total {
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2 class="title">Invoice</h2>
        </div>
        <div class="invoice-info">
            <div class="bold">Invoice Number:</div>
            <div>${invoiceData?.invoiceNumber}</div>
        </div>
        <div class="invoice-info">
            <div class="bold">Invoice Date:</div>
            <div>${invoiceData?.invoiceDate}</div>
        </div>
        <div class="divider"></div>
        <div class="customer-info">
            <div class="subtitle">Customer Information</div>
            <div class="bold">Name:</div>
            <div>${invoiceData?.customerName}</div>
            <div class="bold">Email:</div>
            <div>${invoiceData?.customerEmail}</div>
            <div class="bold">Address:</div>
            <div>${invoiceData?.customerAddress}</div>
        </div>
        <div class="divider"></div>
        <div class="subtitle">Invoice Items</div>
        <div class="item">
            <div class="item-name">${invoiceData?.items[0].name}</div>
            <div>${invoiceData?.items[0].quantity} x $${invoiceData?.items[0].price}</div>
            <div class="item-total">$${invoiceData?.items[0].total}</div>
        </div>
        <div class="item">
            <div class="item-name">${invoiceData?.items[1].name}</div>
            <div>${invoiceData?.items[1].quantity} x $${invoiceData?.items[1].price}</div>
            <div class="item-total">$${invoiceData?.items[1].total}</div>
        </div>
        <div class="divider"></div>
        <div class="total-container">
            <div class="bold">Total:</div>
            <div class="total">${invoiceData?.total}</div>
        </div>
    </div>
</body>
</html>`
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
  return <SafeAreaView style={{backgroundColor: '#f3f3f5' ,marginBottom:100}}>
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
    {preview ? (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Invoice</Text>
        </View>
        <View style={styles.invoiceInfoContainer}>
          <View style={styles.invoiceInfo}>
            <Text style={styles.label}>Invoice Number:</Text>
            <Text style={styles.text}>{invoiceData.invoiceNumber}</Text>
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.label}>Invoice Date:</Text>
            <Text style={styles.text}>{invoiceData.invoiceDate}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.customerInfoContainer}>
          <Text style={styles.subtitle}>Customer Information</Text>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.text}>{invoiceData.customerName}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.text}>{invoiceData.customerEmail}</Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.text}>{invoiceData.customerAddress}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.itemsContainer}>
          <Text style={styles.subtitle}>Invoice Items</Text>
          {invoiceData.items.map((item) => (
            <View style={styles.item} key={item.id}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDetails}>
                {item.quantity} x ${item.price}
              </Text>
              <Text style={styles.itemTotal}>${item.total}</Text>
            </View>
          ))}
        </View>
        <View style={styles.divider} />
        <View style={styles.totalContainer}>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.total}>${invoiceData.total}</Text>
        </View>
      </ScrollView>
    ) : (
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
    )}</SafeAreaView>
};

const styles = StyleSheet.create({
  main: {
    height: "100%",
    width: "100%",
    flex: 1,
    flexDirection: 'row',
  },
  buttonContainer: {
     flexDirection: "row" , justifyContent: 'space-evenly' 
  },
  container: {
    padding: 20,
    height: "100%",
  },
  topButtons: {
    width: "25%",
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