import React, { useState } from 'react';
import { colors } from '~/constants';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BurgerMenu from './BurgerMenu';
import { Ionicons } from '@expo/vector-icons';



export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);  
  };
  return (
    <>
    <LinearGradient colors={[ 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.5)','rgba(255,255,255,0.4)']}
    style={styles.radient}>
    <SafeAreaView style={styles.headerContainer}>
        <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon} />
            <Text style={styles.logoText}>POOPEE</Text>
          </View>
      <Ionicons name={menuOpen ? 'close' : 'menu'} size={24} style={styles.color}  onPress={toggleMenu} />
        </View>
      </View>
      </SafeAreaView>
        </LinearGradient>
      {menuOpen && 
        <BurgerMenu />
      }        
      </>
  );
}
const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  headerContainer: {
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    marginRight: 5,
    borderColor: 'green',
    borderWidth: 2,
  },
  logoText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  radient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  color: {
    padding: 10,
    color: colors.white,
  },
  menuText: {
    color: 'white',
    fontSize: 24,
  },
  burgerMenu: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: '50%',
    backgroundColor: 'white',
  },
});
export default Header;