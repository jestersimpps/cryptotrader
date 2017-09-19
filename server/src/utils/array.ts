import { differenceWith, isEqual } from 'lodash';

export interface ArrayDifference {
  added: any[];
  removed: any[];
}

/**
 *
 * @param {any[]} arr1
 * @param {any[]} arr2
 * @returns {ArrayDifference}
 */
export function diff(arr1: any[], arr2: any[]): ArrayDifference {
  const added = differenceWith(arr2, arr1, isEqual);
  const removed = differenceWith(arr1, arr2, isEqual);

  return { added, removed };
}
