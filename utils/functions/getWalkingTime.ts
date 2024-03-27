type DirectionsResponse = {
  start: string;
  end: string;
  geometry: string;
  duration: number;
  distance: number;
  bbox: string;
  departure: number;
  arrival: number;
  resource: string;
  profile: string;
  optimization: string;
  crs: string;
  constraints: [
    {
      constraintType: string;
      key: string;
      operator: string;
      value: string;
      threshold: {
        key: string;
        operator: string;
        value: string;
      };
    }
  ];
  alerts: [
    {
      message: string;
    }
  ];
  portions: [
    {
      start: string;
      end: string;
      duration: number;
      distance: number;
      bbox: string;
      departure: number;
      arrival: number;
      steps: [
        {
          id: string;
          attributs: [
            {
              key: string;
              value: string;
            }
          ];
          duration: 0;
          distance: 0;
          geometry: string;
          instructions: [
            {
              message: string;
            }
          ];
          alerts: [
            {
              message: string;
            }
          ];
        }
      ];
    }
  ];
};

export const calculateWalkingTime = async (
  startCoords: { lat: number; lon: number },
  endCoords: { lat: number; lon: number },
  setWalkingTime: (time: string | null) => void
) => {
  try {
    setWalkingTime(null);
    const response = await fetch(
      `https://wxs.ign.fr/calcul/geoportail/itineraire/rest/1.0.0/route?resource=bdtopo-osrm&start=${startCoords.lon}%2C${startCoords.lat}&end=${endCoords.lon}%2C${endCoords.lat}&profile=pedestrian&optimization=fastest&geometryFormat=geojson&constraints=%7B%22constraintType%22%3A%22banned%22%2C%22key%22%3A%22wayType%22%2C%22operator%22%3A%22%3D%22%2C%22value%22%3A%22autoroute%22%7D&getSteps=false&getBbox=false&distanceUnit=meter&timeUnit=minute&crs=EPSG%3A4326
      `
    );
    const data: DirectionsResponse = await response.json();
    if (data.duration > 60) {
      return setWalkingTime(`${Math.floor(data.duration / 60)} h`);
    }
    setWalkingTime(`${data.duration} min`);
  } catch (error) {
    console.error('Error calculating walking time:', error);
  }
};
