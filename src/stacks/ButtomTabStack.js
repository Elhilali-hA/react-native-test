import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import InfoStack from './InfoStack'
import Notes from '../screens/Notes/Notes'
import Tasks from '../screens/Tasks/Tasks'
import Affair from '../screens/affair/Affair'
import Others from '../screens/others/Others'
import { AntDesign, Octicons,MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

const ButtomTabStack = () => {
  return (
    <Tab.Navigator initialRouteName='InfoStack' screenOptions={() => ({ tabBarShowLabel:false, headerShown: false, tabBarStyle: styles.bottomTabView })}>
      <Tab.Screen component={InfoStack} name='InfoStack' options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.wrapper}>
              <View style={styles.iconView}>
                {focused ? <AntDesign name="infocirlceo" size={24} color="black" />: 
                <AntDesign name="infocirlceo" size={24} color="white" />}
              </View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.text,
                  {
                    color: focused ? '#000' : '#fff',
                  },
                ]}>
                Info
              </Text>
            </View>
          ),
        }} />
      <Tab.Screen component={Notes} name='Notes' 
      options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.wrapper}>
              <View style={styles.iconView}>
                {focused ? <Octicons name="pencil" size={24} color="black" />: 
                <Octicons name="pencil" size={24} color="white" />}
              </View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[
                  styles.text,
                  {
                    color: focused ? '#000' : '#fff',
                  },
                ]}>
                Notes
              </Text>
            </View>
          ),
        }} />
      <Tab.Screen component={Tasks} name='Tasks'
      options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.wrapper}>
            <View style={styles.iconView}>
              {focused ? <MaterialCommunityIcons name="calendar-plus" size={24} color="black" />: 
              <MaterialCommunityIcons name="calendar-plus" size={24} color="white" />}
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.text,
                {
                  color: focused ? '#000' : '#fff',
                },
              ]}>
              Tasks
            </Text>
          </View>
        ),
      }} />
      <Tab.Screen component={Affair} name='Affair' 
      options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.wrapper}>
            <View style={styles.iconView}>
              {focused ? <Feather name="target" size={24} color="black" />: 
              <Feather name="target" size={24} color="white" />}
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.text,
                {
                  color: focused ? '#000' : '#fff',
                },
              ]}>
              Affair
            </Text>
          </View>
        ),
      }}/>
      <Tab.Screen component={Others} name='Others' 
      options={{
        tabBarIcon: ({focused}) => (
          <View style={styles.wrapper}>
            <View style={styles.iconView}>
              {focused ? <Ionicons name="menu" size={24} color="black" />: 
              <Ionicons name="menu" size={24} color="white" />}
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[
                styles.text,
                {
                  color: focused ? '#000' : '#fff',
                },
              ]}>
              Others
            </Text>
          </View>
        ),
      }}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  bottomTabView: {
    backgroundColor: 'hsl(209, 13%, 66%)',
    height: 70,
    width: '100%',
  },
  wrapper: {
    width: Dimensions.get('screen').width * 0.20,
    height: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  iconView: {
    width: '100%',
    height: 24,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  text: {
    fontSize: 10,
    color: '#000',
    textAlign: 'center',
  },
})

export default ButtomTabStack