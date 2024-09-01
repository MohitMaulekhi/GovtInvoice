import { StyleSheet, Text, View } from 'react-native'
import { Invoice1, Invoice2, Invoice3 } from "../../components/Invoice/index.js"
import { FloatingAction } from 'react-native-floating-action';
import {useState} from "react"

const styles = StyleSheet.create({
  container: {
    height:"100%",
  }
})

const home = () => {  
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
  const typeParser = ()=>{
        if(type == "Invoice1" ){
          return <Invoice1/>
        }
        else if(type == "Invoice2" ){
          return <Invoice2/>
        }
        else{
          return <Invoice3/>
        }
      }
  return (
    <View styles = {styles.container}>
      {typeParser()}
       <FloatingAction
       styles={styles.fab}
        actions={actions}
        onPressItem={type => {
         setType(type);
        }}
      />
    </View>
  )
}

export default home