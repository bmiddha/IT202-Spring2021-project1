export const componentsManifest = {
  about: {
    jsImport: "./../components/about.js",
  },
  baseView: {
    jsImport: "./../components/baseView.js",
  },
  data: {
    jsImport: "./../components/data.js",
  },
  form: {
    jsImport: "./../components/form.js",
  },
  home: {
    jsImport: "./../components/home.js",
  },
  map: {
    jsImport: "./../components/map.js",
  },
  navbar: {
    jsImport: "./../components/navbar.js",
  },
  pwa: {
    jsImport: "./../components/pwa.js",
  },
  router: {
    jsImport: "./../components/router.js",
  },
};

export const componentLibrary = {};

export const loadComponent = async (componentName) => {
  if (!componentLibrary.hasOwnProperty(componentName)) {
    const component = (await import(componentsManifest[componentName].jsImport))
      .default;
    componentLibrary[componentName] = component;
  }
  return componentLibrary[componentName];
};

export default loadComponent;
