import { Pressable, StyleSheet, Text, View } from 'react-native';

import { FontAwesome, Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { colors, families } from '~/constants';
import { Header } from '~/components/Header';

function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const label = options.tabBarLabel as string;
        if (typeof label !== 'string') {
          console.warn('tabBarLabel should be a string');
        }

        const Icon = options.tabBarIcon;
        let iconColor = isFocused
          ? options.tabBarActiveTintColor
          : options.tabBarInactiveTintColor;
        if (!iconColor) iconColor = '#000';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <Pressable
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.labelContainer}
            key={index}
          >
            {Icon && <Icon focused={isFocused} size={20} color={iconColor} />}
            <Text style={[styles.label, isFocused ? styles.labelFocused : {}]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function HomeLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        tabBarInactiveTintColor: colors.white,
      }}
      sceneContainerStyle={{
        backgroundColor: colors.black,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          header: Header,
          tabBarLabel: t('screens.home.index.tabBarLabel'),
          tabBarActiveTintColor: colors.main,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="map-pin" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          header: Header,
          tabBarActiveTintColor: colors.main,
          tabBarLabel: t('screens.settings.index.tabBarLabel'),
          headerShadowVisible: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginHorizontal: 10,
  },
  tabBarContainer: {
    bottom: 30,
    borderRadius: 12,
    alignSelf: 'center',
    position: 'absolute',
    marginHorizontal: '5%',
    flexDirection: 'row',
    backgroundColor: colors.lightBlack,
    opacity: 0.9,

    minHeight: 70,
    minWidth: '90%',

    paddingHorizontal: 40,
    paddingTop: 15,
    paddingBottom: 10,

    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.14,
    shadowRadius: 2.27,
    elevation: 5,
  },
  tabBarButton: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  labelContainer: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    color: colors.white,
    textTransform: 'uppercase',
    fontFamily: families.black,
    paddingTop: 5,
    lineHeight: 16,
  },
  labelFocused: {
    color: colors.main,
  },
  ellipsisContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
