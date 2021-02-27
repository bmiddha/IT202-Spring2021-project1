import { componentsManifest } from "./componentsManifest.js";

export const componentLibrary = {};

export const loadComponent = async (componentName) => {
  if (!componentLibrary.hasOwnProperty(componentName)) {
    const [component, html] = [
      (await import(componentsManifest[componentName].jsImport)).default,
      componentsManifest[componentName].htmlPath
        ? await (await fetch(componentsManifest[componentName].htmlPath)).text()
        : undefined,
    ];
    if (html) {
      componentLibrary[componentName] = component(html);
    } else {
      componentLibrary[componentName] = component;
    }
  }
  return componentLibrary[componentName];
};
