import { View, StyleSheet } from 'react-native';
import { Map } from '~/components/Map';

export function Home() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: 500,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
