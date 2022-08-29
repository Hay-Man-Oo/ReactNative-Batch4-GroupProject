import React, { useState } from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { firebase } from '../config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('')


    function onResetPasswordPress() {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                Alert.alert("Password reset email has been sent.");
            }, (error) => {
                Alert.alert(error.message);
            });
    }

    function onBackToLoginPress() {

        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/bg.jpg')}
                style={{ width: '100%', height: "100%" }}
            >


                <SafeAreaView style={{ flex: 1, padding: 5 }}>

                    <KeyboardAwareScrollView>
                        <Animatable.View
                            animation="pulse"
                            direction='alternate'
                            iterationCount='infinite'
                        >
                            <View style={{ flex: 1, marginLeft: 200, }}>

                                <Text style={{ fontSize: 40, paddingLeft: 30, marginTop: 60, fontWeight: "900", color: "#000" }}>WTTH</Text>
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
                        <Animatable.View
                            animation="fadeInUp"
                            duration={1000}

                        >
                            <View style={{ flex: 1, padding: 20, marginTop: 100 }}>

                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: "#fff" }}>Forgot Password?</Text>

                                <TextInput style={styles.textBoxes}
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                    placeholderTextColor="#fff"
                                    placeholder="Email"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}


                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={onResetPasswordPress} >
                                        <Text style={styles.buttonTitle}>ResetPassword</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={onBackToLoginPress}>
                                        <Text style={styles.buttonTitle}>Back To Log in</Text>
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
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#000"
    },
    textBoxes: {
        width: '70%',
        fontSize: 18,
        padding: 12,
        borderColor: 'grey',
        borderBottomWidth: 2,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        color: "#fff"
    },
    button: {
        backgroundColor: '#f7d081',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    acc: {

        height: 80,
        width: 80,
        alignSelf: "center",
        margin: 30,
        borderRadius: 20
    },
    buttonTitle: {

        fontSize: 16,
        fontWeight: "bold"
    },
});
