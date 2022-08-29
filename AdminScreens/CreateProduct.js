import { StyleSheet, Text, View, Button, Alert, Image, ScrollView, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../config';
import { CommonActions } from '@react-navigation/native'
import * as ImagePicker from "expo-image-picker";
import SelectDropdown from 'react-native-select-dropdown';
import * as Animatable from 'react-native-animatable';

const CreateProduct = ({ navigation }) => {

  const [product, setProduct] = useState([]);
  const dataRef = firebase.firestore().collection('products')

  const [productName, setProductName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');


  const [data, setData] = useState([]);
  const catRef = firebase.firestore().collection('categories');
  const [name, setName] = useState('')

  const [selectedItem, setSelectedItem] = useState();


  //image
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imgURL, setImageURL] = useState("");

  const pickImage = async () => {
    //No permission request is needed to upload photo
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const source = { uri: result.uri };
    console.log(source);
    setImage(source);
  };


  useEffect(() => {
    readCat();
  }, [])

  // read data from Categories
  const readCat = () => {
    catRef
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        querySnapshot => {
          const data = []
          querySnapshot.forEach((doc) => {
            const { name } = doc.data()

            data.push({
              id: doc.id,
              name,
            })
          })
          setData(data)
        }
      )
  }


  //Add image and product data
  const add = async () => {

    if (
      (image !== null) ||
      (productName && productName.length > 0) ||
      (desc && desc.length > 0) ||
      (price && price.length > 0) ||
      (category && category.length > 0)
    ) {
      setUploading(true);
      const response = await fetch(image.uri);
      const blob = await response.blob();
      const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
      var ref = firebase.storage().ref("products_images/").child(filename).put(blob);
      try {
        await ref;   // const setImageURL = await firebase.storage().ref(`Shoes/${filename}`).getDownloadURL();//        console.log("print ref :", setImageURL);
      } catch (e) {
        console.log(e);
      }
      const setImageURL = await firebase.storage().ref(`products_images/${filename}`).getDownloadURL();
      console.log("print ref :", setImageURL);

      setUploading(false);
      //Alert.alert("Photo uploaded..!!");  //optional
      const FireImage = { fireuri: filename }; //optional
      console.log(FireImage);   //optional

      setImage(null);

      const timestamp = firebase.firestore.FieldValue.serverTimestamp();

      console.log("Database Image ", imgURL);

      const data = {
        imgURL: setImageURL,
        name: productName,
        desc: desc,
        price: parseFloat(price),
        category_id: selectedItem.id,
        category_name: selectedItem.name,
        createdAt: timestamp,
      };
      dataRef
        .add(data)
        .then(() => {
          //imgURL(""),
          setProductName("");
          setDesc("");
          setPrice("");
          //setCategory("");
        })
        .then(async () => {

          Alert.alert("Successfully added!");

          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Admin" }],
            })
          );
        })
        .catch((error) => {
          alert(error);
        });
    }
  };


  return (

    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/admin4.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        {/*<Text style={styles.header}>CreateProduct</Text>*/}

        <Animatable.View
                animation='fadeInLeftBig'
                    duration={4000}>
        <View style={styles.imageContainer}>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 150, height: 150 }}
            />
          )}
        </View>
        <TouchableOpacity
          style={[styles.selectButton, styles.ImgBot]}
          onPress={pickImage}
        >
          <Text> Pick an Image</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder='Description'
          onChangeText={(text) => setDesc(text)}
          value={desc}
          placeholderTextColor="#c4c4c2"
        />

        <TextInput
          style={styles.input}
          placeholder='Name'
          onChangeText={(text) => setProductName(text)}
          value={productName}
          placeholderTextColor="#c4c4c2"
        />

        <TextInput
          style={styles.input}
          placeholder='Price'
          onChangeText={(text) => setPrice(text)}
          value={parseFloat(price)}
          keyboardType='numeric'
          placeholderTextColor="#c4c4c2"
        />

        <View style={styles.select}>
          <SelectDropdown
            data={data}
            onSelect={(selectedItem, index) => {
              setSelectedItem(selectedItem);
              console.log(selectedItem, index)
            }}

            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem.name
            }}

            rowTextForSelection={(item, index) => {
              return item.name
            }}
          />
        </View>
        <View style={{ justifyContent: "center", alignItems: 'center' }}>
          <TouchableOpacity style={styles.btn} onPress={() => add()}>
            <Text>Create </Text>
          </TouchableOpacity>
          {/*
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Admin' }]
            })
          )}
        >
          <Text>Back </Text>
        </TouchableOpacity>*/}
          </View>
        </Animatable.View>
      </ImageBackground>
    </View>
  )
}

export default CreateProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 60
  },

  select: {
    borderWidth: 1,
    borderColor: 'black',
    marginHorizontal: 89,
    //marginLeft: 90,
    //marginRight: 90,
    marginBottom: 30,
    marginTop: 20
  },

  //header: {
  //  fontSize: 30,
  //  fontWeight: 'bold',
  //  marginBottom: 10,
  //  color: 'white'
  //},

  input: {
    marginLeft: 50,
    width: '65%',
    fontSize: 18,
    padding: 10,
    borderColor: '#ffd700',
    borderBottomWidth: 2,
    color: '#fff',
    borderRadius: 10,
    paddingTop: 10,
    marginBottom: 10,
  },

  btn: {
    width: "100%",
    backgroundColor: "#ffd700",
    width: "30%",
    padding: 10,
    marginLeft: 40,
    marginRight: 30,
    borderRadius: 5,
    color: "#000",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  imageContainer: {
    marginTop: 10,
    marginLeft: "30%",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "lightgray",
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  selectButton: {
    backgroundColor: "gold",
    marginTop: 10,
    marginLeft: "35%",
    padding: 10,
    borderRadius: 5,
  },
  ImgBot: {
    width: "30%",
  },
})