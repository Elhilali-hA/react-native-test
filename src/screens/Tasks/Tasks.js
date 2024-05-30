import { View, Text,SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const Tasks = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>Tasks</Text>
    </View>
    </SafeAreaView>

  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  title: {
    fontSize: 30
  }
})

export default Tasks