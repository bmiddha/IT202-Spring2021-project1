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

export const getFilteredDataItems = async (filter) => {
  if (filter) {
    setFilter(filter);
  }
  const data = await getApiData();
  const _filter = getFilter();
  if (_filter) {
    return data.filter((item) => {
      for (let f of Object.keys(_filter)) {
        if (!item[f]) {
          return false;
        }
        if (!_filter[f].value) {
          continue;
        }
        if (_filter[f].regex) {
          if (!item[f].match(new RegExp(_filter[f].value, "g"))) {
            return false;
          }
        } else if (_filter[f].type === "number") {
          if (parseInt(item[f]) !== parseInt(_filter[f].value)) {
            return false;
          }
        } else {
          if (
            item[f].toLowerCase().indexOf(_filter[f].value.toLowerCase()) === -1
          ) {
            return false;
          }
        }
      }
      return true;
    });
  } else {
    return data;
  }
};

const filterLocalStorageKey = "chicago-data-filter";

export const getFilter = () => {
  const cachedData = localStorage.getItem(filterLocalStorageKey);
  if (cachedData) {
    try {
      const parsed = JSON.parse(cachedData);
      return parsed;
    } catch {
      removeFilter();
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const setFilter = (filter) => {
  localStorage.setItem(filterLocalStorageKey, JSON.stringify(filter));
};

export const removeFilter = () => {
  localStorage.removeItem(filterLocalStorageKey);
};
