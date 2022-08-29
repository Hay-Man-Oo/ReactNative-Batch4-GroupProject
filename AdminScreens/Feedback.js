import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    ImageBackground,
    SafeAreaView,
    TouchableOpacity
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from "../config";

const Userfeedback = ({ route, navigation }) => {

    const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection("feedback");


    useEffect(() => {
        read();
    }, []);

    // read data
    const read = () => {
        dataRef
            .onSnapshot((querySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc) => {
                    const { username } = doc.data();
                    const { createdAt } = doc.data();
                    const { updatedAt } = doc.data();
                    const { userfeedback } = doc.data();
                    data.push({
                        id: doc.id,
                        username,
                        userfeedback,
                        createdAt: new Date(createdAt.seconds * 1000).toLocaleDateString("en-US"),
                        //updatedAt:new Date().toUTCString(),
                        //createdAt: new Date().toUTCString(),

                    });
                });
                setData(data);
            });
    }

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
        <View>
            <View style={styles.container}>
                    <View>
                        <Text style={styles.adminText}>Users' Feedback</Text>
                    </View>

                    <View style={{ flex: 2, padding: 10, marginTop: -10 }}>
                        <FlatList
                            data={data}
                            keyExtractor={(_,i) => String(i)}
                            renderItem={({ item }) => (
                                <SafeAreaView style={{ flex: 1, padding: 5 }}>
                                        <View style={styles.Box}>
                                            <View style={{ flexDirection: 'row' }}>

                                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingRight: 235 }}>From </Text>
                                                <TouchableOpacity onPress={() => Deletefeedback(item)}>
                                                    <MaterialCommunityIcons name="delete" color={'red'} size={30} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <MaterialCommunityIcons name="account" color={'#000'} size={30} />
                                                <Text style={{ paddingLeft: 20, color: "#000", fontSize: 18 }}>
                                                    {item.username}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <MaterialCommunityIcons name="clock" color={'#000'} size={30} />
                                                <Text style={{ paddingLeft: 20, color: "#000", fontSize: 18 }}>
                                                    {item.createdAt}
                                                </Text>
                                            </View>

                                            <View style={{ flexDirection: 'row' }}>
                                                <MaterialCommunityIcons name="message" color={'#000'} size={30} />
                                                <Text style={{ paddingLeft: 20, color: "#000", fontSize: 18 }}>
                                                    {item.userfeedback}
                                                </Text>
                                            </View>
                                        </View>
                                </SafeAreaView>

                            )}
                        />
                    </View>
            </View>
        </View>
    );
};

export default Userfeedback;

const styles = StyleSheet.create({
    adminText: {
        fontSize: 20,
        color: "#f7d081",
        fontWeight: "bold",
        letterSpacing: 1,
        padding: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "500",
        letterSpacing: 1,
        padding: 5,
        paddingTop: 10
    },

    Box: {
        padding: 10,
        borderWidth: 2,
        borderColor: '#000',
        backgroundColor: "#f7d081",
        borderRadius: 20,
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
});
