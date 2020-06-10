export function parseAllDatesDoc(obj: {}) {
  const isObject = !!obj && typeof obj === 'object';
  if (!isObject) {
    return;
  }
  Object.keys(obj).map(key => {
    const value = obj[key];
    obj[key] = recusivelyCheckObjectValue(value);
  });
}

export function recusivelyCheckObjectValue(input: any) {
  const isFalsey = !input;
  if (isFalsey) {
    return input;
  }
  const isPrimitive = typeof input !== 'object';
  if (isPrimitive) {
    return input;
  }
  const isTimestamp = !!input.toDate && typeof input.toDate === 'function';
  if (isTimestamp) {
    return input.toDate();
  }
  const isArray = Array.isArray(input);
  if (isArray) {
    return input.map(value => recusivelyCheckObjectValue(value));
  }
  // Parse Firestore data type DocumentReference:
  const isDocumentReference = input.id && input.firestore && input.path;
  if (isDocumentReference) {
    return input.id;
  }
  const isObject = typeof input === 'object';
  if (isObject) {
    Object.keys(input).map(key => {
      const value = input[key];
      input[key] = recusivelyCheckObjectValue(value);
    });
    return input;
  }
}
