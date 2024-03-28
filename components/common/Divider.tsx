import { View, StyleSheet } from 'react-native';
import { colors } from '~/constants';

type Props = {
  margin?: number;
};

export default function Divider({ margin }: Props) {
  const styles = StyleSheet.create({
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: colors.gray,
      marginVertical: margin ?? 10,
    },
  });
  return <View style={styles.divider} />;
}
