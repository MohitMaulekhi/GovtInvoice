import * as React from 'react';
import { View, StyleSheet, Button, Platform, Text } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';



  export const print = async (html) => {
     await Print.printAsync({
      html,
    });
  };

  export const printToFile = async (html) => {
    const { uri } = await Print.printToFileAsync({ html }); /* @end */
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  export const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync();
    setSelectedPrinter(printer);
  };
