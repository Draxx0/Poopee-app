import { colors } from '~/constants';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export function Header() {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>POOPEE</Text>
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
