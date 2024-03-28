import { create } from 'zustand';
import * as Location from 'expo-location';

interface UserLocationState {
  location: Location.LocationObject | null;
  setLocation: (sanitaries: Location.LocationObject | null) => void;
}

export const useUserLocationStore = create<UserLocationState>()((set) => ({
  location: null,
  setLocation: (location: Location.LocationObject | null) =>
    set(() => ({ location })),
}));
