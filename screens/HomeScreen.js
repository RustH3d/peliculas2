import React, { useState } from 'react';
import { View, TextInput, Text, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener `expo install @expo/vector-icons`

export default function HomeScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [movie, setMovie] = useState(null);
  const [message, setMessage] = useState('');

  const searchMovie = async () => {
    if (!query.trim()) {
      return Alert.alert('Error', 'Debes escribir un título');
    }

    try {
      const response = await fetch('http://10.125.217.144:3000/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: query.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMovie(null);
        return Alert.alert('Error', data.message || 'Error al buscar/agregar película');
      }

      setMovie(data);
      setMessage('Película encontrada o agregada.');
    } catch (err) {
      console.error(err);
      setMovie(null);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Buscar película en TMDB</Text>
      
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          placeholder="Buscar por título..."
          value={query}
          onChangeText={setQuery}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.searchButton} onPress={searchMovie}>
        <Text style={styles.searchButtonText}>Buscar y Agregar</Text>
      </TouchableOpacity>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      {movie && (
        <TouchableOpacity
          style={styles.movieCard}
          onPress={() => navigation.navigate('ReviewMovies', { movie })}
        >
          {movie.poster_url && (
            <Image source={{ uri: movie.poster_url }} style={styles.poster} />
          )}
          <Text style={styles.movieTitle}>{movie.titulo}</Text>
          <Text style={styles.movieDate}>{movie.fecha_lanzamiento}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  searchRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  input: { flex: 1, marginLeft: 8 },
  searchButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchButtonText: { color: '#fff', fontWeight: 'bold' },
  message: { color: 'green', textAlign: 'center', marginBottom: 10 },
  movieCard: { alignItems: 'center', marginTop: 20 },
  poster: { width: 150, height: 225, borderRadius: 10, marginBottom: 10 },
  movieTitle: { fontSize: 18, fontWeight: 'bold' },
  movieDate: { color: '#666' },
});
