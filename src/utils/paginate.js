import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * 4;

  // _.slice(startIndex, endIndex)
  // or _.slice(startIndex).take(size)

  items = _(items).slice(startIndex).take(pageSize).value();

  return items;
}
