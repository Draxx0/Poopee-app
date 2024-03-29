import { Sanitaries } from '~/types';
import { calculateWalkingTime } from './getWalkingTime';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

type Argues = {
  sanitary: Sanitaries;
  mapRef: React.RefObject<MapView>;
  setSelectedSanitary: (sanitary: Sanitaries) => void;
  setMenuVisible: (visible: boolean) => void;
  setWalkingTime: (time: string | null) => void;
  location: Location.LocationObject | null;
};

export const handleMarkerPress = ({
  sanitary,
  mapRef,
  setMenuVisible,
  setSelectedSanitary,
  location,
  setWalkingTime,
}: Argues) => {
  setSelectedSanitary(sanitary);
  setMenuVisible(true);
  calculateWalkingTime(
    {
      lat: location?.coords.latitude || 0,
      lon: location?.coords.longitude || 0,
    },
    {
      lat: sanitary.geo_point_2d.lat,
      lon: sanitary.geo_point_2d.lon,
    },
    setWalkingTime
  );

  if (!mapRef.current) return;

  mapRef.current.animateCamera({
    center: {
      latitude: sanitary.geo_point_2d.lat,
      longitude: sanitary.geo_point_2d.lon,
    },
    zoom: 17,
  });
};
