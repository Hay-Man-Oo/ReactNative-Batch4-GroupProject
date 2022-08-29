import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../config";
import * as Animatable from 'react-native-animatable';

const AdminScreen = ({ route, navigation }) => {

  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("products");

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imgURL, setImageURL] = useState("");
  const [category_name, setCategory_name] = useState('');

  useEffect(() => {
    read();
  }, []);

  // read data
  const read = () => {
    dataRef
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          const { imgURL } = doc.data();
          const { name } = doc.data();
          const { desc } = doc.data();
          const { price } = doc.data();
          const { category_name } = doc.data();

          data.push({
            id: doc.id,
            imgURL,
            name,
            desc,
            price,
            category_name,
          });
        });
        setData(data);
      });
  };

  // delete data
  const destroy = (data) => {
    dataRef
      .doc(data.id)
      .delete()
      .then(() => {
        alert("Deleted Successfully!");
        console.log(" Data Deleted");
      })
      .catch((error) => {
        alert("error");
      });
  };

  return (
    <View>
      <ImageBackground
        source={require("../assets/admin2.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <View style={styles.adminView}>
            <Image
              style={styles.tinyLogo}
              source={require('../assets/logo.png')}
            />

            <Text style={styles.adminText}>Add All Products</Text>
            <TouchableOpacity
              style={{ backgroundColor: "gold", padding: 20, borderRadius: 40 }}
              onPress={() => navigation.navigate("CreateProduct")}
            >
              <MaterialCommunityIcons name="plus" size={30} color={"black"} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 2, padding: 10, paddingTop: 0 }}>
          <Animatable.View
              animation='fadeInRightBig'
              duration={4000}
              //iterationCount='infinite'
            >
            <FlatList
              data={data}
              keyExtractor={(_,i) => String(i)}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <View
                  style={styles.Box}
                >
                  <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("UpdateProduct", { item })
                      }
                    >
                      <MaterialCommunityIcons
                        name="lead-pencil"
                        size={25}
                        color="gold"
                      />
                    </TouchableOpacity>

                    <Text style={styles.padd}>
                      {item.category_name}
                    </Text>


                    <TouchableOpacity onPress={() => destroy(item)} style={{ left: 60, }}>
                      <Ionicons name="trash" color={"#ffd700"} size={30} />
                    </TouchableOpacity>
                  </View>
                  <View style={{ padding: 10, flexDirection: "row" }}>
                    <View>
                      <Image
                        style={styles.iimage}
                        source={{ uri: item.imgURL }}
                      />
                    </View>
                    <View style={{ padding: 10, }}>
                      <Text style={styles.text}>
                        {/*Name:*/}
                        {item.name}
                      </Text>
                      <Text style={styles.text}>
                        Price: ${item.price}
                      </Text>
                      <Text style={[styles.text, styles.decText]}>
                        {/*Description:*/}
                        {item.desc}
                      </Text>
                      
                    </View>

                  </View>
                </View>
              )}
              />
            </Animatable.View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  adminView: {
    padding: 13,
    flexDirection: "row",
  },
  adminText: {
    fontSize: 20,
    color: "white",
    ontWeight: "500",
    letterSpacing: 1,
    paddingLeft: 22,
    paddingTop: 30,
    paddingRight: 22,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    paddingBottom: 5,
    fontWeight: "500",
    letterSpacing: 1,
    width: 150,
  },
  iimage: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  padd: {
    width: 100,
    marginLeft: '30%',
    color: 'gold',
    fontWeight: "bold",
    fontSize: 18,
  },
  Box: {
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#000",
    borderRadius: 15,
  },
  container: {
    width: "100%",
    height: "100%",
    //backgroundColor: "#000",
    paddingTop: 18,
    padding: 10
  },
  decText: {
    fontSize: 12,
    letterSpacing: 1.5,
    color: 'gold',
    fontWeight: 'bold',
  },
  tinyLogo: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#fff",
  }
});
