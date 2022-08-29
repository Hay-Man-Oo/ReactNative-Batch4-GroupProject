import { Linking, ImageBackground, Alert, Text, View, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState, useEffect } from "react";
import { firebase } from '../config';
import * as Animatable from 'react-native-animatable';
export default function AboutUs({ navigation }) {
    const firestore = firebase.firestore;
    const auth = firebase.auth;
    const [user, setUser] = useState(null)


    useEffect(() => {
        firebase.firestore().collection("users")
            .doc(auth().currentUser.uid).get()
            .then(user => {
                setUser(user.data())
            })
    }, [])
    const [mesg, setMesg] = useState('');
    const add = async () => {


        const dataRef = firebase.firestore().collection('feedback')
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
            userfeedback: mesg,
            createdAt: timestamp,
            username: user?.username,
        };
        dataRef
            .add(data)
            .then(() => {
                setMesg("")
            })
            .then(() => {
                Alert.alert("Thank You for your feedback!");
            })
            .catch((error) => {
                alert(error);
            });
    }
    const makeCall = () => {

        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${+95-9761432944}';
        } else {
            phoneNumber = 'telprompt:${+95-9761432944}';
        }

        Linking.openURL(phoneNumber);
    };
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/bgaboutus.jpg')}
                style={{ width: '100%', height: "100%", }}
            >
                <ScrollView>
                    <View style={{ marginBottom: 30 }}>
                        <Animatable.View
                            animation="fadeInRightBig"
                            duration={4000}
                        >
                            <View style={{ flexDirection: 'row', padding: 10 }}>

                                <View style={{ width: '60%', alignItems: 'center' }}>

                                    <Text style={styles.text}>
                                        WTTH Brands Shop is the e-commerce site for Men & Woman Clothings , Shoes and Accessories INc.
                                        uses to manage online order fulfillment providing customers with a convenient, fast,
                                        and secure shopping experience.
                                    </Text>
                                </View>

                                <View>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('../assets/logo.png')}
                                    />
                                </View>
                            </View>
                        </Animatable.View>
                        <Animatable.View
                            animation="fadeInLeftBig"
                            duration={4000}
                        >
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: '800', color: '#FFE89C', padding: 5 }}>
                                    Our Goal
                                </Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('../assets/logo.png')}
                                    />
                                    <View style={styles.mission}>
                                        <Text style={styles.textGold}>
                                            We have become a part of the community’s common knowledge but we continue to move
                                            forward to catch the mindset of the future generation by taking one step ahead of
                                            the norm and being the first to establish a new trend.
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Animatable.View>

                        <Animatable.View
                            animation="fadeInRightBig"
                            duration={4000}
                        >
                            <View style={styles.vision}>
                                <Text style={{ fontSize: 18, fontWeight: '800', color: '#FFE89C', padding: 5 }}>
                                    Our Vision
                                </Text>
                                <Text style={styles.textGold}>
                                    Our vision is to improve the standard of living of the all customers consumers
                                    and provide them a great buying experience of our brand Products that have been at the core of our business.
                                </Text>
                            </View>
                        </Animatable.View>
                        <Animatable.View
                            animation="pulse"
                            iterationCount='infinite'
                        >
                            <Text style={{ fontSize: 20, fontWeight: '800', color: '#FFE89C', padding: 10, textAlign: 'center' }}>We Belong To Something Smart & Chic.</Text>
                        </Animatable.View>

                        <Animatable.View
                            animation="fadeInRightBig"
                            duration={4000}
                        >
                            <View style={{ padding: 10, flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="phone" size={30} color={'#FFE89C'} />
                                <TouchableOpacity onPress={makeCall}>
                                    <Text style={{ color: '#FFE89C', padding: 7, fontSize: 16, fontWeight: '500' }}>+95-9761432944</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ padding: 10, flexDirection: 'row' }}>
                                <MaterialCommunityIcons name="email" size={30} color={'#FFE89C'} />
                                <TouchableOpacity onPress={() => Linking.openURL('mailto:wtth@brandmail.com?subject=SendMail&body=Description')}>
                                    <Text style={{ color: '#FFE89C', padding: 7, fontSize: 16, fontWeight: '500' }}>wtth@brandmail.com</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', paddingLeft: 20 }}>

                                <TextInput
                                    style={styles.inputAddress}
                                    placeholder='FeelFree To Give Your Feedback '
                                    onChangeText={(text) => setMesg(text)}
                                    value={mesg}
                                />
                                <View>
                                    <TouchableOpacity
                                        onPress={add}
                                        style={styles.btn}
                                    >
                                        <Text style={{ textAlign: "center", fontWeight: "bold" }}>Send</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        </Animatable.View>
                        <Animatable.View
                            animation="bounceIn"
                            duration={4000}
                        >
                            <View>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10, paddingTop: 10, color: '#FFE89C', letterSpacing: 1 }}>Developed By</Text>
                                <Text style={styles.devName}>Wunna</Text>
                                <Text style={styles.devName}>Theint Yadanar Lwin</Text>
                                <Text style={styles.devName}>Thiri Sein</Text>
                                <Text style={styles.devName}>Hay Man Oo</Text>
                            </View>
                        </Animatable.View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'black'
    },
    devName: {
        fontSize: 16,
        fontWeight: '800',
        padding: 5,
        color: '#FFE89C',
        letterSpacing: 1,
    },
    aboutText: {
        fontSize: 30,
        fontWeight: 'bold',
        //padding: 10,
        color: '#FFE89C',
        letterSpacing: 1,
    },
    tinyLogo: {
        width: 140,
        height: 140,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
        marginTop: 20
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 1,
        //paddingLeft: 8,
        color: 'white'
    },
    textGold: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 16,
        letterSpacing: 1,
        padding: 8,
        color: 'white'
    },
    mission: {
        paddingTop: 5,
        width: '60%',
        marginBottom: 10,
        marginTop: 5
    },
    vision: {
        paddingTop: 5,
        marginBottom: 10,
        //borderBottomWidth: 1,
        borderBottomColor: 'gold'
    },
    contact: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputAddress: {
        width: '70%',
        height: 40,
        //margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFE89C'

    },
    btn: {
        marginLeft: 20,
        backgroundColor: "#FFE89C",
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        justifyContent: "center",
        width: 50,
    }
})