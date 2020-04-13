import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, AsyncStorage } from 'react-native';

import CourtList from '../components/CourtList';

//import logo from '../assets/logo.png';

export default function List() {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('sports').then(storagedSports => {
      const sportsArray = storagedSports.split(',').map(sport => sport.trim());

      setSports(sportsArray);
    })
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image style={styles.logo} source={logo} /> */}

      <ScrollView>
        {sports.map(sport => <CourtList key={sport} sport={sport} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // logo: {
  //   height: 32,
  //   resizeMode: "contain",
  //   alignSelf: 'center',
  //   marginTop: 10,
  // },
});