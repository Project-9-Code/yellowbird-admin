import {
  CollectionReference, DocumentSnapshot, Query, Timestamp,
} from "firebase-admin/firestore";
import {admin} from "./firebase";

const db = admin.firestore();

type DocumentData = admin.firestore.DocumentData;

interface QueryCondition {
  field: string;
  operator: admin.firestore.WhereFilterOp;
  value: string;
}

/**
 * Create an item in firestore db.
 * @param {string} collection The name of collection.
 * @param {DocumentData} document The document object to save in collection.
 * @return {Promise<DocumentData>} Returns the document saved.
 */
export async function createItem(
  collection: string, document: DocumentData
): Promise<DocumentData> {
  if (document.id) {
    await db.collection(collection).doc(document.id).set(document);
  } else {
    const result = await db.collection(collection).add(document);
    document.id = result.id;
  }
  return document;
}

/**
 * Create an subcollection itme in firestore db.
 * @param {string} collection The name of collection.
 * @param {string} collectionId The id of doc in collection.
 * @param {string} subcollection The name of subcollection.
 * @param {DocumentData} document The document object to save in collection.
 * @return {Promise<DocumentData>} Returns the document saved.
 */
export async function createSubItem(
  collection: string,
  collectionId: string,
  subcollection: string,
  document: DocumentData
): Promise<DocumentData> {
  const result = await db.collection(collection)
    .doc(collectionId).collection(subcollection).add(document);
  document.id = result.id;
  return document;
}

/**
 * Gets list of items from a collection.
 * @param {string} collection The name of collection.
 * @param {QueryCondition[]} filters String to filter collection by.
 * @return {DocumentData[]}
 */
export async function getList(
  collection: string,
  filters?: QueryCondition[]
): Promise<DocumentData[]> {
  let query: CollectionReference<DocumentData> | Query<DocumentData> =
    db.collection(collection);

  filters?.forEach((filter) => {
    query = query.where(filter.field, filter.operator, filter.value);
  });

  const result = await query.get();
  const list: DocumentData[] = [];
  result.forEach((doc: DocumentData) => {
    const data = doc.data();
    data.id = doc.id;
    list.push(data);
  });

  return list;
}

/**
 * Gets list of collection groups.
 * @param {string} collection The name of collection.
 * @param {QueryCondition[]} filters String to filter collection by.
 * @return {DocumentData[]}
 */
export async function getCollectionList(
  collection: string,
  filters?: QueryCondition[],
): Promise<DocumentData[]> {
  const query = db.collectionGroup(collection);

  filters?.forEach((filter) => {
    query.where(filter.field, filter.operator, filter.value);
  });

  const result = await query.get();

  const list: DocumentData[] = [];
  result.forEach((doc: any) => {
    const data = doc.data();
    data.id = doc.id;
    list.push(data);
  });
  return list;
}

/**
 * Grabs item from a collection
 * @param {string} collection The name of collection.
 * @param {string} id Id of item
 * @return {DocumentData}
 */
export async function getItem(
  collection: string, id: string
): Promise<DocumentData | null> {
  const result = await db.collection(collection).doc(id).get();
  if (!result.exists) return null; // Record not found

  const doc = result.data() ?? {} as DocumentData;
  doc.id = result.id;
  return doc;
}

/**
 * Grabs item from a collection
 * @param {string} collection The name of collection.
 * @param {string} collectionId Id of collection item.
 * @param {string} subcollection The name of subcollection.
 * @param {string} subcollectionId Id of subcollection item.
 * @return {DocumentData}
 */
export async function getCollectionItem(
  collection: string,
  collectionId: string,
  subcollection: string,
  subcollectionId: string
): Promise<DocumentData | null> {
  const result = await db.collection(collection)
    .doc(collectionId)
    .collection(subcollection)
    .doc(subcollectionId)
    .get();
  if (!result.exists) return null; // Record not found

  const doc = result.data() ?? {} as DocumentData;
  doc.id = result.id;
  return doc;
}

/**
 * Updates and item in a collection.
 * @param {string} collection The name of collection.
 * @param {string} id The id of item to set.
 * @param {DocumentData} document The data to set item with.
 * @return {Promise<DocumentData | null>} Returns the updated item.
 */
export async function setItem(
  collection: string, id: string, document: DocumentData
): Promise<DocumentData | null> {
  const doc = db.collection(collection).doc(id);
  const result = await doc.get();

  if (!result.exists) return null; // Record not found

  await doc.update(document);

  document.id = id;
  return document;
}

/**
 * Updates and item in a collection.
 * @param {string} collection The name of collection.
 * @param {string} collectionId The collection id of item to set.
 * @param {string} subcollection The name of subcollection.
 * @param {string} subcollectionId The subcollection id of item to set.
 * @param {DocumentData} document The data to set item with.
 * @return {Promise<DocumentData | null>} Returns the updated item.
 */
export async function setSubItem(
  collection: string,
  collectionId: string,
  subcollection: string,
  subcollectionId: string,
  document: DocumentData
): Promise<DocumentData | null> {
  const doc = db.collection(collection)
    .doc(collectionId)
    .collection(subcollection)
    .doc(subcollectionId);
  const result = await doc.get();

  if (!result.exists) return null; // Record not found

  await doc.set(document);

  document.id = subcollectionId;
  return document;
}

/**
 * Deletes item from collection.
 * @param {string} collection Name of collection to delete item from.
 * @param {string} id ID of item to delete.
 * @return {Promise<string | null>} Return ID of deleted item.
 */
export async function deleteItem(
  collection: string, id: string
): Promise<string | null> {
  const doc = db.collection(collection).doc(id);
  const result = await doc.get();

  if (!result.exists) return null; // Record not found

  await doc.delete();

  return id;
}

/**
 * Deletes item from collection.
 * @param {string} collection Name of collection to delete item from.
 * @param {string} collectionId ID of collection to delete item from.
 * @param {string} subcollection Name of subcollection to delete item from.
 * @param {string} id ID of item to delete.
 * @return {Promise<string | null>} Return ID of deleted item.
 */
export async function deleteSubItem(
  collection: string, collectionId: string, subcollection: string, id: string
): Promise<string | null> {
  const doc = db.collection(collection)
    .doc(collectionId)
    .collection(subcollection)
    .doc(id);
  const result = await doc.get();

  if (!result.exists) return null; // Record not found

  await doc.delete();

  return id;
}

export interface BatchItem {
  collection: string;
  id?: string;
  data: Partial<unknown>;
}

/**
 * Add a bulk of items to db.
 * @param {BatchItem[]} items
 * @return {Promise<WriteResult[]>}
 */
export async function addBatch(
  items: BatchItem[]
): Promise<DocumentData[]> {
  const batch = db.batch();
  const results = [] as DocumentData[];

  items.forEach((item) => {
    const ref = db.collection(item.collection).doc();
    const data = {...item.data, id: ref.id};
    batch.set(ref, data);
    results.push(data);
  });

  await batch.commit();
  return results;
}

/**
 * Update a bulk of items to db.
 * @param {BatchItem[]} updates
 * @return {Promise<[]>}
 */
export async function updateBatch(
  updates: BatchItem[]
): Promise<DocumentData[]> {
  const batch = db.batch();

  updates.forEach((item) => {
    if (item.id) {
      const ref = db.collection(item.collection).doc(item.id);
      batch.update(ref, item.data);
    }
  });

  await batch.commit();
  return updates.map((item) => ({...item.data, id: item.id}));
}

/**
 * Remove a bulk of items from db.
 * @param {BatchItem[]} items
 * @return {Promise<string[]>}
 */
export async function removeBatch(
  items: BatchItem[]
): Promise<string[]> {
  const batch = db.batch();

  items.forEach((item) => {
    if (item.id) {
      const ref = db.collection(item.collection).doc(item.id);
      batch.delete(ref);
    }
  });

  await batch.commit();
  return items.map((item) => item.id ?? "");
}

/**
 *  Fetches all items that were batch added/updated in db
 * @param {BatchItem[]} items Items that were written to db
 * @return {Promise<DocumentSnapshot<DocumentData>[]>}
 */
export async function fetchAllBatchItems(
  items: BatchItem[]
): Promise<DocumentSnapshot<DocumentData>[]> {
  return await db.getAll(
    ...items.map((item) => {
      return db.collection(item.collection).doc(item.id ?? "");
    })
  );
}

export {Timestamp};
