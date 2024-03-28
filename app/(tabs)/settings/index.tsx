import React from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { colors } from '~/constants';
import { useTranslation } from 'react-i18next';
import RNPickerSelect from 'react-native-picker-select';

export default function Account() {
  const { t } = useTranslation();

  const handleValueChange = (value: 'fr' | 'en') => {
    AsyncStorage.setItem('language', value);
    i18n.changeLanguage(value);
  };

  return (
    <View
      style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 20 }}
    >
      <Text style={{ color: colors.main, fontSize: 18, fontWeight: 'bold' }}>
        {t('screens.settings.index.languageLabel')}
      </Text>
      <RNPickerSelect
          placeholder={{}}
          onValueChange={handleValueChange}
          items={[
            { label: 'English', value: 'en' },
            { label: 'Français', value: 'fr' },
          ]}
          value={i18n.language}
          >
          <Button
            title={`${t('screens.settings.index.changeLanguage')} : ${
              i18n.language
            }`}
            />
            </RNPickerSelect>
    </View>
  );
}
