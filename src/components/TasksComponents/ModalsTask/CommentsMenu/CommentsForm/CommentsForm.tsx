import moment from 'moment';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComments } from '../../../../../store/projectReducer';
import { generateRandomString } from '../../../../../utils/generateRandomIndex';
import { CloseButton } from '../../../../CloseButton';
import { ETypeComment } from '../../../../Enums/ETypeComment';

interface ICommentsForm {
  commentsType: ETypeComment;
  parentID: string;
  onClose?: () => void;
}

export function CommentsForm({ parentID, commentsType, onClose }: ICommentsForm) {
  const [value, setValue] = useState('');

  const dispatch = useDispatch();

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.stopPropagation();
    e.preventDefault();

    if (value === '' && commentsType === ETypeComment.new) return;
    if (value === '' && commentsType === ETypeComment.reply) {
      if (!onClose) return;
      onClose();
    }

    const comment = {
      parentID,
      id: generateRandomString(),
      date: moment().format('YYYY-MM-DDTHH:mm'),
      value,
    };
    dispatch(addComments(comment));
    setValue('');
    if (!onClose) return;
    onClose();
  }
  return (
    <form className='comments__form' onSubmit={handleSubmit}>
      <textarea className='comments__textarea' value={value} onChange={handleChange} />
      <button type='submit' className='comments__button'>
        Add comment
      </button>
      {commentsType === ETypeComment.reply && <CloseButton onClose={onClose} />}
    </form>
  );
}
