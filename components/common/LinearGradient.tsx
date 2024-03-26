import { LinearGradient } from 'expo-linear-gradient';
import { PropsWithChildren } from 'react';
import { colors } from '~/constants';

const LinearGradientCustom = ({ children }: PropsWithChildren) => {
  return (
    <LinearGradient
      style={colors.mainGradient}
      colors={['rgba(0,0,0,1)', 'transparent']}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientCustom;
