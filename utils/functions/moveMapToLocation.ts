import MapView from 'react-native-maps';

export const moveMapToLocation = (
  mapRef: React.RefObject<MapView>,
  coords: { latitude: number; longitude: number }
) => {
  if (mapRef.current) {
    mapRef.current.animateToRegion(
      {
        ...coords,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000
    );
  }
};
