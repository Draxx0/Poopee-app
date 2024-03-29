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
        sanitaryItinerary: 'Walking time: {{walkingTime}}',
        sanitaryAdress: 'Address: {{adress}}',
        sanitaryOpenHours: 'Hours: {{openHours}}',
      },
    },
    settings: {
      index: {
        tabBarLabel: 'Settings',
        title: 'Welcome to Poopee!',
        subtitle: 'Find public toilets in Paris.',
        filter: {
          title: 'You have the possibility to filter public toilets by:',
          nearest: 'Nearest toilets',
          pmr: 'Accessibility PWRM',
          babyRelay: 'Baby relay',
          locateMe: 'Locate me',
        },
        sanitaryCard:
          'On the toilet card, you will find different information such as opening hours or available services.',
        dataCollect:
          'Poopee does not collect any data outside of your geolocation.',
        selectLanguage: 'Select your language',
        french: 'French',
        english: 'English',
      },
    },
  },
};

export default en;
