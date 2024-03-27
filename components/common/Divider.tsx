import { View, StyleSheet } from 'react-native';
import { colors } from '~/constants';

export default function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: colors.gray,
  },
});
