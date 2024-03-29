import React from 'react';
import { colors } from '~/constants';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

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
    marginTop: Platform.OS === 'ios' ? 0 : 20,
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
  logoText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
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
