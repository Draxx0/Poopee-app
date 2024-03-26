import React from 'react';
import { View, StyleSheet } from 'react-native';
import Map from '~/components/Map';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Map />
    </View>
  );
}
