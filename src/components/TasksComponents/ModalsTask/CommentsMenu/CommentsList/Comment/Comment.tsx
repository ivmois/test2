import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ICommentsState, removeComments } from '../../../../../../store/projectReducer';
import { DeleteItem } from '../../../../../DeleteItem';
import { ETypeComment } from '../../../../../Enums/ETypeComment';
import { CommentsMenu } from '../../CommentsMenu';
import { CommentButton } from './CommentButton';

interface IComment {
  commentData?: ICommentsState;
}

export function Comment({ commentData }: IComment) {
  if (!commentData) return null;
  const dispatch = useDispatch();

  function deleteComment() {
    dispatch(removeComments(commentData));
  }

  const [isFormOpen, setIsFormOpen] = useState(false);

  function openForm() {
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
  }

  return (
    <div className='comment'>
      <div className='comment__data'>
        <svg
          className='comment__user'
          width='50'
          height='50'
          viewBox='0 0 50 50'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M25 0C11.2 0 0 11.2 0 25C0 38.8 11.2 50 25 50C38.8 50 50 38.8 50 25C50 11.2 38.8 0 25 0ZM25 7.5C29.15 7.5 32.5 10.85 32.5 15C32.5 19.15 29.15 22.5 25 22.5C20.85 22.5 17.5 19.15 17.5 15C17.5 10.85 20.85 7.5 25 7.5ZM25 43C18.75 43 13.225 39.8 10 34.95C10.075 29.975 20 27.25 25 27.25C29.975 27.25 39.925 29.975 40 34.95C36.775 39.8 31.25 43 25 43Z'
            fill='#D9D9D9'
          />
        </svg>
        <span className='comment__author'> Anon </span>
        <span className='comment__date'> {moment(commentData?.date).format('YYYY-MM-DD')}</span>
      </div>
      <p className='comment__text'>{commentData.value}</p>
      <div className='comment__control'>
        <CommentButton onOpen={() => openForm()} />
        <DeleteItem onDelete={() => deleteComment()} />
      </div>
      <CommentsMenu
        onClose={() => closeForm()}
        isOpen={isFormOpen}
        commentsType={ETypeComment.reply}
        parentID={commentData.id}
      />
    </div>
  );
}
