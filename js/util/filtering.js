import { getApiData } from "./apiClient.js";

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
    return true;
  }
};
