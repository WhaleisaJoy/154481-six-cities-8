import { ChangeEvent, FormEvent, useState } from 'react';
import { SendingCommentStatus } from '../const';
import { CommentsDataType } from '../types/comment';

type OnSendingCommentStatusChangeType = (sendingCommentStatusItem: SendingCommentStatus) => void;
type OnCommentPostType = (commentData: CommentsDataType) => void;
type ResultReviewsForm = [
  {
    rating: number,
    review: string,
  },
  React.Dispatch<React.SetStateAction<{
    rating: number;
    review: string;
  }>>,
  (evt: FormEvent<HTMLFormElement>) => void,
  ({target}: ChangeEvent<HTMLTextAreaElement>) => void,
  ({target}: ChangeEvent<HTMLInputElement>) => void,
];

export const useReviewsForm = (id: string, onSendingCommentStatusChange: OnSendingCommentStatusChangeType, onCommentPost: OnCommentPostType): ResultReviewsForm => {
  const [form, setForm] = useState({
    rating: 0,
    review: '',
  });

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSendingCommentStatusChange(SendingCommentStatus.NotSent);
    if(form.rating !== 0 && form.review !== '') {
      onCommentPost({
        id: +id,
        comment: form.review,
        rating: +form.rating,
      });
    }
  };

  const handleReviewsChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    setForm({
      ...form,
      review: target.value,
    });
  };

  const handleRatingChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      rating: +target.value,
    });
  };

  return [form, setForm, handleSubmit, handleReviewsChange, handleRatingChange];
};
