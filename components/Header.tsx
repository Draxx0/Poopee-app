import React from 'react';
import { colors } from '~/constants';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Image } from 'expo-image';
import { FontAwesome5, Entypo } from '@expo/vector-icons';

export function Header() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={[
        'rgba(30,30,30,0.8)',
        'rgba(20,20,20,0.6)',
        'rgba(20,20,20,0.4)',
        'rgba(0,0,0,0)',
      ]}
      style={styles.radient}
    >
      <SafeAreaView style={styles.headerContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text
                style={{
                  ...styles.logoText,
                }}
              >
                POOPEE
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={styles.menuButton}
            >
              <Entypo name="info-with-circle" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
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
    paddingTop: 20,
    paddingBottom: 5,
    backgroundColor: 'transparent',
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
  menuButton: {
    padding: 10,
  },
  menuText: {
    color: 'white',
    fontSize: 24,
  },
  radient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
});
export default Header;
