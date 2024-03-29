import MapView from 'react-native-maps';

export const moveMapToLocation = (
  mapRef: React.RefObject<MapView>,
  coords: { latitude: number; longitude: number }
) => {
  if (!mapRef.current) return;

  const zoomFactor = Math.pow(2, 20 - 15);
  const latitudeDelta = 0.0922 / zoomFactor;
  const longitudeDelta = 0.0421 / zoomFactor;
  mapRef.current.animateToRegion(
    {
      ...coords,
      latitudeDelta,
      longitudeDelta,
    },
    1000
  );
};
