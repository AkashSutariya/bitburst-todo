import type { sortable } from '@/types/index'

function sortArrayOfObjectByStringField<Type, Field extends keyof Type>(field: Field) {
  return function <T extends { [key in Field]: string }>(a: T, b: T) {
    return a[field].localeCompare(b[field]);
  }
}

function sortArrayOfObjectByDateField<Type, Field extends keyof Type>(field: Field) {
  return function <T extends { [key in Field]: Date }>(a: T, b: T) {
    return a[field].getTime() - b[field].getTime();
  }
}

export function sortArrayOfObject<Type, Field extends keyof Type>(sort: sortable<Type, Field>) {
  switch(sort.type) {
    case 'string':
      return sortArrayOfObjectByStringField<Type, Field>(sort.by);
    case 'date':
      return sortArrayOfObjectByDateField<Type, Field>(sort.by);
    default:
      break;
  }
}
