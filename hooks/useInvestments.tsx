import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
async function sleep(ms: any) {
  return await new Promise((res) => {
    setTimeout(() => {
      res('');
    }, ms);
  });
}
import { db } from '@/config/firebase';

const useInvestments = function () {
  const [loading, setLoading] = useState(false);
  const [investments, setInvestments] = useState<any>([]);
  const [limit, setLimit] = useState(5);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [page, setPage] = useState(1);

  const disabledButtons = loading;

  async function getInvestments() {
    const citiesCol = collection(db, 'investments');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    return cityList;
  }

  async function deleteInvestment(id: string) {
    setDeleteLoading(true);

    let newInvestments = investments.slice();
    let idx = newInvestments.findIndex((item: any) => item.id === id);
    if (idx !== -1) {
      await deleteDoc(doc(db, 'investments', id));
      newInvestments.splice(idx, 1);
      setInvestments(newInvestments);
    }
    setDeleteLoading(false);
  }

  useEffect(() => {
    console.log('Loading data');
    setLoading(true);
    getInvestments().then((list) => {
      setInvestments(list);
      setLoading(false);
    });
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  const setTake = (event: any) => {
    setLimit(+event.target.value);
  };

  interface setSortPayload {
    isAcs?: boolean;
    orderColumn?: number;
  }

  return {
    page,
    setPage,
    investments,
    limit,
    loading,
    setTake,
    deleteInvestment,
    deleteLoading,
  };
};

export default useInvestments;
