export default function sortBy(array: any[], by: string) {
  function compare(a, b) {
    const sideA = JSON.parse(a[by]);
    const sideB = JSON.parse(b[by]);

    if (sideA < sideB) {
      return -1;
    }
    if (sideA > sideB) {
      return 1;
    }
    return 0;
  }

  return array.sort(compare);
}
