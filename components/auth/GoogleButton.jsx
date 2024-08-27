import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const GoogleButton = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => {
        // Handle Google sign-in logic here
        // You can navigate to the Google sign-in screen or trigger an authentication flow
      }}
    >
      {/* <Image
        source={require('./path/to/google-logo.png')} // Replace with the actual path to your Google logo image
        style={{ width: 24, height: 24, marginRight: 8 }}
      /> */}
      <Text style={{ color: 'black', fontWeight: 'bold' }}>Sign up with Google</Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;
