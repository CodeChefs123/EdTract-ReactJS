/**
 * This function retrieves the document ID based on the content provided in the query dictionary.
 * @param {Object} collection - Firestore collection reference.
 * @param {Object} queryDict - Dictionary containing query fields and their corresponding values.
 * @returns {Promise<string|Error>} - Returns a promise that resolves to the document ID if found, otherwise an error message.
 */
const getDocumentIdByContent = async (collection, queryDict) => {
  try {
    // Construct the query based on the provided query dictionary
    const query = Object.keys(queryDict).reduce(
      (acc, field) => acc.where(field, "==", queryDict[field]),
      collection
    );

    // Execute the query
    const querySnapshot = await query.get();

    // If no document is found, throw an error
    if (querySnapshot.empty) {
      throw new Error("No document found with the provided content");
    }

    // Retrieve the document ID from the query result
    return querySnapshot.docs[0].id;
  } catch (error) {
    // Return the error message
    return error.message;
  }
};

export default getDocumentIdByContent;
