import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header } from '~/components/Header';
import MapScreen from './map';

export default function DrawerNav() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="map"
        component={MapScreen}
        options={{
          header: Header,
          title: 'Map',
          drawerLabel: 'Map',
        }}
      />
    </Drawer.Navigator>
  );
}
