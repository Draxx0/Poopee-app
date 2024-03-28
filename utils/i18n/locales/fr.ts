const fr = {
  screens: {
    home: {
      index: {
        tabBarLabel: 'Carte',
        sanitaryServiceLabel: 'Service sanitaire',
        sanitaryPmrAccessibility: 'Accessibilité PMR',
        sanitaryBabyRelay: 'Relais bébé',
        sanitaryNoServices: 'Aucun service disponible',
        sanitaryCloseLabel: 'Fermer',
        santaryOpenIntinerary: "Ouvrir l'itinéraire",
        sanitaryEmptyOpenHours: 'Aucun horaire',
        sanitaryOpenCard: 'Ouvrir la fiche',
        sanitaryNoAddress: 'Aucune adresse',
        sanitaryAdress: 'Adresse : {{adress}}',
        sanitaryOpenHours: 'Horaires : {{openHours}}',
        sanitaryItinerary: 'Temps de marche : {{walkingTime}}',
      },
    },
    settings: {
      index: {
        tabBarLabel: 'Paramètres',
        title: 'Bienvenue sur Poopee !',
        subtitle: 'Trouvez les toilettes publiques à Paris.',
        filter: {
          title:
            'Vous avez la possibilité de filtrer les toilettes publiques par :',
          nearest: 'Les plus proches',
          pmr: 'Accessibilité PMR',
          babyRelay: 'Relais bébé',
        },
        sanitaryCard:
          'Sur la fiche des toilettes, vous trouverez différentres informations comme les horaires ou les services disponibles.',
        dataCollect:
          'Les données Poopee ne collecte aucune donnée en dehors de votre géolocalisation.',
        selectLanguage: 'Sélectionnez votre langue',
        french: 'Français',
        english: 'Anglais',
      },
    },
  },
};

export default fr;
