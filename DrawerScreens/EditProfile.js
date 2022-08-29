import React, { useEffect, useState } from 'react'
import { SafeAreaView, ImageBackground, TextInput, FlatList, Text, View, TouchableOpacity, StatusBar, StyleSheet, ScrollView, Image, Alert } from 'react-native'
import { firebase } from '../config'
import { useIsFocused } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native'
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const EditProfile = ({ navigation }) => {
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    const [username, setUsername] = useState('');
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const isFocused = useIsFocused();
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
    useEffect(() => {

    }, [isFocused])
    const UsernameUpdate = async () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            id: user.id,
            username: username,
            updatedAt: timestamp,
        }
        const userRef = firebase.firestore().collection('users').doc(user.id)
        userRef.update(data)

        Alert.alert('Your Name has been successfully changed!')

    }
    const PhoneUpdate = async () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            id: user.id,
            phone: phone,
            updatedAt: timestamp,
        }
        const userRef = firebase.firestore().collection('users').doc(user.id)
        userRef.update(data)

        Alert.alert('Phone Number has been successfully changed!')

    }
    const AddressUpdate = async () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            id: user.id,
            address: address,
            updatedAt: timestamp,
        }
        const userRef = firebase.firestore().collection('users').doc(user.id)
        userRef.update(data)

        Alert.alert('Address has been successfully changed!')

    }
    const UpdatePassword = () => {
        const user = firebase.auth().currentUser;

        user.updatePassword(newPassword).then(() => {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                newPassword: newPassword,
                updatedAt: timestamp,
            }
            const userRef = firebase.firestore().collection('users').doc(user.id)
            userRef.set(data)
            alert('Password has successfully Changed!Please Login Again...')
        }).catch((error) => {
            alert(error.message)
        });

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
        )
    }

    function GoProfile() {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'Account' }]
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

                    <KeyboardAwareScrollView>

                        <Image
                            style={styles.acc}
                            source={require('../assets/logo.png')}
                        />


                        <Animatable.View
                            animation="jello"
                            iterationCount='infinite'
                        >
                            <View style={{ paddingTop: 10, paddingBottom: 10 }}>

                                <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#f7d081" }}> Edit Profile</Text>
                            </View>
                        </Animatable.View>
                        <Animatable.View
                            animation="fadeInRightBig"
                            duration={4000}
                        >
                            <View style={{ width: "100%" }}>
                                <View style={{ flexDirection: 'row' }}>

                                    <TextInput
                                        style={styles.textBoxes}
                                        value={username}
                                        placeholder="Enter Your New Name"
                                        placeholderTextColor="#fff"
                                        onChangeText={(text) => setUsername(text)}
                                        autoCapitalize="none"
                                    />

                                    <TouchableOpacity style={styles.button} onPress={UsernameUpdate}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>OK</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flexDirection: 'row' }}>

                                    <TextInput
                                        style={styles.textBoxes}
                                        value={phone}
                                        placeholder="Enter New Phone Number"
                                        placeholderTextColor="#fff"
                                        onChangeText={(text) => setphone(text)}
                                        autoCapitalize="none"
                                    />

                                    <TouchableOpacity style={styles.button} onPress={PhoneUpdate}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>OK</Text>
                                    </TouchableOpacity>


                                </View>


                                <View style={{ flexDirection: 'row' }}>

                                    <TextInput
                                        style={styles.textBoxes}
                                        value={address}
                                        placeholder="Enter New Address"
                                        placeholderTextColor="#fff"
                                        onChangeText={(text) => setaddress(text)}
                                        autoCapitalize="none"
                                    />
                                    <TouchableOpacity style={styles.button} onPress={AddressUpdate}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>OK</Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <TextInput
                                        style={styles.textBoxes}
                                        value={newPassword}
                                        placeholderTextColor="#fff"
                                        autoCapitalize="none"
                                        secureTextEntry
                                        placeholder='Enter new Password'
                                        onChangeText={(text) => setnewPassword(text)}

                                    />

                                    <TouchableOpacity
                                        onPress={UpdatePassword}
                                        style={styles.button}
                                    >
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                            OK</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ alignItems: 'center', justifyContent: "center", flexDirection: 'row', paddingTop: 40 }}>
                                    <TouchableOpacity
                                        onPress={GoProfile}
                                        style={styles.button}
                                    >
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                            Back</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={signOut}
                                        style={styles.button}
                                    >
                                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                            Log Out</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </Animatable.View>
                    </KeyboardAwareScrollView>

                </SafeAreaView>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    textBoxes: {
        width: '60%',
        marginLeft: 20,
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
export default EditProfile;
