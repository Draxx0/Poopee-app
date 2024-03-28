import React from 'react';
import { View } from 'react-native';
import Map from '~/components/map/Map';

export default function MapScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Map />
    </View>
  );
}
