import { View, Text } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ButtomTabStack from './ButtomTabStack'
import { HeaderShownContext } from '@react-navigation/elements'
import store from '../../store/store'
import Menu from '../screens/menu/Menu';
import Contacts from '../screens/Listes/Contacts';

const Stack = createNativeStackNavigator()
const AppStack = () => {
  return (
    <Provider store={store}>
    <Stack.Navigator screenOptions={() => ({headerShown : false})}>
        <Stack.Screen component={Menu} name='Menu'/>
        <Stack.Screen component={Contacts} name='Contacts'/>
        <Stack.Screen component={ButtomTabStack} name='ButtomTabStack'/>
    </Stack.Navigator>
    </Provider>
  )
}

export default AppStack