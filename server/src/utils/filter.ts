/**
 * Converts empty value to null.
 *
 * @param obj
 * @returns {*}
 */
export function emptyToNull(obj: any): any {
  if (isScalarType(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(emptyToNull);
  }

  const result: any = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (typeof value === 'object') {
      result[key] = emptyToNull(value);
    } else {
      result[key] = nullIfEmpty(value);
    }
  }

  return result;
}

/**
 * Returns if scalar type.
 *
 * @param obj
 * @returns {boolean}
 */
function isScalarType(obj: any) {
  return (
    typeof obj !== 'object' ||
    obj instanceof String ||
    obj instanceof Number ||
    obj instanceof Boolean ||
    obj === null
  );
}

/**
 * Changes empty value to null.
 *
 * @param value
 * @returns {*}
 */
function nullIfEmpty(value: any) {
  if (typeof value !== 'string') {
    return value;
  }

  return value.trim() === '' ? null : value;
}
