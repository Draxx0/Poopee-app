import { TouchableHighlight, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '~/constants';
import { useUserLocationStore } from '~/store/user-location.store';
import MapView from 'react-native-maps';

export default function CenterOnUser({
  mapRef,
}: {
  mapRef: React.RefObject<MapView>;
}) {
  const { location } = useUserLocationStore();

  const zoomFactor = Math.pow(2, 20 - 17);
  const latitudeDelta = 0.0922 / zoomFactor;
  const longitudeDelta = 0.0421 / zoomFactor;

  const handleLocate = () => {
    if (!location || !mapRef.current) return;

    mapRef.current.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta,
        longitudeDelta,
      },
      1000
    );
  };

  return (
    <TouchableHighlight
      style={styles.featureContainer}
      onPress={() => handleLocate()}
    >
      <FontAwesome name="location-arrow" size={16} color={colors.white} />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  featureContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 10,
    padding: 15,
    backgroundColor: colors.main,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.white,
  },
});
