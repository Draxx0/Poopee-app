import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Image } from 'expo-image';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors } from '~/constants';
import Divider from './Divider';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import i18n from 'i18next';
import { useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomDrawerContent(props: any) {
  const languageSelected = useMemo(() => {
    return i18n.language === 'fr' ? 'fr' : 'en';
  }, [i18n.language]);

  const { t } = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />

        <Text style={styles.title}>{t('screens.settings.index.title')}</Text>
        <Text style={styles.subtitle}>
          {t('screens.settings.index.subtitle')}
        </Text>

        <Divider />

        <Text style={styles.title}>
          {t('screens.settings.index.selectLanguage')}
        </Text>

        <View
          style={{
            ...styles.rowContainer,
            justifyContent: 'flex-start',
            gap: 20,
          }}
        >
          <TouchableHighlight
            style={styles.columnContainer}
            onPress={async () => {
              i18n.changeLanguage('fr');
              await AsyncStorage.setItem('language', 'fr');
            }}
          >
            <>
              <View
                style={{
                  ...styles.iconContainer,
                  backgroundColor:
                    languageSelected === 'fr' ? colors.main : colors.lightBlack,
                  borderColor:
                    languageSelected === 'fr' ? colors.black : colors.main,
                }}
              >
                <Text>🇫🇷</Text>
              </View>
              <Text
                style={{
                  ...styles.subtitle,
                  fontWeight: 'bold',
                }}
              >
                {t('screens.settings.index.french')}
              </Text>
            </>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.columnContainer}
            onPress={async () => {
              i18n.changeLanguage('en');
              await AsyncStorage.setItem('language', 'en');
            }}
          >
            <>
              <View
                style={{
                  ...styles.iconContainer,
                  backgroundColor:
                    languageSelected === 'en' ? colors.main : colors.lightBlack,
                  borderColor:
                    languageSelected === 'en' ? colors.black : colors.main,
                }}
              >
                <Text>🇬🇧</Text>
              </View>
              <Text
                style={{
                  ...styles.subtitle,
                  fontWeight: 'bold',
                }}
              >
                {t('screens.settings.index.english')}
              </Text>
            </>
          </TouchableHighlight>
        </View>

        <Divider />

        <View style={styles.columnContainer}>
          <Text style={styles.subtitle}>
            {t('screens.settings.index.filter.title')}
          </Text>

          <View style={{ ...styles.columnContainer, gap: 15, marginTop: 15 }}>
            <View style={styles.rowContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome5
                  name="wheelchair"
                  size={18}
                  color={colors.white}
                />
              </View>
              <Text
                style={{
                  ...styles.subtitle,
                  fontWeight: 'bold',
                }}
              >
                {t('screens.settings.index.filter.pmr')}
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <View
                style={{
                  ...styles.iconContainer,
                  paddingHorizontal: 12,
                }}
              >
                <FontAwesome5 name="baby" size={18} color={colors.white} />
              </View>
              <Text
                style={{
                  ...styles.subtitle,
                  fontWeight: 'bold',
                }}
              >
                {t('screens.settings.index.filter.babyRelay')}
              </Text>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.iconContainer}>
                <AntDesign name="rocket1" size={18} color={colors.white} />
              </View>
              <Text
                style={{
                  ...styles.subtitle,
                  fontWeight: 'bold',
                }}
              >
                {t('screens.settings.index.filter.nearest')}
              </Text>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.iconContainer}>
                <FontAwesome
                  name="location-arrow"
                  size={16}
                  color={colors.white}
                />
              </View>
              <Text
                style={{
                  ...styles.subtitle,
                  fontWeight: 'bold',
                }}
              >
                {t('screens.settings.index.filter.locateMe')}
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            ...styles.columnContainer,
            marginTop: 15,
          }}
        >
          <Text style={styles.subtitle}>
            {t('screens.settings.index.sanitaryCard')}
          </Text>
          <Text style={styles.subtitle}>
            {t('screens.settings.index.dataCollect')}
          </Text>
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: colors.lightBlack,
    borderRadius: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.main,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: colors.white,
  },
});
