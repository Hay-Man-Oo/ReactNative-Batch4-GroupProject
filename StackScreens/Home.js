import React from 'react';
import { Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Entypo } from '@expo/vector-icons';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import { firebase } from '../config';
import { TouchableOpacity } from 'react-native';

import DrawerHome from '../DrawerScreens/DrawerHome';
import Products from '../DrawerScreens/Products';
import MyCart from '../DrawerScreens/MyCart';
import OrderDetail from '../DrawerScreens/OrderDetail';
import AboutUs from '../DrawerScreens/AboutUs';
import CustomDrawer from '../DrawerScreens/CustomDrawer';
import UserAccount from '../DrawerScreens/UserAccount'
import { CommonActions } from '@react-navigation/native'
const Drawer = createDrawerNavigator();

export default function Home(navigation) {

    const SignOut = ({navigation}) => {
        firebase.auth().signOut()
       
            navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }]
            })
       
    }
    return (
        <Drawer.Navigator initialRouteName="DrawerHome"
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerActiveBackgroundColor: "black",
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
            }} >
            <Drawer.Screen
                name="DrawerHome"
                component={DrawerHome}
                options={{
                    //headerShown: false,
                    title: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={'#ffd700'} size={30} />
                    ),
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerRight: () => <Image
                        style={{ width: 40, height: 40, borderRadius: 50, margin: 15, borderWidth: 1,borderColor: "#fff" }}
                        source={require('../assets/logo.png')}
                    />,
                }}
            />
            <Drawer.Screen
                name="Products"
                component={Products}
                options={({ navigation }) => ({
                    title: 'Products',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="shopping" color={'#ffd700'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                    headerRight: () => (
                        <MaterialCommunityIcons
                            name="cart"
                            style={{
                                fontSize: 30,
                                color: '#f7d081',
                                margin: 10,
                            }}
                            onPress={() => navigation.navigate('MyCart')}
                        />
                    ),
                })}
            />
            <Drawer.Screen
                name="MyCart"
                component={MyCart}
                options={{
                    title: 'MyCart',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="cart-outline" color={'#ffd700'} size={30} />
                    ),headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                }}
            />
            <Drawer.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={{
                    title: 'OrderDetail',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="clipboard-list-outline" color={'#ffd700'} size={30} />
                        ),headerTintColor: '#fff',
                        headerStyle: {
                            backgroundColor: '#000'
                        },
                }}
            />
            <Drawer.Screen
                name="UserAccount"
                component={UserAccount}
                options={{
                    title: 'Profile',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={'#ffd700'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                   
                }}
            />
           
            <Drawer.Screen
                name="AboutUs"
                component={AboutUs}
                options={{
                    title: 'AboutUs',
                    drawerIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="information-outline" color={'#ffd700'} size={30} />
                    ), headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000'
                    },
                   
                }}
            />
           
        </Drawer.Navigator>
    );
}
