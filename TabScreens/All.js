import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { firebase } from "../config";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchBar } from "react-native-elements";
import * as Animatable from 'react-native-animatable';

const All = ({ navigation }) => {
  
  const [data, setData] = useState([]);
  const dataRef = firebase.firestore().collection("products");
  const [search, setSearch] = useState("");
  const [filterProduct, setFilterProduct] = useState([]);

  useEffect(() => {
    read();
  }, []);

  // Search item
  useEffect(() => {
    setFilterProduct(
      data.filter(
        (res) =>
          res.name.toLowerCase().includes(search.toLowerCase()) ||
          res.desc.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  // read data
  const read = () => {
    dataRef.orderBy("createdAt", "desc").onSnapshot((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        const { imgURL } = doc.data();
        const { name } = doc.data();
        const { desc } = doc.data();
        const { price } = doc.data();
        const { qty } = doc.data();
        const { category_name } = doc.data();

        data.push({
          id: doc.id,
          imgURL,
          name,
          desc,
          price,
          qty,
          category_name,
        });
      });
      setData(data);
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
                source={require('../assets/bg5.jpg')}
                style={{width: '100%', height: "100%",}}
            > 
      <SearchBar
        placeholder="Search"
        onChangeText={(search) => setSearch(search)}
        value={search}
      />

      {search.length ? (
        <Text>
          {filterProduct.map((item) => (
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ProductDetail", { item })}
              >
                <Text style={{ color: "#fff", fontSize: 20 }}>{item.name}</Text>
                <Text style={{ color: "#fff", fontSize: 10 }}>{item.desc}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </Text>
      ) : null}
      <View style={{ flex: 1 }}>
        <View style={{marginBottom:20}}>
          <Text style={styles.expoView}>"Shop to be Smart with WTTH"</Text>
        </View>
        <SafeAreaView style={{ flex: 2, padding: 5, marginTop: -40 }}>
          <Animatable.View
            animation="fadeInUp"
            duration={1000}
        
          >
          <FlatList
              data={data}
              keyExtractor={(_,i) => String(i)}
              numColumns={2}
              showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={() => navigation.navigate("ProductDetail", { item })}
              >
                <View style={{ padding: 15, paddingTop: 0, }}>
                <View style={{ paddingTop: 5, flexDirection: "column",}}>
                  <View>
                    <Image
                      style={styles.iimage}
                      source={{ uri: item.imgURL }}
                    />
                  </View>

                    <View style={{width: 150,}}>
                      <Text style={styles.expoText}>{item.category_name}</Text>
                      <Text style={styles.text}>Name : {item.name}</Text>
                      <Text style={styles.text}>Price : $ {item.price}</Text>
                  </View>
                </View>
              </View>
              </TouchableOpacity>
            )}
            />
            </Animatable.View>
        </SafeAreaView>
        </View>
        </ImageBackground>
    </View>
  );
};

export default All;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  iimage: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
  expoView: {
    textAlign: 'center',
    fontSize: 22,
    color: '#FFE89C',
    fontWeight: '500',
    letterSpacing: 1,
  },
  expoText: {
    //textAlign: 'center',
    paddingTop: 8,
    fontSize: 14,
    color: "#FFE89C",
    fontWeight: "900",
    letterSpacing: 1,
    lineHeight: 18,
  },
  button: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE89C",
    height: 50,
    width: 50,

  },
  text: {
    marginTop: 5,
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
});
