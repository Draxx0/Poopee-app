import { Image, ImageStyle } from 'expo-image';

type LogoStyleProps = {
  style: ImageStyle;
};

export default function Logo({ style }: LogoStyleProps) {
  return (
    <Image
      source={require('../../assets/images/logo.png')}
      style={style}
      contentFit="contain"
    />
  );
}
