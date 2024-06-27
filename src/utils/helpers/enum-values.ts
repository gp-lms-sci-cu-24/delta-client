export function getEnumValues(enumObject: object) {
  return Object.keys(enumObject).filter((key) => isNaN(Number(key)));
}
export function getEnumNumberValues(enumObject: object) {
  return Object.keys(enumObject)
    .filter((key) => !isNaN(Number(key)))
    .map(Number);
}
