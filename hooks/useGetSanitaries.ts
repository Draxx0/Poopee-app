import { useQuery } from '@tanstack/react-query';

const url =
  'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/sanisettesparis/records?limit=100&refine=type%3A%22TOILETTES%22&refine=type%3A%22SANISETTE%22&refine=type%3A%22URINOIR%22&refine=type%3A%22URINOIR%20FEMME%22&refine=type%3A%22WC%20PUBLICS%20PERMANENTS%22';

export default function useGetSanitaries() {
  const query = useQuery({
    queryKey: ['sanitaries'],
    queryFn: async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log('data', data.results);
      return data.results;
    },
    staleTime: 1,
    retry: 1,
  });

  return {
    ...query,
  };
}
