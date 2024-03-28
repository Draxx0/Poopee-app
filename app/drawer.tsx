import { Redirect } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '~/screens/home';
import HomeScreen from './(tabs)/home';

export default function TabsIndex() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Header" component={HomeScreen} />
    </Drawer.Navigator>
  );
};
