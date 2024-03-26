const fetchData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  await response.json();
  return response as T;
};
