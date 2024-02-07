export const removeEmptyValues = (object: Object): Object => {
  return JSON.parse(JSON.stringify(object), (key, value) =>
    value === null || value === "" ? undefined : value
  );
};
