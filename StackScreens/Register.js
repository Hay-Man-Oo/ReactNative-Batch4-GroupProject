import { SafeAreaView, ImageBackground, ActivityIndicator, Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Button } from 'react-native';
import { collection, doc, setDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { firebase } from '../config'
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setName] = useState("");
    const [emailError, setEmailError] = useState("")
    const [phone, setphone] = useState("");
    const [address, setaddress] = useState("");
    const [usernameError, setusernameError] = useState("")
    const [phoneError, setphoneError] = useState("")
    const [addressError, setaddressError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmpasswordError, setconfirmPasswordError] = useState("")
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const onFooterLinkPress = () => {
        navigation.navigate('Login')
    }
    const onRegisterPress = () => {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();

        var nameValid = false;
        if (username.length == 0) {
            setusernameError("Enter Full Name");
        }
        else {
            setusernameError("")
            nameValid = true
        }
        //Email Validation
        var emailValid = false;
        if (email.length == 0) {
            setEmailError("Email is required");
        }
        else if (email.length < 6) {
            setEmailError("Email should be minimum 6 characters");
        }
        else if (email.indexOf(' ') >= 0) {
            setEmailError('Email cannot contain spaces');
        }
        else if (!emailPattern.test(email) && email.length > 0) {
            setEmailError("Enter a valid email!")

        }
        else {
            setEmailError("")
            emailValid = true
        }
        //phone validation
        var phoneValid = false;
        if (phone.length == 0) {
            setphoneError("Enter a phone number.");
        }

        else {
            setphoneError("")
            phoneValid = true

        }
        //address validation
        var addressValid = false;
        if (address.length == 0) {
            setaddressError("Enter an Address. ");
        }

        else {
            setaddressError("")
            addressValid = true

        }
        //password validation

        var passwordValid = false;
        if (password.length == 0) {
            setPasswordError("Password is required");
        }
        else if (password.length < 6) {
            setPasswordError("Password should be minimum 6 characters");
        }
        else if (password.indexOf(' ') >= 0) {
            setPasswordError('Password cannot contain spaces');
        }
        else {
            setPasswordError("")
            passwordValid = true
        }
        //confirmpassword validation
        var confirmpasswordValid = false;
        if (confirmPassword.length == 0) {
            setconfirmPasswordError("Enter Password Confirmation.");
        }


        else if (confirmPassword !== password) {

            setconfirmPasswordError("Password and Confrim password must be the same!")
        }

        else {
            setconfirmPasswordError("")
            confirmpasswordValid = true
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    const uid = response.user.uid
                    const data = {
                        id: uid,
                        email,
                        role: 'Client',
                        username,
                        phone,
                        address,
                        createdAt: timestamp,
                    };
                    const usersRef = firebase.firestore().collection('users')
                    usersRef
                        .doc(uid)
                        .set(data)
                        .then(() => {
                            navigation.navigate('Home')
                        })
                        .catch((error) => {

                            alert(error)
                        });
                })
                .catch((error) => {

                    alert("Email is already used")
                });
        }

    }


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/bg.jpg')}
                style={{ width: '100%', height: "100%", }}
            >

                <SafeAreaView style={{ flex: 1, padding: 5 }}>

                    <KeyboardAwareScrollView>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{
                                    fontSize: 28, fontWeight: "bold", color: "#f7d081", marginBottom: 40, marginLeft: 40, marginTop: 90
                                }}>Sign Up</Text>
                                <Animatable.View
                                    animation="pulse"
                                    direction='alternate'
                                    iterationCount='infinite'
                                >
                                    <View style={{ flex: 1, marginLeft: 70 }}>

                                        <Text style={{ fontSize: 40, paddingLeft: 20, marginTop: 30, fontWeight: "900", color: "#000" }}>WTTH</Text>
                                        <Image
                                            style={{
                                                height: 80,
                                                width: 80,
                                                marginLeft: 45,
                                                marginTop: 15,
                                                borderRadius: 50
                                            }}
                                            source={require('../assets/logo.png')}
                                        />

                                    </View>
                                </Animatable.View>
                            </View>

                            <Animatable.View
                                animation="fadeInUp"
                                duration={1000}

                            >
                                <TextInput
                                    placeholderTextColor="#fff"
                                    value={username}
                                    onChangeText={(text) => setName(text)}
                                    placeholder='Enter Your Name'
                                    style={styles.textBoxes} >

                                </TextInput>
                                {usernameError.length > 0 &&
                                    <Text style={{ color: "red" }}>{usernameError}</Text>
                                }

                                <TextInput
                                    value={email}
                                    placeholderTextColor="#fff"
                                    onChangeText={(text) => setEmail(text)}
                                    placeholder='Email Address'
                                    autoCapitalize="none"
                                    keyboardType={'email-address'}
                                    style={styles.textBoxes}
                                >

                                </TextInput>
                                {emailError.length > 0 &&
                                    <Text style={{ color: "red" }}>{emailError}</Text>
                                }
                                <TextInput
                                    value={phone}
                                    placeholderTextColor="#fff"
                                    onChangeText={(text) => setphone(text)}
                                    placeholder='Enter Phone Number'
                                    style={styles.textBoxes}
                                    keyboardType={'phone-pad'}
                                >

                                </TextInput>
                                {phoneError.length > 0 &&

                                    <Text style={{ color: "red" }}>{phoneError}</Text>
                                }
                                <TextInput
                                    value={address}
                                    placeholderTextColor="#fff"
                                    onChangeText={(text) => setaddress(text)}
                                    placeholder='Enter Your Address'
                                    style={styles.textBoxes}
                                >

                                </TextInput>
                                {addressError.length > 0 &&

                                    <Text style={{ color: "red" }}>{addressError}</Text>
                                }
                                <TextInput
                                    value={password}
                                    placeholderTextColor="#fff"
                                    secureTextEntry
                                    onChangeText={(text) => setPassword(text)}
                                    placeholder='Password'
                                    style={styles.textBoxes} >

                                </TextInput>
                                {passwordError.length > 0 &&

                                    <Text style={{ color: "red" }}>{passwordError}</Text>
                                }

                                <TextInput
                                    placeholderTextColor="#fff"
                                    secureTextEntry
                                    placeholder='Confirm Password'
                                    onChangeText={(text) => setConfirmPassword(text)}
                                    value={confirmPassword}
                                    style={styles.textBoxes}
                                />
                                {confirmpasswordError.length > 0 &&

                                    <Text style={{ color: "red" }}>{confirmpasswordError}</Text>
                                }
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => onRegisterPress()}>
                                    <Text style={styles.buttonTitle}>Create account</Text>
                                </TouchableOpacity>
                                <View style={{ marginTop: 30, marginBottom: 20 }}>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>Already got an account? <Text onPress={onFooterLinkPress} style={{ color: "#ffd700", fontSize: 20, fontWeight: "bold" }}>Log in</Text></Text>
                                </View>
                            </Animatable.View>
                        </View>

                    </KeyboardAwareScrollView>

                </SafeAreaView>
            </ImageBackground>
        </View>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBoxes: {
        width: '75%',
        fontSize: 16,
        padding: 12,
        borderColor: 'grey',
        borderBottomWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        color: "#fff",
        marginBottom: 10
    },
    acc: {

        height: 80,
        width: 80,
        marginLeft: 20,
        marginTop: 30,
        alignSelf: "center",
        borderRadius: 50
    },
    button: {
        padding: 5,
        backgroundColor: '#f7d081',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: "bold"
    },
});

