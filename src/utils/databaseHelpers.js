// Collect the documents and add the id
export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

// Restructure collection to be object keyed by id
export const convertCollectionToKeyedObjectById = collection => {
  return collection.reduce((acc, doc) => {
    acc[doc.id] = {
      id: doc.id,
      ...doc.data(),
    };
    return acc;
  }, {});
};

// Restructure collection to be object keyed by date with arrays as value
export const convertCollectionToKeyedArrays = (collection, keyByValue) => {
  return collection.reduce((acc, doc) => {
    const item = {
      id: doc.id,
      ...doc.data(),
    };

    if (acc[item[keyByValue]]) {
      acc[item[keyByValue]].push(item);
    } else {
      acc[item[keyByValue]] = [item];
    }

    return acc;
  }, {});
};
