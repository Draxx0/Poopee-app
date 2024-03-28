import { createDrawerNavigator } from '@react-navigation/drawer';
import { Header } from '~/components/Header';
import MapScreen from './map';
import { colors } from '~/constants';
import CustomDrawerContent from '~/components/common/CustomDrawerContent';

export default function DrawerNav() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        drawerType: 'slide',
        drawerActiveTintColor: colors.black,
        drawerLabelStyle: {
          padding: 0,
          margin: 0,
          display: 'none',
        },
        drawerItemStyle: {
          display: 'none',
        },
        drawerStyle: {
          backgroundColor: colors.black,
          borderLeftWidth: 1,
          borderLeftColor: colors.main,
          padding: 20,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
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
