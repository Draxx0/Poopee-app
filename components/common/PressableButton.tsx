import { PropsWithChildren } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '~/constants';

type Props = {
  onPress: () => void;
};

export default function PressableButton({
  children,
  onPress,
}: PropsWithChildren<Props>) {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.button}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    color: colors.main,
    fontWeight: 'bold',
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
});
