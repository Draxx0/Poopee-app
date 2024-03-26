import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { MAPCONSTANTS } from '~/constants/map.constants';
import * as Location from 'expo-location';

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  console.log('THERE IS A LOCATION', !!location);

  return (
    // INSERT BLUR ON MAP AND DISABLED MAP IF LOCATION IS NOT ENABLED

    location ? (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        userInterfaceStyle="dark"
        initialRegion={
          location
            ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : {
                ...MAPCONSTANTS.initialRegion,
              }
        }
      />
    ) : (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.mapDisabled}
          initialRegion={{
            ...MAPCONSTANTS.initialRegion,
          }}
          zoomEnabled={false}
          scrollEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          zoomTapEnabled={false}
        />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    height: '100%',
  },
  mapDisabled: {
    flex: 1,
    height: '100%',
    opacity: 0.5,
  },
});
