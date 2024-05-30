import { View, Text,SafeAreaView, StyleSheet, StatusBar } from 'react-native'
import React from 'react'

const Notes = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <Text style={styles.title}>Notes</Text>
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

export default Notes