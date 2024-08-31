import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import { Button } from 'react-native-paper';
import { print,printToFile } from '../../services/pdfMaker';

const Invoice2 = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    toName: '',
    address: '',
    email: '',
    uiDesign: 0,
    uxDesign: 0,
    direction: 0,
    logoDesign: 0,
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const calculateSubtotal = () => {
    const { uiDesign, uxDesign, direction, logoDesign } = formData;
    return (parseFloat(uiDesign) + parseFloat(uxDesign) + parseFloat(direction) + parseFloat(logoDesign)).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = (subtotal * 0.06).toFixed(2); // Assuming 6% tax rate
    return (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);
  };
  
  const [preview, setPreview] = useState(0)
  const html = `<!DOCTYPE html>
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
            <div>${formData?.invoiceDate}</div>
        </div>
        <div class="invoice-info">
            <div class="bold">Invoice Date:</div>
            <div>${formData?.invoiceDate}</div>
        </div>
        <div class="divider"></div>
        <div class="customer-info">
            <div class="subtitle">Customer Information</div>
            <div class="bold">Name:</div>
            <div>${formData?.toName}</div>
            <div class="bold">Email:</div>
            <div>${formData?.email}</div>
            <div class="bold">Address:</div>
            <div>${formData?.address}</div>
        </div>
        <div class="divider"></div>
        <div class="subtitle">Invoice Items</div>
        <div class="item">
            <div class="item-name">UI Design</div>
            <div>$${formData?.uiDesign}</div>
        </div>
        <div class="item">
            <div class="item-name">UX Design</div>
            <div>$${formData.uxDesign}</div>
        </div>
        <div class="item">
            <div class="item-name">Direction</div>
            <div>$${formData.direction}</div>
        </div>
        <div class="item">
            <div class="item-name">Logo Design</div>
            <div>$${formData.logoDesign}</div>
        </div>
        <div class="divider"></div>
        <div class="item">
            <div class="item-name">Subtotal</div>
            <div>${calculateSubtotal()}</div>
        </div>
        <div class="item">
            <div class="item-name">Tax (6%)</div>
            <div>$${(calculateSubtotal() * 0.06).toFixed(2)}</div>
        </div>
        <div class="divider"></div>
        <div class="total-container">
            <div class="bold">Total</div>
            <div class="total">$${calculateTotal()}</div>
        </div>
    </div>
</body>
</html>
`
  return <View style = {styles.maincontainer}>
    <View style={styles.buttonContainer}>
      <Button mode = "contained" onPress={() => print(html)}>
      Print
      </Button>
      <Button mode = "contained" onPress={() => setPreview((old) => !old)}>
      {preview ? "Form" : "Preview"}
      </Button>
      <Button mode = "contained" onPress={() => printToFile(html)}>
       Share
      </Button>
    </View>
    {preview?
    <ScrollView contentContainerStyle={styles.container}>
       <Text style={styles.title}>Invoice</Text>
       <Text style={styles.date}>{formData.invoiceDate}/ No.{formData.invoiceDate}</Text>
       <View style={styles.info}>
         <Text style={styles.infoText}>To: {formData.toName}</Text>
         <Text style={styles.infoText}>Add: {formData.address}</Text>
         <Text style={styles.infoText}>Mail: {formData.email}</Text>
       </View>
       <View style={styles.divider} />
       <View style={styles.itemRow}>
         <Text style={styles.itemText}>UI Design</Text>
         <Text style={styles.itemText}>${formData.uiDesign}</Text>
       </View>
       <View style={styles.itemRow}>
         <Text style={styles.itemText}>UX Design</Text>
         <Text style={styles.itemText}>${formData.uxDesign}</Text>
       </View>
       <View style={styles.itemRow}>
         <Text style={styles.itemText}>Direction</Text>
         <Text style={styles.itemText}>${formData.direction}</Text>
       </View>
       <View style={styles.itemRow}>
         <Text style={styles.itemText}>Logo Design</Text>
         <Text style={styles.itemText}>${formData.logoDesign}</Text>
       </View>
       <View style={styles.divider} />
       <View style={styles.itemRow}>
         <Text style={styles.itemText}>Subtotal</Text>
         <Text style={styles.itemText}>${calculateSubtotal()}</Text>
       </View>
       <View style={styles.itemRow}>
         <Text style={styles.itemText}>Tax</Text>
         <Text style={styles.itemText}>${(calculateSubtotal() * 0.06).toFixed(2)}</Text>
       </View>
       <View style={styles.divider} />
       <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
         <Text style={styles.totalText}>${calculateTotal()}</Text>
       </View>
     </ScrollView>
  :
  
    
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Invoice</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={formData.invoiceDate}
          onChangeText={(value) => handleInputChange('invoiceDate', value)}
          placeholder="Invoice Date"
        />
        <TextInput
          style={styles.input}
          value={formData.invoiceNumber}
          onChangeText={(value) => handleInputChange('invoiceNumber', value)}
          placeholder="Invoice Number"
        />
      </View>

      <View style={styles.info}>
        <TextInput
          style={styles.infoInput}
          value={formData.toName}
          onChangeText={(value) => handleInputChange('toName', value)}
          placeholder="Recipient's Name"
        />
        <TextInput
          style={styles.infoInput}
          value={formData.address}
          onChangeText={(value) => handleInputChange('address', value)}
          placeholder="Recipient's Address"
        />
        <TextInput
          style={styles.infoInput}
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          placeholder="Recipient's Email"
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.itemRow}>
        <Text style={styles.itemText}>UI Design</Text>
        <TextInput
          style={styles.input}
          value={formData.uiDesign}
          onChangeText={(value) => handleInputChange('uiDesign', value)}
          placeholder="$0.00"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>UX Design</Text>
        <TextInput
          style={styles.input}
          value={formData.uxDesign}
          onChangeText={(value) => handleInputChange('uxDesign', value)}
          placeholder="$0.00"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Direction</Text>
        <TextInput
          style={styles.input}
          value={formData.direction}
          onChangeText={(value) => handleInputChange('direction', value)}
          placeholder="$0.00"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Logo Design</Text>
        <TextInput
          style={styles.input}
          value={formData.logoDesign}
          onChangeText={(value) => handleInputChange('logoDesign', value)}
          placeholder="$0.00"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Subtotal</Text>
        <Text style={styles.itemText}>${calculateSubtotal()}</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Tax</Text>
        <Text style={styles.itemText}>${(calculateSubtotal() * 0.06).toFixed(2)}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalText}>${calculateTotal()}</Text>
      </View>
    </ScrollView>
  }</View>
};

const styles = StyleSheet.create({
  maincontainer:{
    flexGrow: 1,
    height:"100%",
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    height:"100%",
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: "row" , justifyContent: 'space-evenly' 
 },
 container: {
  flexGrow: 1,
  padding: 20,
  paddingTop: 40,
  backgroundColor: '#fff',
},
title: {
  fontSize: 32,
  fontWeight: 'bold',
  marginVertical: 10,
},
date: {
  fontSize: 16,
  color: '#888',
  marginBottom: 20,
},
info: {
  marginBottom: 20,
},
infoText: {
  fontSize: 16,
  marginBottom: 5,
},
divider: {
  borderBottomColor: '#000',
  borderBottomWidth: 1,
  marginVertical: 10,
},
itemRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 5,
},
itemText: {
  fontSize: 18,
},
totalRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: 10,
},
totalText: {
  fontSize: 24,
  fontWeight: 'bold',
},
button: {
  backgroundColor: '#000',
  padding: 15,
  alignItems: 'center',
  marginTop: 20,
},
buttonText: {
  color: '#fff',
  fontSize: 18,
},
});

export default Invoice2;