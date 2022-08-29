import { createStackNavigator } from '@react-navigation/stack';
import AdminScreen from './AdminScreen';
import CreateProduct from './CreateProduct';
import UpdateProduct from './UpdateProduct';
import CreateCategory from './CreateCategory';
import CategoryList from './CategoryList';
import Confirm from './confirm';

const Stack = createStackNavigator();

export default function AdminHome({navigation}) {
    return (
    
      <Stack.Navigator
        initialRouteName="Admin"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Admin" component={AdminScreen} />
        <Stack.Screen name='CreateProduct' component={CreateProduct} options={{ headerShown: true}} />
        <Stack.Screen name='UpdateProduct' component={UpdateProduct} options={{ headerShown: true}} />
        <Stack.Screen name='CreateCategory' component={CreateCategory} />
        <Stack.Screen name='CategoryList' component={CategoryList} />
        <Stack.Screen name='orderConfirm' component={Confirm} />
      </Stack.Navigator>
   
    );
  }