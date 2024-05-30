import { View, Text, SafeAreaView, StyleSheet, StatusBar, Button, Image, Dimensions,
    ImageBackground, TouchableOpacity, ActivityIndicator, ScrollView
 } from 'react-native'
import { Feather, Ionicons, FontAwesome, Foundation, AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import imageAvatar from '../../../assets/avatar.jpg'

const Menu = ({ navigation }) => {

    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = fetch('https://api-v2.hopcrm.com/api/mobile/sessions/infos')
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
    
      const fetchData = fetch('https://api-v2.hopcrm.com/api/mobile/infos/volumetrie')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });

      Promise.all([fetchUser, fetchData])
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (!data || Object.keys(data).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>No data available</Text>
      </View>
    );
  }

  const dataArray = Object.entries(data);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  
  const renderIcon = (key) => {
    switch (key) {
      case 'organisation':
        return <FontAwesome style={styles.iconstyle} name="bank" size={130} color="#b2bdc4" />
      case 'contact':
        return <Ionicons style={styles.iconstyle} name="person" size={130} color="#b2bdc4" />
      case 'action':
        return <FontAwesome style={styles.iconstyle} name="calendar-plus-o" size={130} color="#b2bdc4" />
      case 'note':
        return <Foundation style={styles.iconstyle} name="pencil" size={130} color="#b2bdc4" />
      case 'affaire':
        return <Feather style={styles.iconstyle} name="target" size={130} color="#b2bdc4" />
      case 'document':
        return <Ionicons style={styles.iconstyle} name="document" size={130} color="#b2bdc4" />
      case 'produit':
        return <AntDesign style={styles.iconstyle} name="shoppingcart" size={130} color="#b2bdc4" />
      case 'piece':
        return <FontAwesome5 style={styles.iconstyle} name="calculator" size={130} color="#b2bdc4" />
      case 'reglement':
        return <Entypo style={styles.iconstyle} name="calendar" size={130} color="#b2bdc4" />
      case 'ligne':
        return <FontAwesome5 style={styles.iconstyle} name="chart-line" size={130} color="#b2bdc4" />
      case 'ticket':
        return <Entypo style={styles.iconstyle} name="ticket" size={130} color="#b2bdc4" />
      default:
        return <Feather style={styles.iconstyle}  name="menu" size={130} color="#b2bdc4" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        
            <View>
                <View style={styles.Nav}>
                    <View style={styles.leftNav}>
                        <Image
                            source={imageAvatar}
                            style={styles.image}
                        />
                        <View>
                            <Text style={{color: 'white'}}>Bonjour {user.user.prenom}</Text>
                            <Text style={{color: 'white'}}>{user.client.nom}</Text>
                        </View>
                    </View>
                    <View style={styles.rightNav}>
                        <Ionicons name="notifications" size={24} color="white" />
                        <Feather name="menu" size={24} color="white" />
                    </View>
                </View>
                <ScrollView >
                <View style={styles.main}>
                {dataArray.map(([key, value]) => (
                <TouchableOpacity activeOpacity={0.9} key={key} onPress={() => {if (key === 'contact') {
                    navigation.navigate('Contacts');
                  }}}>
                    <ImageBackground style={styles.backgroundImg} 
                    onPress={() => navigation.navigate('Contacts')}>
                        <View style={styles.card}>
                        {renderIcon(key)}
                        <Text style={styles.number}>{value}</Text>
                        <Text style={styles.titletxt}>{key}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                ))}

                </View>
        </ScrollView>
            </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      marginTop: StatusBar.currentHeight
    },
    Nav: {
      width: Dimensions.get('screen').width * 1,
      paddingTop: 10,
      paddingBottom: 10,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'center',
      backgroundColor: 'hsl(207, 44%, 38%)'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    leftNav:{
        width: Dimensions.get('screen').width * 0.50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center"
    },
    rightNav:{
        width: Dimensions.get('screen').width * 0.30,
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center'
    },
    backgroundImg: {
        width: Dimensions.get('screen').width * 0.35,
        height: Dimensions.get('screen').width * 0.35,
        backgroundColor: 'hsl(209, 13%, 66%)',
        borderRadius: 5,
        marginLeft: 5,
        marginBottom: 20,
        overflow: 'hidden'
    },
    card: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    number: {
        position: 'absolute',
        right: 5,
        top: 5,
        color: 'white',
        fontSize: 20,
    },
    titletxt: {
        position: 'absolute',
        left: 5,
        bottom: 5,
        color: 'white',
        fontSize: 20,

    },
    main:{
        marginTop: 10,
        marginBottom: 60,
        width: Dimensions.get('screen').width * 1,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        flexDirection: 'row',
        padding: 20
    },
    iconstyle: {
        position: 'absolute',
        bottom: -10,
        left: -6
    }


  })

export default Menu