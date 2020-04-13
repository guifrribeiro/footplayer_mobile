import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity } from 'react-native';

import api from '../services/api';

function CourtList({ sport }) {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    async function loadCourts() {
      const response = await api.get('/courts', {
        params: { sport }
      })

      setCourts(response.data);
    }

    loadCourts();
  }, []);

  function handleNavigate(id) {
    navigation.navigate('Booking', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quadras que disponibilizam <Text style={styles.bold}>{sport}</Text></Text>

      <FlatList
        style={styles.list}
        data={courts}
        keyExtractor={court => court._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
            <Text style={styles.company}>{item.company}</Text>
            <Text style={styles.price}>{item.price ? `R$${item.price}/hora` : 'GRATUITO'}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },

  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  bold: {
    fontWeight: 'bold'
  },

  list: {
    paddingHorizontal: 20,
  },

  listItem: {
    marginRight: 15,
  },

  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },

  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },

  price: {
    fontSize: 15,
    color: '#999',
    marginTop: 5,
  },

  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default withNavigation(CourtList);