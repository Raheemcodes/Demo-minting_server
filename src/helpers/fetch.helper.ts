const fetchData = async (uri: string): Promise<any> => {
  const result = await fetch(uri);
  const data = await result.json();

  return data;
};

export default fetchData;
