export const componentLibrary = {};

export const lazyLoadComponent = async (componentName) => {
  if (!componentLibrary.hasOwnProperty(componentName)) {
    const [component, html] = [
      (await import(`../components/${componentName}/${componentName}.js`))
        .default,
      await (
        await fetch(`js/components/${componentName}/${componentName}.html`)
      ).text(),
    ];
    componentLibrary[componentName] = component(html);
  }
  return componentLibrary[componentName];
};
