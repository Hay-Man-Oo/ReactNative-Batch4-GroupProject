import { SafeAreaView, ActivityIndicator, StyleSheet, Text, View, TextInput, TouchableOpacity, Button, Image, ImageBackground } from 'react-native';
import { firebase } from '../config'
import React, { useState, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { set } from 'react-native-reanimated';
export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const [show, setshow] = useState(false);

    function register() {
        navigation.navigate('Register')
    }
    function forgotPassword() {
        navigation.navigate("ForgotPassword")
    }

    const onLoginPress = () => {
        setshow(true)
        setTimeout(() => {
            setshow(false)
        }, 4000)
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

        var passwordValid = false;
        if (password.length == 0) {
            setPasswordError("Password is Required!");
        }
        else {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then((response) => {
                    const uid = response.user.uid
                    const usersRef = firebase.firestore().collection('users')
                    usersRef
                        .doc(uid)
                        .get()
                        .then(firestoreDocument => {
                            //console.log("firebase Data:",firestoreDocument.data())

                            if (!firestoreDocument.exists) {
                                //alert("User does not exist anymore.")
                                setPasswordError("User does not exist anymore");
                                return;
                            }

                            else {

                                const userrole = firestoreDocument.data()?.role
                                //console.log(userrole)
                                if (userrole == "Admin") {
                                    navigation.navigate("AdminHome")
                                } else
                                    navigation.navigate("Home")
                            }
                        })

                    //.catch(error => {
                    //    console.log(error)
                    //        setPasswordError("Useremail or password is wrong");
                    //    //   console.log(error)
                    //})
                })
                .catch(error => {
                    console.log(error)
                    setPasswordError("Email or Password is wrong!Try Again...");

                })

            setPasswordError("")
            passwordValid = true
        }

    }


    return (

        <View style={styles.container}>

            <ImageBackground
                source={require('../assets/bg.jpg')}
                style={{ width: '100%', height: "100%" }}
            >
                <SafeAreaView style={{ flex: 1, padding: 5, marginTop: -2 }}>

                    <KeyboardAwareScrollView>
                        <Animatable.View
                            animation="pulse"
                            direction='alternate'
                            iterationCount='infinite'
                        >
                            <View style={{ flex: 1, marginLeft: 200, }}>

                                <Text style={{ fontSize: 40, paddingLeft: 30, marginTop: 90, fontWeight: "900", color: "#000" }}>WTTH</Text>
                                <Image
                                    style={{
                                        height: 100,
                                        width: 100,
                                        marginLeft: 45,
                                        marginTop: 25,
                                        borderRadius: 50
                                    }}
                                    source={require('../assets/logo.png')}
                                />
                            </View>
                        </Animatable.View>

                        <View style={styles.con}>
                            <Animatable.View
                                animation='fadeInUp'
                                duration={2000}
                            >
                                <Text style={{
                                    fontSize: 28, fontWeight: "bold", color: "#f7d081", marginBottom: 40, marginLeft: 10,
                                }}>LOG IN</Text>

                                <TextInput
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                    placeholder='Email Address'
                                    style={styles.textBoxes}
                                    keyboardType={'email-address'}
                                    placeholderTextColor="#c4c4c2"
                                />
                                {emailError.length > 0 &&
                                    <Text style={{ color: "red" }}>{emailError}</Text>
                                }
                                <TextInput
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                    placeholder='Password'
                                    style={styles.textBoxes}
                                    secureTextEntry
                                    placeholderTextColor="#c4c4c2" />

                                {passwordError.length > 0 &&

                                    <Text style={{ color: "red" }}>{passwordError}</Text>
                                }

                                <ActivityIndicator size="large" color="gold" animating={show} style={styles.activityIndicator}></ActivityIndicator>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => onLoginPress()}
                                >
                                    <Text style={styles.buttonTitle}>Log in</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ marginTop: 30, marginLeft: 10, }} onPress={forgotPassword}>
                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>Forgot Password?</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 1, marginTop: 20, marginLeft: 10, }}>
                                    <Text style={{ fontSize: 18, color: "#fff" }}>Don't have an account? <Text style={{ color: "#f7d081", fontSize: 20, fontWeight: "bold" }}
                                        onPress={register}>Sign up</Text></Text>
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
        position: 'relative'

    },
    con: {
        flex: 1.5,
        margin: 10,
        marginTop: -50,
    },
    textBoxes: {
        width: '65%',
        fontSize: 18,
        padding: 10,
        borderColor: 'white',
        borderBottomWidth: 2,
        color: '#fff',
        borderRadius: 10,
        paddingTop: 30,
        marginBottom: 10
    },
    acc: {
        width: '100%', height: 200,
        height: 80,
        width: 80,
        alignSelf: "center",
        //marginTop: 150,
        borderRadius: 50
    },
    button: {
        backgroundColor: '#f7d081',
        width: 100,
        marginLeft: 10,
        marginTop: 30,
        borderRadius: 5,
        alignItems: "center",
        padding: 10,
        justifyContent: 'center'
    },
    buttonTitle: {
        color: '#000',
        fontSize: 20,
        fontWeight: "bold",

    },
    activityIndicator: {
        paddingTop: "95%",
        paddingLeft: "65%",
        position: 'absolute',
    }
});