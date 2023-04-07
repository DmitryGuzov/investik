import { db } from '@/config/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  startAt,
  updateDoc,
  where,
} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';

export async function getAllComments() {
  const citiesCol = collection(db, 'testimonials');
  const q = query(citiesCol);
  const citySnapshot = await getDocs(q);
  const investments = citySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return investments;
}
export async function getAllInvestmentComments(investmentId: string) {
  const citiesCol = collection(db, 'testimonials');
  const q = query(citiesCol, where('investmentId', '==', investmentId));
  const citySnapshot = await getDocs(q);
  const comments = citySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return comments ?? [];
}
export async function getTenInvestmentComments(investmentId: string) {
  const citiesCol = collection(db, 'testimonials');
  const q = query(
    citiesCol,
    limit(10),
    where('investmentId', '==', investmentId)
  );
  const citySnapshot = await getDocs(q);
  const comments = citySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return comments;
}

export async function addInvestmentComment(investmentId: string, data: any) {
  const id = uuidv4();
  await setDoc(doc(db, 'testimonials', id), {
    investmentId: investmentId,
    ...data,
  });
  return { id: id, investmentId: investmentId, ...data };
}

export async function updateInvestmentComment(commentId: string, data: any) {
  return await updateDoc(doc(db, 'testimonials', commentId), data);
}
export async function deleteInvestmentComment(commentId: string) {
  return await deleteDoc(doc(db, 'testimonials', commentId));
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
