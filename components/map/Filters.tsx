import React, { useCallback, useEffect, useMemo } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { colors } from '~/constants';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Filters as IFilters } from '~/types/filters';
import { useSanitariesStore } from '~/store/sanitaries.store';
import { SANITARIES } from '~/constants/sanitaries.constants';
import { AntDesign } from '@expo/vector-icons';
import { Sanitaries } from '~/types';
import { useUserLocationStore } from '~/store/user-location.store';
import { moveMapToLocation } from '~/utils/functions/moveMapToLocation';
import MapView from 'react-native-maps';
import { handleMarkerPress } from '~/utils/functions/handleMarkerPress';

type Props = {
  selectedFilter: IFilters[];
  setSelectedFilters: (filters: IFilters[]) => void;
  setSelectedSanitary: (marker: Sanitaries) => void;
  mapRef: React.RefObject<MapView>;
  setMenuVisible: (visible: boolean) => void;
  setWalkingTime: (time: string | null) => void;
};

export default function Filters({
  selectedFilter,
  setSelectedFilters,
  setSelectedSanitary,
  mapRef,
  setWalkingTime,
  setMenuVisible,
}: Props) {
  const { setSanitaries, sanitaries } = useSanitariesStore();
  const { location } = useUserLocationStore();

  const isSelected = useCallback(
    (filter: IFilters) => {
      return selectedFilter.includes(filter);
    },
    [selectedFilter]
  );

  const applyFilters = useCallback(() => {
    let filteredSanitaries = SANITARIES;

    if (selectedFilter.includes('pmr')) {
      filteredSanitaries = filteredSanitaries.filter(
        (sanitary) => sanitary.acces_pmr === 'Oui'
      );
    }

    if (selectedFilter.includes('baby')) {
      filteredSanitaries = filteredSanitaries.filter(
        (sanitary) => sanitary.relais_bebe === 'Oui'
      );
    }

    setSanitaries(filteredSanitaries);
  }, [selectedFilter, setSanitaries]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const toggleFilter = useCallback(
    (filter: IFilters) => {
      const newFilters = selectedFilter.includes(filter)
        ? selectedFilter.filter((f) => f !== filter)
        : [...selectedFilter, filter];

      setSelectedFilters(newFilters);
    },
    [selectedFilter, setSelectedFilters]
  );

  const handleFindClosestSanitary = useCallback(() => {
    if (!sanitaries.length || !location) {
      return;
    }

    let sortedSanitaries = [...SANITARIES];

    sortedSanitaries.forEach((sanitary) => {
      const distance = calculateDistance(
        location.coords.latitude,
        location.coords.longitude,
        sanitary.geo_point_2d.lat,
        sanitary.geo_point_2d.lon
      );
      sanitary.distance = distance;
    });

    sortedSanitaries.sort(
      (a: Sanitaries, b: Sanitaries) => a.distance! - b.distance!
    );

    setSanitaries([sortedSanitaries[0]]);
    setSelectedSanitary(sortedSanitaries[0]);
    setMenuVisible(true);

    handleMarkerPress({
      sanitary: sortedSanitaries[0],
      setSelectedSanitary,
      setMenuVisible,
      location,
      setWalkingTime,
    });

    moveMapToLocation(mapRef, {
      latitude: sortedSanitaries[0].geo_point_2d.lat,
      longitude: sortedSanitaries[0].geo_point_2d.lon,
    });
  }, []);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const earthRadius = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  };

  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight
        style={styles.filterContainer}
        onPress={() => toggleFilter('pmr')}
      >
        <FontAwesome
          name="wheelchair"
          size={20}
          color={isSelected('pmr') ? colors.main : colors.white}
        />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.filterContainer}
        onPress={() => toggleFilter('baby')}
      >
        <FontAwesome5
          name="baby"
          size={20}
          color={isSelected('baby') ? colors.main : colors.white}
        />
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.featureContainer}
        onPress={() => handleFindClosestSanitary()}
      >
        <AntDesign name="rocket1" size={20} color={colors.white} />
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 20,
    bottom: 150,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    zIndex: 10,
  },
  filterContainer: {
    padding: 15,
    backgroundColor: colors.lightBlack,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContainer: {
    padding: 15,
    backgroundColor: colors.main,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
