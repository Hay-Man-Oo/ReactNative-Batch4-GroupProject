import React, { useEffect, useState } from 'react'
import { StyleSheet,Text, View, StatusBar, TextInput, TouchableOpacity} from 'react-native'
import { firebase } from '../config'
export default function Detail({route,navigation}){
  const [username, setName] = useState("")
  const userData = route.params.userData
  useEffect(() => {
    setName(userData.username)
  }, [])
  const profileUpdate = () => {
    const data = {
      id: userData.id,
      email: userData.email,
      username: username,
     
    }
    const userRef = firebase.firestore().collection('users').doc(userData.id)
    userRef.update(data)
    navigation.goBack()
  }
  return (
    <View style={styles.container}>

          <Text style={styles.field}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder={username}
            onChangeText={(text) => setName(text)}
            value={username}
           
          />
<Text style={styles.field}>Mail:</Text>
          <Text style={styles.title}>{userData.email}</Text>
          <TouchableOpacity style={styles.button} onPress={profileUpdate}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
    </View>
  )

} 
const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  field: {
    fontSize: 15,
    textAlign: 'center',
  },
 
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },

}
)