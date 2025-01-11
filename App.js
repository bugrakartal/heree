import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import useLocation from './useLocation'; // Hook'tan konum bilgisini al

export default function App() {
  const { location, errorMsg, permissionGranted } = useLocation(); // Hook'u kullanarak konumu al

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!permissionGranted) {
    return (
      <View style={styles.container}>
        <Text>Requesting permission for location...</Text>
      </View>
    );
  }

  // Konum alındığında harita gösterimi
  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Pinin rengini burada değiştirebilirsiniz */}
          <Marker 
            coordinate={location} 
            pinColor="blue" // Pin rengini mavi yapmak için
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}
      {/* Animasyonlu örnek bileşen */}
      <AnimatedStyleExample />
    </View>
  );
}

// Animasyonlu Bileşen
function AnimatedStyleExample() {
  return (
    <View style={styles.animatedContainer}>
      <Text>Hello world!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  animatedContainer: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
});
