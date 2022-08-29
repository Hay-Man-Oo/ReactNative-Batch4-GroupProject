import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { firebase } from "../config";
import { FlatList, TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";
const MyCart = ({ route, navigation }) => {
    //const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection("products");
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const [total, setTotal] = useState("");

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
            });
    }, []);
    const uid = user?.id;
    const urname = user?.username;
    console.log(uid);
    console.log(urname);

    var [id] = useState("");
    var [name, setName] = useState("");
    var [imgURL, setImageURL] = useState("");
    var [desc, setDesc] = useState("");
    var [price, setPrice] = useState("");
    var [qty, setQty] = useState("");

    const [cartList, setCartList] = useState([]);
    const [note, setNote] = useState("");

    useEffect(() => {
        navigation.addListener("focus", () => {
            AsyncStorage.getItem("carts").then((data) => {
                if (data !== null) {
                    setCartList(JSON.parse(data));
                    console.log(JSON.parse(data));
                    let sum = 10;
                    JSON.parse(data).map((item) => {
                        sum += item.price * item.qty;
                    });
                    console.log(sum);
                    setTotal(sum);
                }
            });
        });
    }, []);

    console.log(cartList);

    const itemDelete = async (i) => {
        if (cartList.length > 0) {
            let cart = [...cartList];
            cart.splice(i, 1);
            setCartList(cart);

            console.log(cartList.slice(-1)[0].price * cartList.slice(-1)[0].qty);
            console.log(cartList.slice(-1)[0]);

            let minusPrice = cartList.slice(-1)[0].price * cartList.slice(-1)[0].qty;
            let subSum = total - minusPrice;
            setTotal(subSum);

            // delete cart item
            let lastIndex = cartList.slice(-1)[0];

            await AsyncStorage.removeItem("carts");
            console.log(cart);
            console.log("successfully deleted");
        }
    };

    // Add pending Order to firebase database
    const order = async() => {
        // if (uid !== null) {
     await AsyncStorage.removeItem("carts");
        const cartOrder = {
            cartList,
            // "status" : "pending",
            "status": { pending: false },
            "total": total,
            "userid": user?.id,
            "username": user?.username,
            "phone": user?.phone,
            "address": user?.address,
            "note": note,
            'createdAt': timestamp,
            // "orderId" : 
        };
        // console.log(cartOrder);
        firebase
            .firestore()
            .collection("orders")
            //.doc("client "+urname)
            //.collection("cart "+ uid )
            .doc(cartOrder.id)
            .set(cartOrder)
            .then(() => {
                console.log("Successfully order pending !!!");
                Alert.alert("Your Orders are pending. Plz wait for confirmation...")
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Products' }]
                    })
                )
            });
        // }
    };


    const CartItemView = ({ item, index }) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                }}
            >
                <Text style={styles.qtyText}>{item.qty} x</Text>
                <Image style={styles.iimage} source={{ uri: item.imgURL }} />
                <Text style={styles.text}> {item.name} </Text>
                <Text style={styles.priceText}> $ {item.price} </Text>
                <TouchableOpacity onPress={() => itemDelete(index)} style={styles.icon}>
                    <Ionicons name="trash" color={"#fc842d"} size={30} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/black2.jpg")}
                style={{ width: "100%", height: "100%" }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: "center",
                        fontWeight: "600",
                        color: "#fff",
                    }}
                >
                    Order Details
                </Text>
                <FlatList
                    data={cartList}
                    renderItem={CartItemView}
                    showsVerticalScrollIndicator={true}
                    style={{ flex: 1, marginTop: 16 }}
                />

                <View style={{ flex: 0.8 }}>
                    <ScrollView>
                        <View>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: "bold",
                                    color: "#f7d081",
                                    margin: 5,
                                }}
                            >
                                Delivery Information
                            </Text>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    padding: 5,
                                }}
                            >
                                <Text style={{ color: "#fff" }}>User ID</Text>
                                <Text style={{ color: "#fff" }}>{user?.id}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    padding: 5,
                                }}
                            >
                                <Text style={{ color: "#fff" }}>Name</Text>
                                <Text style={{ color: "#fff" }}>{user?.username}</Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    padding: 5,
                                }}
                            >
                                <Text style={{ color: "#fff" }}>Phone</Text>
                                <Text style={{ color: "#fff" }}>{user?.phone}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",

                                    borderBottomWidth: 1,
                                    paddingBottom: 10,
                                    borderBottomColor: "#ccc",
                                    margin: 5,
                                }}
                            >
                                <Text style={{ color: "#fff" }}>Address</Text>
                                <Text style={{ color: "#fff" }}>{user?.address}</Text>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 5,
                            }}
                        >
                            <Text style={{ color: "#fff" }}>Shipping Fee</Text>
                            <Text style={{ color: "#fff" }}>$ 10</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 5,
                            }}
                        >
                            <Text style={{ color: "#fff" }}>Total</Text>
                            <Text style={{ color: "#fff" }}>$ {total}</Text>
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 5,
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{ color: "#fff" }}>Note</Text>
                            <TextInput
                                style={styles.textBoxes}
                                placeholder="Message..."
                                onChangeText={(note) => setNote(note)}
                                placeholderTextColor="#c4c4c2"
                            />
                        </View>
                        <TouchableOpacity onPress={order} style={styles.btn}>
                            <Text>Order</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    );
};

export default MyCart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: "black",
    },
    text: {
        paddingTop: 30,
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
        width: 130,
    },
    qtyText: {
        paddingTop: 30,
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
        width: 35,
    },
    priceText: {
        paddingTop: 30,
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
        width: 60,
    },
    icon: {
        paddingTop: 20,
    },
    textBoxes: {
        fontSize: 10,
        borderWidth: 1,
        borderColor: "#fff",
        padding: 8,
        color: "gold",
        width: "50%",
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7d081",
        padding: 10,

        width: "100%",
        borderRadius: 20,
    },
    iimage: {
        width: 80,
        height: 80,
        borderRadius: 15,
    },
});
