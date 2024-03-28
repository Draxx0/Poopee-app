import fr from './fr';

const en: typeof fr = {
  screens: {
    home: {
      index: {
        tabBarLabel: 'Map',
        sanitaryServiceLabel: 'Sanitary Service',
        sanitaryPmrAccessibility: 'Accessibility PWRM',
        sanitaryBabyRelay: 'Baby Relay',
        sanitaryNoServices: 'No services available',
        sanitaryCloseLabel: 'Close',
        santaryOpenIntinerary: 'Open itinerary',
        sanitaryEmptyOpenHours: 'No hours available',
        sanitaryOpenCard: 'Open card',
        sanitaryNoAddress: 'No address',
        sanitaryItinerary: 'Walking time : {{walkingTime}}',
        sanitaryAdress: 'Address : {{adress}}',
        sanitaryOpenHours: 'Hours : {{openHours}}',
      },
    },
    settings: {
      index: {
        tabBarLabel: 'Settings',
        languageLabel: 'Select the language :',
        english: 'English',
        french: 'French',
        changeLanguage: 'Change language',
      },
    },
  },
};

export default en;
