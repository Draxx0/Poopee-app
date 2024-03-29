import { PropsWithChildren } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '~/constants';

type Props = {
  onPress: () => void;
};

export default function FillButton({
  onPress,
  children,
}: PropsWithChildren<Props>) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    color: 'white',
    backgroundColor: colors.main,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
  },
});
