export function sortArrayByDateProperty(
  array: any[],
  propertyName: string,
  asc: boolean = true
) {
  if (array) {
    if (asc) {
      return array.sort((a: any, b: any) => {
        return (
          new Date(a[propertyName]).getTime() -
          new Date(b[propertyName]).getTime()
        );
      });
    } else {
      return array.sort((a: any, b: any) => {
        return (
          new Date(b[propertyName]).getTime() -
          new Date(a[propertyName]).getTime()
        );
      });
    }
  }
}
