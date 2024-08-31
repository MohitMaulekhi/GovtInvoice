import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Tabs } from 'expo-router';
import {TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Auth } from '../../services/firebaseconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        screenOptions={{ headerStyle: { height: 10} }}
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          headerRight: () => (
            <TouchableOpacity
            
              onPress={() =>  {
                Auth.signOut().then(
                  async ()=>{
                    AsyncStorage.removeItem("email")
                    AsyncStorage.removeItem("password")
                  setTimeout(()=>router.replace('/'),100)
                }
                  
                )

                
              }}
              
            >
              <Text
              style={
                {color:"blue",fontSize: 15,margin:10}
              }
              >Logout</Text>
            </TouchableOpacity>)
        }}
        
      />
      <Tabs.Screen
        name="cloud"
        options={{
          title: 'Cloud',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cloud" color={color} />,
        }}
      />
    </Tabs>
  );
}

