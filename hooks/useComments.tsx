import { useState } from 'react';

import { updateInvestment } from '@/services/investments';
import { useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import {
  addInvestmentComment,
  deleteInvestmentComment,
  updateInvestmentComment,
} from '@/services/comments';
import { CommentModel } from '@/models/comment';

interface InitialProps {
  comments: any[];
  investmentId: string;
}

const useComments = function (initial: InitialProps) {
  const [createLoading, setCreateLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [editLoading, setEditLoading] = React.useState(false);
  const {
    isOpen: isOpenCreation,
    onOpen: onOpenCreation,
    onClose: onCloseCreation,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const router = useRouter();
  const [selected, setSelected] = React.useState<any | null>(null);
  const toast = useToast();
  const [testimonials, setTestimonials] = useState<CommentModel[]>(
    initial.comments.length > 0 ? initial.comments : []
  );

  const onCreate = () => {
    onOpenCreation();
  };

  const handleCreate = async (newComment: any) => {
    try {
      setCreateLoading(true);
      const created = await addInvestmentComment(
        initial.investmentId,
        newComment
      );

      let newComments = testimonials.slice();
      newComments.push(created);
      await updateInvestment(initial.investmentId, {
        comments: newComments.length,
      });
      setTestimonials(newComments);
      toast({
        title: 'Комментарий добавлен!',
        description: 'Вы добавили комментарий',
        status: 'success',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      setCreateLoading(false);
      onCloseCreation();
    } catch (err: any) {
      toast({
        title: 'Ошибка: комментарий не Добавлен!',
        description: `${err?.message}`,
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      setCreateLoading(false);
      onCloseCreation();
    }
  };
  const cancelCreate = () => {
    onCloseCreation();
  };
  const onEdit = (comment: any) => () => {
    setSelected(comment);
    onOpenEdit();
  };
  const cancelEdit = () => {
    setSelected(null);
    onCloseEdit();
  };
  const onDelete = (comment: any) => () => {
    setSelected(comment);
    onOpenDelete();
  };
  const cancelDelete = () => {
    setSelected(null);
    onCloseDelete();
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);
      if (selected != null) {
        await deleteInvestmentComment(selected.id);
        let newComments = testimonials.slice();
        let idx = newComments.findIndex((item: any) => item.id === selected.id);
        if (idx !== -1) {
          newComments.splice(idx, 1);
          await updateInvestment(initial.investmentId, {
            comments: newComments.length,
          });
          setTestimonials(newComments);
        }
        toast({
          title: 'Комментарий удален!',
          description: 'Вы удалили комментарий',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }
      setSelected(null);
      setDeleteLoading(false);
      onCloseDelete();
    } catch (err: any) {
      toast({
        title: 'Ошибка: комментарий не удален!',
        description: `${err?.message}`,
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      setSelected(null);
      setDeleteLoading(false);
      onCloseDelete();
    }
  };
  const handleEdit = async (updated: any) => {
    try {
      setEditLoading(true);
      if (selected != null) {
        await updateInvestmentComment(selected.id, updated);
        let newComments = testimonials.slice();
        let idx = newComments.findIndex((item: any) => item.id === selected.id);
        if (idx !== -1) {
          newComments[idx] = { ...newComments[idx], ...updated };
          setTestimonials(newComments);
        }
        toast({
          title: 'Комментарий редактирован!',
          description: 'Вы изменили комментарий',
          status: 'success',
          position: 'top-right',
          duration: 5000,
          isClosable: true,
        });
      }
      setEditLoading(false);
      onCloseEdit();
    } catch (err: any) {
      toast({
        title: 'Ошибка: комментарий не изменен!',
        description: `${err?.message}`,
        status: 'error',
        position: 'top-right',
        duration: 5000,
        isClosable: true,
      });
      setEditLoading(false);
      onCloseEdit();
    }
  };

  return {
    investmentId: initial.investmentId,
    testimonials,
    deleteLoading,
    editLoading,
    router,
    onCreate,
    handleCreate,
    cancelCreate,
    onEdit,
    handleEdit,
    cancelEdit,
    onDelete,
    handleDelete,
    cancelDelete,
    createLoading,
    isOpenCreation,
    isOpenEdit,
    isOpenDelete,
    selected,
  };
};

export default useComments;
