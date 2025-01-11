import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, Text } from 'react-native';

export default function useLocation() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Konum izni isteme
        const { status } = await Location.requestForegroundPermissionsAsync(); // Güncel izin fonksiyonu

        // Eğer izin verilmediyse hata mesajı göster
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        setPermissionGranted(true);

        // Konum bilgisini al
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      } catch (error) {
        setErrorMsg(`Error requesting location: ${error.message}`);
      }
    };

    getLocation();
  }, []);

  return {
    location,
    errorMsg,
    permissionGranted
  };
}
