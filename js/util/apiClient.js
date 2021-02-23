const localStorageKey = "chicago-data";
const cachedDataStaleTimeout = 3600 * 24; // 3600 seconds * 24 hours = 1 day

const fetchData = async () => {
  const response = await fetch(
    "https://data.cityofchicago.org/resource/aksk-kvfp.json"
  );
  const data = response.json();
  return data;
};

export const purgeCache = async () => {
  localStorage.removeItem(localStorageKey);
};

export const getData = async () => {
  const fetchAndUpdateCache = async () => {
    const data = await fetchData();
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({ time: +new Date(), data })
    );
    return data;
  };
  if (window.localStorage) {
    const cachedData = localStorage.getItem(localStorageKey);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (+new Date() - +parsed.time < cachedDataStaleTimeout) {
          return parsed.data;
        } else {
          return await fetchAndUpdateCache();
        }
      } catch {
        localStorage.removeItem(localStorageKey);
        return await fetchAndUpdateCache();
      }
    } else {
      return await fetchAndUpdateCache();
    }
  } else {
    return await fetchAndUpdateCache();
  }
};
