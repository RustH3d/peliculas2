import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';

export default function UserMoviesScreen({ navigation }) {
  const [userMovies, setUserMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simula la carga de películas del usuario desde el backend
  useEffect(() => {
    const fetchUserMovies = async () => {
      try {
        const response = await fetch('http://10.125.217.144:3000/movies'); // podés cambiar la ruta si es otra
        const data = await response.json();
        setUserMovies(data ? [data].flat() : []);
      } catch (error) {
        console.error('Error al obtener películas del usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserMovies();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate('SearchMovies', { movie: item })}
    >
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.sub}>{item.fecha_lanzamiento}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tus Películas</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#e50914" />
      ) : userMovies.length === 0 ? (
        <Text style={styles.noMovies}>No tienes películas aún.</Text>
      ) : (
        <FlatList
          data={userMovies}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 15,
  },
  movieItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  title: {
    color: '#fff',
    fontSize: 18,
  },
  sub: {
    color: '#aaa',
    fontSize: 14,
  },
  noMovies: {
    color: '#888',
    marginTop: 30,
    textAlign: 'center',
  },
});
