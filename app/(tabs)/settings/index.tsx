import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import en from '~/utils/i18n/locales/en';
import fr from '~/utils/i18n/locales/fr';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import PressableButton from '~/components/common/PressableButton';

function Account() {
  const [selectedValue, setSelectedValue] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [selectedLanguageText, setSelectedLanguageText] = useState('');
  const [modalLanguage, setModalLanguage] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem('language').then(storedLanguage => {
      if (storedLanguage) {
        setSelectedValue(storedLanguage);
        setButtonText(storedLanguage === 'en' ? 'Change Language' : 'Changer de langue');
        setSelectedLanguageText(storedLanguage === 'en' ? 'English' : 'Français');
      }
    });
  }, []);

  const languageModule = selectedValue === 'en' ? en : fr;

  const handleValueChange = (value: string) => {
    AsyncStorage.setItem('language', value);
    setSelectedValue(value);
    i18n.changeLanguage(value);
    setButtonText(value === 'en' ? 'Change Language' : 'Changer de langue');
    setSelectedLanguageText(value === 'en' ? 'English' : 'Français');
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <PressableButton onPress={() => setModalLanguage(!modalLanguage)}>
        <Text>{`${buttonText} : ${selectedLanguageText}`}</Text>
      </PressableButton>
      {modalLanguage && (
        <RNPickerSelect
          placeholder={{}}
          onValueChange={handleValueChange}
          items={[
            { label: 'English', value: 'en' },
            { label: 'Français', value: 'fr' },
          ]}
          value={selectedValue}
        >
          <Button title={buttonText} color="black" />
        </RNPickerSelect>
      )}
    </View>
  );
}



export default Account;
