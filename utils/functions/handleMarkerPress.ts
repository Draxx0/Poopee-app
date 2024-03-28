import { Sanitaries } from '~/types';
import { calculateWalkingTime } from './getWalkingTime';
import * as Location from 'expo-location';

type Argues = {
  sanitary: Sanitaries;
  setSelectedSanitary: (sanitary: Sanitaries) => void;
  setMenuVisible: (visible: boolean) => void;
  setWalkingTime: (time: string | null) => void;
  location: Location.LocationObject | null;
};

export const handleMarkerPress = ({
  sanitary,
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

  console.log('calculate walking time');
};
