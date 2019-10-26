// Collect the documents and add the id
export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};

// Restructure to be object keyed by id
export const convertCollectionToKeyedObject = collection => {
  return collection.reduce((acc, doc) => {
    acc[doc.id] = {
      id: doc.id,
      ...doc.data(),
    };
    return acc;
  }, {});
};
