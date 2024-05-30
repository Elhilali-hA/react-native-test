import {
  View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity,
  Dimensions, TextInput, ActivityIndicator, Image, ScrollView, FlatList
} from 'react-native'
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import React, { useState, useEffect, useRef } from 'react';
import imageAvatar from '../../../assets/avatar.jpg';
import getColor from './ColorMapping'
import { useDispatch } from 'react-redux';
import { setCle } from '../../../store/slice';


const Contacts = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api-v2.hopcrm.com/api/mobile/contacts')
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    const filtered = data.filter(item =>
      item.prenom !== '' && item.prenom.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const goToDetails = (text) => {
    dispatch(setCle(text));
    navigation.navigate('ButtomTabStack');
  };


  const handleNextPage = () => {
    if (currentPage < 8) {
      const page = currentPage + 1
      const nextPage = `https://api-v2.hopcrm.com/api/mobile/contacts?page=${currentPage + 1}`;
      setCurrentPage(page);
      fetchData(nextPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const page = currentPage - 1
      const previousPage = `https://api-v2.hopcrm.com/api/mobile/contacts?page=${currentPage - 1}`;
      setCurrentPage(page);
      fetchData(previousPage);
    }
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const sortedData = data.sort((a, b) => a.prenom.localeCompare(b.prenom));

  const groupedData = sortedData.reduce((acc, item) => {
    const firstLetter = item.prenom ? item.prenom[0].toUpperCase() : '';
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(item);
    return acc;
  }, {});

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.indexContainer}>
        {ALPHABET.map((letter, index) => (
          <TouchableOpacity key={index} >
            <Text style={styles.indexText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.Nav}>
        <View style={styles.leftNav}>
          <TextInput
            style={styles.input}
            placeholder="Search..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Feather name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.rightNav}>
          <Ionicons name="notifications" size={24} color="white" />
          <Feather name="menu" size={24} color="white" />
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >

        <View style={styles.contactBar}>
          <View style={styles.contact}>
            <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
              <AntDesign name="left" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.contactTxt}>Contacts</Text>
          </View>
        </View>

        {searchText !== '' ? (

          <View>
            {filteredData.length > 0 ? (

              filteredData.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => goToDetails(item.cle)}>

                <View key={index} style={styles.contactContent}>
                  <View style={styles.contactNom}>
                    <Image
                      source={imageAvatar}
                      style={styles.image}
                    />
                    <View style={{ marginLeft: 14 }}>
                      <View style={styles.NomPrenom}>
                        <Text>{item.prenom?.trim() === '' ? '-' : item.prenom}</Text>
                        <Text style={{ marginLeft: 4 }}>{item.nom?.trim() === '' ? '-' : item.nom}</Text>
                      </View>
                      <Text>{item.entreprise?.trim() === '' ? '-' : item.entreprise}</Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      backgroundColor: getColor(item.statut_couleur),
                      color: item.statut_couleur === 'white' ? 'black' : 'white',
                      padding: 3,
                      borderRadius: 5
                    }}
                  >
                    {item.statut_label?.trim() === '' ? '-' : item.statut_label}
                  </Text>
                </View>
                </TouchableOpacity>

              ))
            ) : (

              <Text>No results found</Text>
            )}
          </View>
        ) : (

          Object.entries(groupedData).map(([letter, items]) => (
            <View key={letter} style={{ backgroundColor: 'white' }} >
              <View style={styles.letter}>
                <Text style={styles.contactTxt}>{letter}</Text>
              </View>
              {items.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => goToDetails(item.cle)}>
                <View key={index} style={styles.contactContent} >
                  <View style={styles.contactNom}>
                    <Image
                      source={imageAvatar}
                      style={styles.image}
                    />
                    <View style={{ marginLeft: 14 }}>
                      <View style={styles.NomPrenom}>
                        <Text>{item.prenom?.trim() === '' ? '-' : item.prenom}</Text>
                        <Text style={{ marginLeft: 4 }}>{item.nom?.trim() === '' ? '-' : item.nom}</Text>
                      </View>
                      <Text>{item.entreprise?.trim() === '' ? '-' : item.entreprise}</Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      backgroundColor: getColor(item.statut_couleur),
                      color: item.statut_couleur === 'white' ? 'black' : 'white',
                      padding: 3,
                      borderRadius: 5
                    }}
                  >
                    {item.statut_label?.trim() === ''  ? '-------' : item?.statut_label}
                  </Text>
                </View>
                </TouchableOpacity>
              ))}
            </View>
          ))
        )}


        {searchText === '' &&

          <View style={styles.paginationContainer}>
            <TouchableOpacity onPress={handlePreviousPage} style={styles.buttonPage}>
              <Text>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.currentPage}>{currentPage}</Text>
            <TouchableOpacity onPress={handleNextPage} style={styles.buttonPage}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView >
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    marginTop: StatusBar.currentHeight,
    maxWidth: Dimensions.get('screen').width * 1,

  },
  Nav: {
    width: Dimensions.get('screen').width * 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: 'hsl(207, 44%, 38%)'
  },
  leftNav: {
    position: 'relative',
    width: Dimensions.get('screen').width * 0.70,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: "center"
  },
  rightNav: {
    width: Dimensions.get('screen').width * 0.25,
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center'

  },
  input: {
    flex: 1,
    padding: 6,
    backgroundColor: 'white',
    borderRadius: 20
  },
  searchButton: {
    position: 'absolute',
    right: -1,
    backgroundColor: 'hsl(188, 60%, 80%)',
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,

  },
  contactBar: {
    backgroundColor: 'hsl(24, 2%, 91%)',
    padding: 10
  },
  contact: {
    width: Dimensions.get('screen').width * 0.60,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  letter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'hsl(24, 2%, 91%)',
  },
  contactTxt: {
    color: 'hsl(24, 2%, 52%)',
    fontSize: 18,
    marginLeft: 5
  },
  indexContainer: {
    position: 'absolute',
    right: 10,
    top: 20,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  },
  indexText: {
    fontSize: 12,
    padding: 2,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  contactNom: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  NomPrenom: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    height: 100,
    paddingRight: 30,
    backgroundColor: 'white'
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonPage: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  currentPage: {
    paddingHorizontal: 20,
    fontSize: 16,
  },
})

export default Contacts