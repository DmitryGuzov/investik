import { useEffect, useState } from 'react';

import { deleteKnowledgeItem, getKnowledges } from '@/services/knowledges';
import { KnowledgeModel } from '@/models/knowledge';

const useKnowledges = function () {
  const [loading, setLoading] = useState(false);
  const [knowledges, setKnowledges] = useState<KnowledgeModel[]>([]);
  const [limit, setLimit] = useState(2);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);

  async function deleteKnowledge(id: string) {
    setDeleteLoading(true);

    let newInvestments = knowledges.slice();
    let idx = newInvestments.findIndex((item: any) => item.id === id);
    if (idx !== -1) {
      const res = await deleteKnowledgeItem(id);
      newInvestments.splice(idx, 1);
      setKnowledges(newInvestments);
    }
    setDeleteLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    getKnowledges().then((list) => {
      setKnowledges(list);
      setLoading(false);
    });
  }, []);

  const setTake = (event: any) => {
    setLimit(+event.target.value);
  };

  return {
    page,
    setPage,
    knowledges,
    limit,
    loading,
    setTake,
    deleteKnowledge,
    deleteLoading,
    total,
  };
};

export default useKnowledges;
