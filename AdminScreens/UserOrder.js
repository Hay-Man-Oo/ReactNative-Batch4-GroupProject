import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firebase } from "../config";

const UserOrder = ({ route, navigation }) => {

  //const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [cartList, setCartList] = useState([]);
  const dataRef = firebase.firestore().collection('orders')

  const [status, setStatus] = useState('');
  // read data
  const read = () => {
    console.log("inside read function");
    dataRef
      .onSnapshot((querySnapshot) => {
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
  
    console.log("order", data.id)
  };
  useEffect(() => {
    read();
  }, []);
  const Deletefeedback = (data) => {
    dataRef
      .doc(data.id)
      .delete()
      .then(() => {
        alert("Deleted Successfully!");
        console.log(" Data Deleted");
      })
      .catch((error) => {
        alert(error);
      });

  }


  return (
    <View style={styles.container}>
        <Text style={styles.adminText}>OrderDetail</Text>
        <View style={{ flex: 1, padding: 10 }}>
          <FlatList
            data={data}
            showsVerticalScrollIndicator={true}
            style={{ flex: 1, marginTop: 16 }}
            keyExtractor={(_,i) => String(i)}
            renderItem={({ item }) => (
                <View>
                  {/*<TouchableOpacity onPress={showConfirmDialog}>*/}
                  <View style={{
                    borderWidth: 1, borderColor: 'gold', backgroundColor: "#000", padding: 10, borderRadius: 10,
                    marginBottom: 10
                  }}>
                    <ScrollView>

                      <View>
                        {
                          item.status.pending === true ?
                            (
                              <View style={{ flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="marker-check" size={35} color={'green'} />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gold', textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>This Order is{item.status.pending} Confirmed</Text>

                                <TouchableOpacity onPress={() => Deletefeedback(item)}>
                                  <MaterialCommunityIcons name="delete" color={'red'} size={30} />
                                </TouchableOpacity>
                              </View>
                            )
                            :
                            <View style={{ flexDirection: 'row' }}>
                              <MaterialCommunityIcons name="alert" size={35} color={'orange'} />
                              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'gold', textAlign: 'center', paddingLeft: 30, paddingRight: 30 }}>This Order is{item.status.pending} Pending</Text>

                              <TouchableOpacity onPress={() => Deletefeedback(item)}>
                                <MaterialCommunityIcons name="delete" color={'red'} size={30} />
                              </TouchableOpacity>

                            </View>
                        }


                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>OrderList</Text>
                        {
                          item.cartList.map((cartItem,index) => {
                            //console.log("cart Item",cartItem)
                            return (
                              <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }} key={index}>
                                <Text style={styles.textInfo}>{cartItem.qty} x</Text>
                                <Text style={styles.textInfo}>{cartItem.name}</Text>
                                <Text style={styles.textInfo}>$ {cartItem.price}</Text>
                              </View>
                            )
                          }
                          )
                        }
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          {/*<Text style={styles.textInfo}>Shipping Tax</Text>*/}
                          <MaterialCommunityIcons name="truck-delivery-outline" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>$ 10</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          {/*<Text style={styles.textInfo}>Total</Text>*/}
                          <MaterialCommunityIcons name="cash-100" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>$ {item.total}</Text>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          {/*<Text style={styles.textInfo}>Order Date</Text>*/}
                          <MaterialCommunityIcons name="clock" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}> {item.createdAt}</Text>
                        </View>
                        <Text style={{ fontSize: 19, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Customer's Info</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          <MaterialCommunityIcons name="id-card" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>{item.userid}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          {/*<Text style={styles.textInfo}>Name</Text>*/}
                          <MaterialCommunityIcons name="account" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>{item.username}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          {/*<Text style={styles.textInfo}>Phone</Text>*/}
                          <MaterialCommunityIcons name="phone" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>{item.phone}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          {/*<Text style={styles.textInfo}>Address</Text>*/}
                          <MaterialCommunityIcons name="home" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>{item.address}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                          {/*<Text style={styles.textInfo}>Note</Text>*/}
                          <MaterialCommunityIcons name="text-box" color={'#f7d081'} size={25} />
                          <Text style={styles.textInfo}>{item.note}</Text>
                        </View>
                      </View>
                      {/*<Text style={{fontSize: 20,fontWeight:'bold',color: 'gold'}}>Check Out</Text>*/}




                    {
                      item.status.pending === true ?
                        (
                            null
                          
                        )
                          :
                          <TouchableOpacity
                        onPress={() => navigation.navigate('orderConfirm', { item })}
                        style={styles.button}
                      >

                        <Text style={{ borderwidth: 1, padding: 5, fontWeight: 'bold' }}>Order Confirm</Text>

                      </TouchableOpacity>
                    }
                           

                    </ScrollView>



                  </View>
                  {/*</TouchableOpacity> */}
                </View>
            )}
          />
        </View>
    </View>

  );
}
export default UserOrder;

const styles = StyleSheet.create({
  adminText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    letterSpacing: 1,
    padding: 20,
    textAlign: 'center',
  },
  textBoxes: {
    width: '60%',
    marginLeft: 20,
    fontSize: 16,
    padding: 10,
    borderColor: 'black',
    borderBottomWidth: 2,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    color: "black"
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1,

  },
  textInfo: {
    fontSize: 16,
    color: "#f7d081",
    fontWeight: "500",
    letterSpacing: 1,
    padding: 5,
    paddingTop: 8
  },
  padd: {
    color: 'gold',
    fontWeight: "bold",
    fontSize: 18,
    textAlign: 'center',
  },
  Box: {
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "gray",
    borderRadius: 15,
    padding: 10
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    paddingTop: 20,
    justifyContent: "flex-start",
  },
  decText: {
    fontSize: 10,
    color: 'gold',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#ffd700',
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: "center",
    padding: 10,
    justifyContent: 'center'
  },
})
