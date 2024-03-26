import { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MAPCONSTANTS } from '~/constants/map.constants';
import * as Location from 'expo-location';
import useGetSanitaries from '~/hooks/useGetSanitaries';

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);

  const { data, isLoading } = useGetSanitaries();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let locationSubscription = await Location.watchPositionAsync(
        {},
        (newLocation) => {
          setLocation(newLocation);
        }
      );

      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    })();
  }, []);

  const handleMarkerPress = (marker: any) => {
    setSelectedMarker(marker);
    if (location && marker) {
      Alert.alert(
        `Itinéraire - ${marker.adresse}`,
        `Latitude: ${marker.geo_point_2d.lat}, Longitude: ${marker.geo_point_2d.lon}`,
        [
          { text: 'Annuler', style: 'cancel' },
          {
            text: 'Ouvrir Maps',
            onPress: () => {
              const url = `https://www.google.com/maps/dir/?api=1&destination=${marker.geo_point_2d.lat},${marker.geo_point_2d.lon}`;
              Linking.openURL(url);
            },
          },
        ]
      );
    }
  };

  return (
    // INSERT BLUR ON MAP AND DISABLED MAP IF LOCATION IS NOT ENABLED

    location ? (
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        userLocationPriority="high"
        accessibilityElementsHidden={true}
        followsUserLocation={true}
        showsUserLocation={true}
        showsMyLocationButton={true}
        loadingEnabled={!!isLoading}
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
      >
        {data &&
          data.map((sanitary: any, index: number) => (
            <Marker
              key={index}
              coordinate={{
                latitude: sanitary.geo_point_2d.lat,
                longitude: sanitary.geo_point_2d.lon,
              }}
              onPress={() => handleMarkerPress(sanitary)}
            />
          ))}
      </MapView>
    ) : (
      // DISABLED MAP
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
    opacity: 0.2,
  },
});
