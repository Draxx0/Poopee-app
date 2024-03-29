import { View, StyleSheet } from 'react-native';
import MapViewComp from './MapView';
import SanitaryBottomSheet from './sanitaryDetails/SanitaryBottomSheet';
import { useRef, useState } from 'react';
import { Sanitaries } from '~/types';
import Filters from './Filters';
import { Filters as IFilters } from '~/types/filters';
import MapView from 'react-native-maps';
import { useUserLocationStore } from '~/store/user-location.store';

export default function Map() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedSanitary, setSelectedSanitary] = useState<Sanitaries | null>(
    null
  );
  const [selectedFilters, setSelectedFilters] = useState<IFilters[]>([]);
  const [walkingTime, setWalkingTime] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);
  const { location } = useUserLocationStore();

  const handleClose = () => {
    setSelectedSanitary(null);
    setMenuVisible(false);

    if (!mapRef.current || !location) return;

    mapRef.current.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000
    );
  };

  return (
    <View style={styles.container}>
      <MapViewComp
        setSelectedSanitary={setSelectedSanitary}
        setMenuVisible={setMenuVisible}
        selectedFilter={selectedFilters}
        setWalkingTime={setWalkingTime}
        mapRef={mapRef}
      />
      {menuVisible && (
        <SanitaryBottomSheet
          visible={menuVisible}
          data={selectedSanitary}
          onClose={handleClose}
          walkingTime={walkingTime}
        />
      )}
      <Filters
        selectedFilter={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        setSelectedSanitary={setSelectedSanitary}
        setMenuVisible={setMenuVisible}
        mapRef={mapRef}
        setWalkingTime={setWalkingTime}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
