import { colors } from '~/constants';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';

export function Header() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text
          style={styles.logoText}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          POOPEE
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.black,
  },
  headerNoLogoContainer: {
    backgroundColor: 'transparent',
    height: 70,
  },
  logoContainer: {
    marginTop: 30,
    marginBottom: 10,
  },
  logoText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
