import React, { useEffect, useState } from 'react'
import { SafeAreaView, ImageBackground, Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { firebase } from '../config'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
export default function AccountScreen({ route, navigation }, props) {
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])

    function Edit() {
        navigation.navigate('EditProfile')
    }

    useEffect(() => {
        firebase.firestore().collection("users")
            .doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])
    useEffect(() => {
        if (user)
            firebase.firestore().collection("users").where("role", "==", (user?.role === "Admin" ? "Admin" : "Client"))
                .onSnapshot(users => {
                    if (!users.empty) {
                        const USERS = []
                        users.forEach(user => {
                            USERS.push(user.data())
                        })

                        setUsers(USERS)
                    }

                })
    }, [user])
    const signOut = () => {
        firebase.auth().signOut()
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/newBlack3.jpg')}
                style={{ width: '100%', height: "100%", }}
            >

                <SafeAreaView style={{ flex: 1, padding: 5 }}>

                    <View style={{ justifyContent: "center", alignItems: 'center' }}>


                        <Image
                            style={styles.acc}
                            source={require('../assets/logo.png')}
                        />


                        <Animatable.View
                            animation="pulse"
                            iterationCount='infinite'
                        >
                            <Text style={{ fontSize: 30, fontWeight: "500", color: "#f7d081" }}>Hello {user?.username}!</Text>
                        </Animatable.View>
                        <Animatable.View
                            animation="fadeIn"
                            duration={4000}
                        >
                            <View style={{ paddingTop: 30, paddingBottom: 10 }}>

                                <Text style={{ fontSize: 20, fontWeight: "500", color: "#f7d081", marginLeft: 20, marginBottom: 10, padding: 10 }}>Your Informations :</Text>

                                <View style={{ flexDirection: 'row', padding: 10 }}>
                                    <MaterialCommunityIcons name="email" color={'#f7d081'} size={30} />
                                    <Text style={{ fontSize: 20, fontWeight: "500", color: "#f7d081", marginLeft: 20 }}> {user?.email}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', padding: 10 }}>
                                    <MaterialCommunityIcons name="phone" color={'#f7d081'} size={30} />
                                    <Text style={{ fontSize: 20, fontWeight: "500", color: "#f7d081", marginLeft: 20 }}> {user?.phone}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', padding: 10 }}>
                                    <MaterialCommunityIcons name="home" color={'#f7d081'} size={30} />
                                    <Text style={{ fontSize: 20, fontWeight: "500", color: "#f7d081", marginLeft: 20 }}> {user?.address}</Text>
                                </View>

                            </View>


                            <View style={{ paddingTop: 50, flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={Edit}
                                    style={styles.button}
                                >
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        Edit Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={signOut}
                                    style={styles.button}
                                >
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        Log Out</Text>
                                </TouchableOpacity>
                            </View>
                        </Animatable.View>
                    </View>

                </SafeAreaView>
            </ImageBackground>
        </View>



    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,


        backgroundColor: "#000"
    },
    textBoxes: {
        width: '90%',
        fontSize: 16,
        padding: 10,
        borderColor: 'grey',
        borderBottomWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        color: "#fff"
    },
    button: {
        backgroundColor: '#f7d081',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 5,
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        padding: 10,
        justifyContent: 'center'
    },

    acc: {
        height: 80,
        width: 80,
        alignSelf: "center",
        margin: 30,
        borderRadius: 50
    },
})
