import reactNativeHtmlToPdf from "react-native-html-to-pdf";

export default generatePDF = async () => {
    try {
      const html = `<h1>hello</h1>`;
      const options = {
        html,
        fileName: `invoice_${count}`,
        directory: 'Invoices',
      };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF saved to ${file.filePath}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  