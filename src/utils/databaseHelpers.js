// Collect the documents and add the id
export const collectIdsAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
};
