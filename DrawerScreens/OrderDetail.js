import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import {  MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { firebase } from "../config";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';

export default function OrderDetail({ navigation }) {
  //Getting user id
  const firestore = firebase.firestore;
  const auth = firebase.auth;
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .get()
      .then((user) => {
        setUser(user.data());
        console.log("user id ==", user.data().id);
        read(user.data().id);
      });
  }, []);
  const uid = user?.id;
  const urname = user?.username;
  //const urname = firestoreDocument.data()?.username

  console.log(uid);
  console.log(urname);

  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const dataRef = firebase.firestore().collection("orders");

  // read data
  const read = (userId) => {
    console.log("inside read function", userId);
    //console.log("inside read function");
    dataRef.where("userid", "==", userId).onSnapshot((querySnapshot) => {
      const data = [];
      //console.log("Data", querySnapshot.docs.data());
      querySnapshot.forEach((doc) => {
        //console.log("Data = ", doc.data());
        //console.log("orderId" ,doc.id)
        //data.push(doc.data());
        //data.id = doc.id;
        const { userid } = doc.data();
        const { address } = doc.data();
        const { cartList } = doc.data();
        const { phone } = doc.data();
        const { total } = doc.data();
        const { username } = doc.data();
        const { status } = doc.data();
        const { note } = doc.data();
        const { createdAt } = doc.data();
        //id : doc.id,
        setCartList(doc.data().cartList);
        //console.log("arr obj=" + cartList);
        data.push({
          id: doc.id,
          address,
          cartList,
          phone,
          total,
          userid,
          username,
          status,
          note,
          createdAt: new Date(createdAt.seconds * 1000).toLocaleDateString("en-US"),
        });
      });
      setData(data);
    });
    //console.log(" data Data = ", data);
    //console.log(uid);
  };
  useEffect(() => {
    // read();
  }, []);


  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/admin5.jpg')}
        style={{ width: '100%', height: "100%", }}
      >
      {/*<Text style={{ fontSize: 30, fontWeight: "bold" }}>OrderDetail</Text>*/}

      <FlatList
          data={data}
          keyExtractor={(_,i) => String(i)}
        showsVerticalScrollIndicator={true}
        style={{ flex: 1, marginTop: 16 }}
        renderItem={({ item }) => (
          <Animatable.View
              animation='fadeInLeftBig'
              duration={4000}>
          <View>
            <View
              style={{
                //flex: 0.5,
                borderWidth: 1,
                borderColor: "#fff",
                //marginBottom: 10,
              }}
            >
              <ScrollView>
                <View>
                  {
                    item.status.pending === true ?
                      (
                        <View>
                            
                          <MaterialCommunityIcons name="marker-check" size={30} color={'green'}/>
                          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gold', textAlign: 'center' }}>{item.status.pending} Confirm</Text>


                        </View>
                      )
                      :
                      <View>

                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'gold', textAlign: 'center' }}>{item.status.pending} Pending</Text>


                      </View>
                  }

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 5,
                    }}
                  >
                    <Text style={styles.textInfo}>ID</Text>
                    <Text style={styles.textInfo}>{user?.id}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 5,
                    }}
                  >
                    <Text style={styles.textInfo}>Name</Text>
                    <Text style={styles.textInfo}>{item.username}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 5,
                    }}
                  >
                    <Text style={styles.textInfo}>Phone</Text>
                    <Text style={styles.textInfo}>{item.phone}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 5,
                    }}
                  >
                    <Text style={styles.textInfo}>Address</Text>
                    <Text style={styles.textInfo}>{item.address}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 5,
                    }}
                  >
                    <Text style={styles.textInfo}>Note</Text>
                    <Text style={styles.textInfo}>{item.note}</Text>
                  </View>
                </View>
                {/*<Text style={{fontSize: 20,fontWeight:'bold',color: 'gold'}}>Check Out</Text>*/}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 5,
                  }}
                >
                  <Text style={styles.textInfo}>Shipping Tax</Text>
                  <Text style={styles.textInfo}>$ 10</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 5,
                  }}
                >
                  <Text style={styles.textInfo}>Total</Text>
                  <Text style={styles.textInfo}>$ {item.total}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 5,
                  }}
                >
                  <Text style={styles.textInfo}>Order Date</Text>
                  <Text style={styles.textInfo}>
                    {/*{" "}
                    {new Date(item.createdAt.seconds * 1000).toLocaleDateString(
                      "en-US"
                    )}*/}
                    {/*{new Date(item.createdAt.seconds * 1000).toLocaleDateString(
                      "en-US"
                    )}*/}
                      {item.createdAt}
                  </Text>
                  </View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ffd700', textAlign: 'center' }}>OrderList</Text>
              </ScrollView>

              {item.cartList.map((cartItem,index) => {
                console.log("cart Item", cartItem);
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      padding: 5,
                    }}
                    key={index}
                  >
                    <Text style={styles.textInfo}>{cartItem.qty} x</Text>
                    <Text style={styles.textInfo}>{cartItem.name}</Text>
                    <Text style={styles.textInfo}>$ {cartItem.price}</Text>
                  </View>
                );
              })}
            </View>

            {/*<Text>Address: {item.address}</Text>
          <Text>Phone: {item.phone}</Text>
          <Text>Total Price: {item.total}</Text>
          <Text>Name : {item.username}</Text>*/}
            </View>
            </Animatable.View>
        )}
        />
        </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  iimage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  textInfo: {
    fontSize: 16,
    color: "#ffd700",
    fontWeight: "500",
    letterSpacing: 1,
    padding: 5,
    paddingTop: 8
  },
});