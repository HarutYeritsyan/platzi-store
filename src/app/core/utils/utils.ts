export const getArrayWithUniqueItemsByAttribute = <T, A>(list: T[], attributeExtractionFunction: (item: T) => A) => {
  return [...(getArrayMapByAttribute(list, attributeExtractionFunction).values())];
}

export const getArrayMapByAttribute = <T, A>(list: T[], attributeExtractionFunction: (item: T) => A) => {
  return (list || []).reduce((arrayItemsMap, item) => {
    const attribute = attributeExtractionFunction?.(item);
    arrayItemsMap.set(attribute, item);
    return arrayItemsMap;
  }, new Map<A, T>());
}

export const getObjectEntries = <T>(object: T) => {
  return Object.entries(object || {});
}

export const filterObjectAttributes = <T = { [key: string]: unknown }>(objectToProcess: T, attributeFilteringFunction: (attributeValue: unknown) => boolean): Partial<T> => {
  if (!objectToProcess) {
    return objectToProcess;
  }
  Object.entries(objectToProcess).filter(([_, value]) => {
    return !attributeFilteringFunction?.(value);
  }).forEach(([key, _]) => {
    delete objectToProcess[key as keyof T];
  });
  return objectToProcess;
}
