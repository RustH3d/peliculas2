

import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, Alert, TouchableOpacity } from 'react-native';

export default function ReviewMoviesScreen({ navigation }) {
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
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Escribe el nombre de la película"
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Buscar película" onPress={searchMovie} />
      {message ? <Text style={{ color: 'green', marginVertical: 10 }}>{message}</Text> : null}

      {movie && (
        <TouchableOpacity
          style={{ marginTop: 20, alignItems: 'center' }}
          onPress={() => navigation.navigate('ReviewMovie', { movie })}
        >
          {movie.poster_url && (
            <Image
              source={{ uri: movie.poster_url }}
              style={{ width: 150, height: 225, borderRadius: 10, marginBottom: 10 }}
            />
          )}
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{movie.titulo}</Text>
          <Text style={{ color: '#666', textAlign: 'center', marginTop: 5 }}>
            {movie.fecha_lanzamiento}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
