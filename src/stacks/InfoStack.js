import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Details from '../screens/infos/Details'

const Stack = createNativeStackNavigator()

const InfoStack = () => {
  return (
    <Stack.Navigator initialRouteName='Menu' screenOptions={() => ({headerShown : false})}>
        <Stack.Screen component={Details} name='Details' />
    </Stack.Navigator>
  )
}

export default InfoStack