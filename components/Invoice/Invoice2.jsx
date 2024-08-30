import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Invoice2= () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Invoice</Text>
      <Text style={styles.date}>May 14, 2022 / No.456465</Text>
      <View style={styles.info}>
        <Text style={styles.infoText}>To: Alex Bets</Text>
        <Text style={styles.infoText}>Add: Inner The Embracedero New York</Text>
        <Text style={styles.infoText}>Mail: Bets@gmail.com</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>UI Design</Text>
        <Text style={styles.itemText}>$2,000.00</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>UX Design</Text>
        <Text style={styles.itemText}>$2,000.00</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Direction</Text>
        <Text style={styles.itemText}>$4,000.00</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Logo Design</Text>
        <Text style={styles.itemText}>$2,300.00</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Subtotal</Text>
        <Text style={styles.itemText}>$10,300.00</Text>
      </View>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>Tax</Text>
        <Text style={styles.itemText}>$620.00</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalText}>$10,920.00</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    height:"100%",
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