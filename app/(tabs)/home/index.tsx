import React from 'react';
import { View, StyleSheet } from 'react-native';
import Map from '~/components/map/Map';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Map />
    </View>
  );
}
