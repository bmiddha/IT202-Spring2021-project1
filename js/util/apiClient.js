import { getFilteredDataItems } from "./filtering.js";

const dataLocalStorageKey = "chicago-data";
const filteredDataLocalStorageKey = "chicago-data-filtered";
const cachedDataStaleTimeout = 3600 * 24; // 3600 seconds * 24 hours = 1 day

const _fetchApiData = async () => {
  const response = await fetch(
    "https://data.cityofchicago.org/resource/aksk-kvfp.json"
  );
  const data = response.json();
  return data;
};

const _purgeCache = async (key) => {
  localStorage.removeItem(key);
};

export const getApiData = async () => {
  const fetchAndUpdateCache = async () => {
    const data = await _fetchApiData();
    localStorage.setItem(
      dataLocalStorageKey,
      JSON.stringify({ time: +new Date(), data })
    );
    return data;
  };
  if (window.localStorage) {
    const cachedData = localStorage.getItem(dataLocalStorageKey);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (+new Date() - +parsed.time < cachedDataStaleTimeout) {
          return parsed.data;
        } else {
          return await fetchAndUpdateCache();
        }
      } catch {
        _purgeCache(dataLocalStorageKey);
        return await fetchAndUpdateCache();
      }
    } else {
      return await fetchAndUpdateCache();
    }
  } else {
    return await _fetchApiData();
  }
};

export const getFilteredData = async (filter) => {
  const fetchAndUpdateCache = async () => {
    const data = await getFilteredDataItems(filter);
    localStorage.setItem(
      filteredDataLocalStorageKey,
      JSON.stringify({ time: +new Date(), filter, data })
    );
    return data;
  };
  if (window.localStorage) {
    const cachedData = localStorage.getItem(filteredDataLocalStorageKey);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        if (parsed.filter !== filter) {
          return await fetchAndUpdateCache();
        } else if (+new Date() - +parsed.time < cachedDataStaleTimeout) {
          return parsed.data;
        } else {
          return await fetchAndUpdateCache();
        }
      } catch {
        _purgeCache(filteredDataLocalStorageKey);
        return await fetchAndUpdateCache();
      }
    } else {
      return await fetchAndUpdateCache();
    }
  } else {
    return await getFilteredDataItems(filter);
  }
};
