export const cloneMap = (source: Map<any, any>): Map<string, any> => {
  return new Map(JSON.parse(JSON.stringify(Array.from(source))));
};

export const objectToMap = (obj: any): Map<any, any> => {
  return new Map(Object.entries(obj));
};

export const objectToMapHasId = (obj: any): Map<any, any> => {
  const newMap = new Map();
  Object.keys(obj).forEach((value: any) => {
    newMap.set(obj[value]?.id, obj?.[value]);
  });
  return newMap;
};

export const mapToObject = (source: Map<any, any>) => {
  return Object.fromEntries(source);
};
