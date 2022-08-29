import { Alert, StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import { firebase } from '../config'
import { TextInput } from 'react-native-gesture-handler';

const CreateCategory = ({navigation}) => {

    const [data, setData] = useState([]);
    const dataRef = firebase.firestore().collection('categories')

    const [name, setName] = useState('');

    const addCat = () => {
        if (name && name.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();

            const categories = {
                name: name,
                createdAt: timestamp
            };
            dataRef
                .add(categories)
                .then(() => {
                    setName('');
                })
                .then(() => {
                    Alert.alert('Successfully added!')
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.header}>CreateCategory</Text>

            <TextInput
                style={styles.input}
                placeholder='Name'
                onChangeText={(text) => setName(text)}
                value={name}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={addCat}
            >
                <Text>Create</Text>
            </TouchableOpacity><TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Admin')}
            >
                <Text>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                title='Category'
                onPress={() => navigation.navigate('CategoryList')}
            />

            


        </View>
    )
}

export default CreateCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },

    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },

    button: {
        marginTop: 10,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#FFE89C",
        padding: 10,
        width: '100%',
        borderRadius: 20
    },
})