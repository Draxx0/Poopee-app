import { useEffect, useState } from 'react';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { MAPCONSTANTS } from '~/constants/map.constants';
import * as Location from 'expo-location';
import SANITARIES from '~/data/sanitaries.json';

export default function Map() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const [filteredSanitaries, setFilteredSanitaries] = useState<
    any | Array<any>
  >(null);

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

  const handleGetNearestSanitaries = ({
    lat,
    lon,
  }: {
    lat: number;
    lon: number;
  }) => {
    const sortedSanitaries = SANITARIES.sort((a: any, b: any) => {
      const distanceA = Math.sqrt(
        Math.pow(a.geo_point_2d.lat - lat, 2) +
          Math.pow(a.geo_point_2d.lon - lon, 2)
      );
      const distanceB = Math.sqrt(
        Math.pow(b.geo_point_2d.lat - lat, 2) +
          Math.pow(b.geo_point_2d.lon - lon, 2)
      );
      return distanceA - distanceB;
    });
    console.log('sortedSanitaries', sortedSanitaries.slice(0, 10));
    setFilteredSanitaries(sortedSanitaries.slice(0, 10));
  };

  const handleMarkerPress = (marker: any) => {
    setSelectedMarker(marker);
    if (location && marker) {
      Alert.alert(
        `Itinéraire - ${marker.adresse}`,
        `Latitude: ${marker.geo_point_2d.lat}, Longitude: ${marker.geo_point_2d.lon}`,
        [
          {
            text: 'Annuler',
            style: 'cancel',
            onPress: () => setSelectedMarker(null),
          },
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

  useEffect(() => {
    console.log('filteredSanitaries', filteredSanitaries, 'location', location);
  }, [filteredSanitaries]);

  return location ? (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      userLocationPriority="high"
      accessibilityElementsHidden={true}
      followsUserLocation={true}
      showsUserLocation={true}
      showsMyLocationButton={true}
      loadingEnabled={true}
      showsCompass={true}
      onRegionChangeComplete={(region, details) => {
        handleGetNearestSanitaries({
          lat: region.latitude,
          lon: region.longitude,
        });
      }}
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
      {filteredSanitaries &&
        filteredSanitaries.length > 0 && // Correction de la faute de frappe ici
        filteredSanitaries.map((sanitary: any, index: number) => (
          <Marker
            key={index}
            coordinate={{
              latitude: sanitary.geo_point_2d.lat,
              longitude: sanitary.geo_point_2d.lon,
            }}
            icon={
              selectedMarker === sanitary
                ? require('~/assets/images/selected-marker.png')
                : require('~/assets/images/marker.png')
            }
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
