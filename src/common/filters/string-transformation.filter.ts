export function capitalize(value: string) {
  if (value && value.length > 0) {
    return value[0].toUpperCase() + value.substr(1).toLowerCase();
  } else {
    return value;
  }
}
