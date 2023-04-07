import { useEffect, useState } from 'react';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

import { db } from '@/config/firebase';
import {
  getAllInvestments,
  getInvestmentsWithPageAndCount,
  deleteInvestmentWithComments,
} from '@/services/investments';

const useInvestments = function () {
  const [loading, setLoading] = useState(false);
  const [investments, setInvestments] = useState<any>([]);
  const [limit, setLimit] = useState(2);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  async function deleteInvestment(id: string) {
    setDeleteLoading(true);

    let newInvestments = investments.slice();
    let idx = newInvestments.findIndex((item: any) => item.id === id);
    if (idx !== -1) {
      const res = await deleteInvestmentWithComments(id);
      newInvestments.splice(idx, 1);
      setInvestments(newInvestments);
    }
    setDeleteLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getAllInvestments().then((list) => {
      setInvestments(list);
      setLoading(false);
    });
  }, []);

  const setTake = (event: any) => {
    setLimit(+event.target.value);
  };

  return {
    page,
    setPage,
    investments,
    limit,
    loading,
    setTake,
    deleteInvestment,
    deleteLoading,
    total,
  };
};

export default useInvestments;
