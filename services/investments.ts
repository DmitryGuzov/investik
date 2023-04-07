import { db } from '@/config/firebase';
import {
  collection,
  deleteDoc,
  doc,
  documentId,
  FieldPath,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  startAt,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { getAllInvestmentComments } from './comments';

export async function getAllInvestments() {
  const citiesCol = collection(db, 'investments');
  const q = query(citiesCol);
  const citySnapshot = await getDocs(q);
  const investments = citySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return investments;
}

export async function getLimitInvestments(take: number = 5) {
  const citiesCol = collection(db, 'investments');
  const q = query(citiesCol, limit(take));
  const citySnapshot = await getDocs(q);
  const investments = citySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return investments;
}

export async function getTopFiveInvestments() {
  const citiesCol = collection(db, 'investments');
  const q = query(citiesCol, where('isTopFive', '==', true), limit(5));
  const citySnapshot = await getDocs(q);
  const investments = citySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return investments;
}
export async function getInvestmentById(id: string) {
  const docRef = doc(db, 'investments', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data(), id: docSnap.id };
  } else {
    return null;
  }
}
export async function updateInvestment(investmentId: string, data: any) {
  return await updateDoc(doc(db, 'investments', investmentId), data);
}
export async function deleteInvestmentWithComments(investmentId: string) {
  const batch = writeBatch(db);

  const comments = await getAllInvestmentComments(investmentId);
  const deleted = await deleteDoc(doc(db, 'investments', investmentId));
  comments.forEach((comment) => {
    batch.delete(doc(db, 'testimonials', comment.id));
  });
  // Commit the batch
  await batch.commit();
  return deleted;
}

export async function getInvestmentsByPage(skip: string, take: number = 2) {
  const citiesCol = collection(db, 'investments');
  const q = query(citiesCol, limit(take));
  const citySnapshot = await getDocs(q);
  const investments = citySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return investments;
}

export async function getInvestmentsWithPageAndCount(
  lastItem: string,
  page: number,
  take: number
) {
  const coll = collection(db, 'investments');
  const snapshot = await getCountFromServer(coll);
  const total = snapshot.data().count;

  const skip = (page - 1) * take;
  const pages = Math.ceil(total / take);
  const items = await getInvestmentsByPage(lastItem, take);

  return { total, skip, pages, items };
}
