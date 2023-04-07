import { db } from '@/config/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { uuidv4 } from '@firebase/util';
import { KnowledgeModel } from '@/models/knowledge';

export async function getKnowledges() {
  const citiesCol = collection(db, 'knowledges');
  const q = query(citiesCol);
  const citySnapshot = await getDocs(q);
  const knowledges = citySnapshot.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
  return knowledges as KnowledgeModel[];
}

export async function addKnowledge(data: any) {
  const id = uuidv4();
  await setDoc(doc(db, 'knowledges', id), data);
  return { id: id, ...data };
}

export async function updateKnowledge(knowledgeId: string, data: any) {
  return await updateDoc(doc(db, 'knowledges', knowledgeId), data);
}
export async function deleteKnowledgeItem(knowledgeId: string) {
  return await deleteDoc(doc(db, 'knowledges', knowledgeId));
}
