import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { firebase } from "../config";
//import { useIsFocused } from '@react-navigation/native';//
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config";

const Confirm = ({ route, navigation }) => {

  const [status, setStatus] = useState(route.params.item.status)

  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const dataRef = firebase.firestore().collection('orders')


  const update = async () => {
    dataRef
      .doc(route.params.item.id)
      .update({
        "status": { pending: true },
      })
      .then(() => {
        navigation.goBack();
        Alert.alert("Confirmed order Successfully!");
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={update}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Order Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}
export default Confirm

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7d081",
    padding: 10,
    width: "100%",
    borderRadius: 20,
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});