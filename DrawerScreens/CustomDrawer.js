import React, { useContext, useEffect } from "react";
import { View, Image, Text, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList
} from '@react-navigation/drawer';
import { CommonActions } from '@react-navigation/native'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from '../config';
import { Restart } from '../components/reload/reload'
const CustomDrawer = (props) => {


  const SignOut = () => {
    firebase.auth().signOut()
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }]
    })
    Restart()
  }


  return (

    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#f7d081" }}
      >

        <Image
          source={require('../assets/logo.png')}
          style={{ height: 80, width: 80, marginLeft: 80, marginTop: 40, marginBottom: 10, borderRadius: 40 }}
        />

        <Text
          style={{ marginLeft: 20, fontSize: 20, fontWeight: 'bold' }}>
          WTTH
        </Text>
        <Text
          style={{ marginLeft: 20, fontSize: 16, marginTop: 8, paddingBottom: 10, }}>
          wtth@brandmail.com
        </Text>
        <View style={{ flex: 1, backgroundColor: "#fff", paddingBottom: 5, paddingTop: 5 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ Width: "70%", borderTopWidth: 2, paddingBottom: 20, paddingLeft: 20, borderTopColor: "#ccc" }}
      >
        <TouchableOpacity
          onPress={SignOut}
          style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons name="logout" color={"#f7d081"} size={30} />
            <Text style={{ fontSize: 14, marginLeft: 25 }}> Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawer