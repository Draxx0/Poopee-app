import { StyleSheet, View } from 'react-native';
import MapViewComp from './MapView';
import SanitaryBottomSheet from './sanitaryDetails/SanitaryBottomSheet';
import { useCallback, useRef, useState } from 'react';
import { Sanitaries } from '~/types';
import Filters from './Filters';
import { Filters as IFilters } from '~/types/filters';
import MapView from 'react-native-maps';
import CenterOnUser from './CenterOnUser';
import { useSanitariesStore } from '~/store/sanitaries.store';
import { SANITARIES } from '~/constants';

export default function Map() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedSanitary, setSelectedSanitary] = useState<Sanitaries | null>(
    null
  );
  const [selectedFilters, setSelectedFilters] = useState<IFilters[]>([]);
  const [walkingTime, setWalkingTime] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);
  const { setSanitaries, sanitaries } = useSanitariesStore();

  const applyFilters = useCallback(() => {
    let filteredSanitaries = SANITARIES;

    if (selectedFilters.includes('pmr')) {
      filteredSanitaries = filteredSanitaries.filter(
        (sanitary) => sanitary.acces_pmr === 'Oui'
      );
    }

    if (selectedFilters.includes('baby')) {
      filteredSanitaries = filteredSanitaries.filter(
        (sanitary) => sanitary.relais_bebe === 'Oui'
      );
    }

    setSanitaries(filteredSanitaries);
  }, [selectedFilters, setSanitaries]);

  const handleClose = () => {
    setSelectedSanitary(null);
    setMenuVisible(false);
    applyFilters();
  };

  return (
    <View style={styles.container}>
      <MapViewComp
        handleClose={handleClose}
        visible={menuVisible}
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
        applyFilters={applyFilters}
        setSelectedSanitary={setSelectedSanitary}
        setMenuVisible={setMenuVisible}
        mapRef={mapRef}
        setWalkingTime={setWalkingTime}
      />
      <CenterOnUser mapRef={mapRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
