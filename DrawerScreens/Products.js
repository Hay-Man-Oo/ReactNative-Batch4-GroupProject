import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import All from "../TabScreens/All";
import WomanClothing from "../TabScreens/WomanClothing";
import MenClothing from "../TabScreens/MenClothing";
import Shoes from "../TabScreens/Shoes";
import Accessories from "../TabScreens/Accessories";

export default function Products({ navigation }) {
  const Tab = createBottomTabNavigator();
  return (

    <Tab.Navigator
      initialRouteName={"All"}
      screenOptions={{
        headerShown: false,
         
          "tabBarActiveTintColor": "#fff",
          "tabBarInactiveTintColor": "#fff",
          "tabBarActiveBackgroundColor": "#757271",
          "tabBarInactiveBackgroundColor": "#000",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ] 
       
      }}
      //tabBarOptions={{
      // 
      //  activeTintColor: '#fff',
      //  inactiveTintColor: '#fff',
      //  activeBackgroundColor: '#757271',
      //  inactiveBackgroundColor: '#000',
        //style: {
        //      backgroundColor: '#000',
        //}
      //}}
    >
      <Tab.Screen
        name="All"
        component={All}
        options={{
          //tabBarLabel: 'WomanClothes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={'#FFE89C'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Woman"
        component={WomanClothing}
        options={{
          //tabBarLabel: 'WomanClothes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="woman" color={'#FFE89C'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Man"
        component={MenClothing}
        options={{
          //tabBarLabel: 'MenClothes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="man" color={'#FFE89C'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Shoe"
        component={Shoes}
        options={{
          //tabBarLabel: 'Shoes',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shoe-heel" color={'#FFE89C'} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Accessory"
        component={Accessories}
        options={{
          //tabBarLabel: 'Accessories',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="necklace" color={'#FFE89C'} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );

}