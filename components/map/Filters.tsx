import React, { useCallback, useEffect, useMemo } from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { colors } from '~/constants';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { Filters as IFilters } from '~/types/filters';
import { useSanitariesStore } from '~/store/sanitaries.store';
import { SANITARIES } from '~/constants/sanitaries.constants';

type Props = {
  selectedFilter: IFilters[];
  setSelectedFilters: (filters: IFilters[]) => void;
};

export default function Filters({ selectedFilter, setSelectedFilters }: Props) {
  const { setSanitaries } = useSanitariesStore();

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
});
