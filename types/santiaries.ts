export interface Sanitaries {
  type: string;
  statut: string | null;
  adresse: string | null;
  arrondissement: string;
  horaire: string | null;
  acces_pmr: string | null;
  relais_bebe: string | null;
  url_fiche_equipement: string | null;
  distance?: number;
  geo_shape: {
    type: string;
    geometry: {
      coordinates: number[][];
      type: string;
    };
    properties: {};
  };
  geo_point_2d: {
    lon: number;
    lat: number;
  };
}
