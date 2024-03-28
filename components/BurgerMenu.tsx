import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Drawer } from 'react-native-paper';
import Account from '~/app/(tabs)/settings';

export function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Drawer.Section style={styles.burgerMenu}>
      <Drawer.Item label="Menu Item 1" />
      <Drawer.Item label="Menu Item 2"  />
      <Account />
      <Drawer.Item label="Menu Item 3" />
    </Drawer.Section>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  burgerMenu: {
    position: 'absolute',
    top: 100,
    right: 0,
    width: '50%',
    height: 500,
    backgroundColor: 'white',
  },
});

export default BurgerMenu;