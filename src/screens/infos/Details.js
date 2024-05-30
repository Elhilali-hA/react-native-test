import { View, Text, SafeAreaView, StyleSheet, StatusBar, 
  TouchableOpacity, Dimensions, Image, TextInput, Switch, Button, ActivityIndicator, Linking } from 'react-native'
import React, {useState, useEffect} from 'react'
import imageAvatar from '../../../assets/avatar.jpg'
import { Feather, FontAwesome,AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';


const Details = ({navigation}) => {
  const cle = useSelector((state) => state.data.cle);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);

  useEffect(() => {
    fetch(`https://api-v2.hopcrm.com/api/mobile/contacts/${cle}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleEmailPress = (email) => {
    Linking.openURL(`mailto:${email}`).catch((err) => console.error('An error occurred', err));
  };

  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`).catch((err) => console.error('An error occurred', err));
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <SafeAreaView style={styles.container}>
    <View>
      <View style={styles.topNav}>
        <View style={styles.contact}>
            <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
                <AntDesign name="left" size={18} color="white" />
            </TouchableOpacity>
            <Text style={{color: 'white'}}>Contacts</Text>
        </View>
        <Text style={{color: 'white'}}>Modifier</Text>
      </View>
    <View style={styles.Nav}>
            <View style={styles.leftNav}>
                <Image
                    source={imageAvatar}
                    style={styles.image}
                />
                <View>
                    <Text style={{color: 'white', fontSize: 12}}>{data.contact?.prenom} {data.contact?.nom}</Text>
                    <Text style={{color: 'white', fontSize: 12}}>{data.entreprise?.nom}</Text>
                    <Text style={{color: 'white', fontSize: 12}}>{data.entreprise?.e_mail}</Text>
                    <Text style={{color: 'white', fontSize: 12}}>{data.entreprise?.telephone_fixe}</Text>
                </View>
            </View>
            <View style={styles.rightNav}>
            <TouchableOpacity onPress={() => handleEmailPress(data.entreprise?.e_mail)}>
            <Feather name="mail" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => handlePhonePress(data.entreprise?.telephone_fixe)}>
            <FontAwesome name="phone" size={24} color="white" />
            </TouchableOpacity>
            </View>
        </View>
    </View>
    <View>
      <View style={styles.inputsSection}>
          <View style={styles.inputAndTxt}>
            <Text>Nom</Text>
            <TextInput
                    style={styles.input}
                    placeholder={`${data.contact?.nom}`} 
            />
          </View>
          <View style={styles.inputAndTxt}>
            <Text>Prénom</Text>
            <TextInput
                    style={styles.input}
                    placeholder={`${data.contact?.prenom}`} 
            />
          </View>
          <View >
              <Text>Adress mail</Text>
            <View style={styles.inputAndIconSwitch}>
              <View style={styles.inputAndIcon}>
                <TextInput
                        style={styles.input2}
                        placeholder={`${data.contact?.e_mail}`} 
                />
                <View style={styles.iconBackg} >
                  <TouchableOpacity onPress={() => handleEmailPress(data.contact?.e_mail)}>
                  <Feather name="mail" size={24} color="white" />
                  </TouchableOpacity>

                </View>
                
              </View>
                <View style={styles.switchDiv}>
                  <Text style={{fontSize: 12, marginBottom: 3}}>Open mail</Text>
                  <View style={isEnabled ? styles.Activeswitch : styles.NotActiveswitch}>
                    <Switch
                    style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                      trackColor={{ false: '#ccc', true: '#81b0ff' }}
                      thumbColor={isEnabled ? 'white' : 'white'}
                      ios_backgroundColor="white"
                      onValueChange={toggleSwitch}
                      value={isEnabled}
                    />
                  </View>
                </View>
            </View>
          </View>

          <View >
              <Text>Phone number</Text>
            <View style={styles.inputAndIconSwitch}>
                <View style={styles.inputAndIcon}>
                  <TextInput
                          style={styles.input2}
                          placeholder={`${data.contact?.telephone_mobile}`} 
                  />
                  <View style={styles.iconBackg}>
                  <TouchableOpacity onPress={() => handlePhonePress(data.contact?.telephone_mobile)}>
                    <FontAwesome name="phone" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.switchDiv}>
                  <Text style={{fontSize: 12, marginBottom: 3}}>Open phone</Text>
                  <View style={isEnabled2 ? styles.Activeswitch : styles.NotActiveswitch}>
                    <Switch
                    style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
                      trackColor={{ false: '#ccc', true: '#81b0ff' }}
                      thumbColor={isEnabled2 ? 'white' : 'white'}
                      ios_backgroundColor="white"
                      onValueChange={toggleSwitch2}
                      value={isEnabled2}
                    />
                  </View>
                </View>
            </View>
          </View>

          <View >
              <Text>Fix number</Text>
            <View style={styles.inputAndIconSwitch}>
                <View style={styles.inputAndIcon}>
                  <TextInput
                          style={styles.input2}
                          placeholder={`${data.contact?.telephone_fixe}`}
                  />
                  <View style={styles.iconBackg}>
                  <TouchableOpacity onPress={() => handlePhonePress(data.contact?.telephone_fixe)}>
                    <FontAwesome name="phone" size={24} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
             </View>
          </View>

          <View>
            <Text>Status</Text>
            {data.contact?.statut !== 0  ? (
              <View style={styles.status}>
                <View style={styles.buttonContainer}>
                  <Button title="Prospect" />
                </View>
                <View style={styles.buttonContainer}>
                  <Button title="Partenaire" />
                </View>
                <View style={styles.buttonContainer}>
                  <Button title="Client" />
                </View>
            </View>

            )
            : null
            }
          </View>
      </View>
    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  topNav: {
    width: Dimensions.get('screen').width * 1,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: 'hsl(207, 44%, 38%)'
  },
  contact: {
    width: Dimensions.get('screen').width * 0.20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
      width: 50,
      height: 50,
      borderRadius: 50,
  },
  leftNav:{
      width: Dimensions.get('screen').width * 0.70,
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
  input: {
    padding: 10,
    backgroundColor: 'white',
    color: 'black'
  },
  input2: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  inputsSection: {
    width: Dimensions.get('screen').width * 0.85,
    margin: 'auto',
    paddingTop: 15
    
  },
  inputAndTxt: {
    marginBottom: 10
  },
  inputAndIcon: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',

  },
  inputAndIconSwitch: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '95%',
  },
  iconBackg: {
    backgroundColor: 'green',
    display: 'flex',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 10,
  },
  Activeswitch: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#81b0ff',
    padding: 2,
    borderRadius: 25
  },
  NotActiveswitch: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#ccc',
    padding: 2,
    borderRadius: 25
  },
  switchDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%'
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 3,
    width: '80%',

  },
  buttonContainer: {
    flex: 1,
    marginLeft: 5, 
    backgroundColor: 'white'
  },
})

export default Details