import { StyleSheet, Text, View } from 'react-native'
import { Invoice1, Invoice2, Invoice3 } from "../../components/Invoice/index.js"
import { FloatingAction } from 'react-native-floating-action';
import { SafeAreaView } from 'react-native-safe-area-context';
import {useState} from "react"

const index = () => {
  const [type,setType] = useState("Invoice1")
  const actions = [
    {
      text: "Invoice 1",
      name: "Invoice1",
      position: 1
    },
    {
      text: "Invoice 2",
      name: "Invoice2",
      position: 2
    },
    {
      text: "Invoice 3",
      name: "Invoice3",
      position: 3
    },
  ];
  function typeParser(){
    if(type === "Invoice1" ){
      return <Invoice1/>
    }
    else if(type === "Invoice2" ){
      return <Invoice2/>
    }
    else if(type === "Invoice3" ){
      return <Invoice3/>
    }
  }
  return (
    <View styles = {styles.container}>
      {typeParser()}
      <FloatingAction
        styles = {styles.FloatingAction}
        actions={actions}
        onPressItem={type => {
         setType(type);
        }}
      />
    </View>

  )
}

export default index

const styles = StyleSheet.create({
  container: {
    height:"100%"
  },
  FloatingAction: {
    position:"absolute",
    bottom:5,
    right:10
  }
})