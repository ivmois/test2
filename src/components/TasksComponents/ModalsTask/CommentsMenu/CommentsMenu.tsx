import React from 'react';
import { ETypeComment } from '../../../Enums/ETypeComment';
import { CommentsForm } from './CommentsForm';
import { CommentsList } from './CommentsList';

interface ICommentsMenu {
  parentID?: string;
  commentsType: ETypeComment;
  isOpen?: boolean;
  onClose?: () => void;
}

export function CommentsMenu({ commentsType, parentID, isOpen, onClose }: ICommentsMenu) {
  if (!parentID) return null;

  return (
    <div className='comments'>
      {(isOpen || commentsType === ETypeComment.new) && (
        <CommentsForm onClose={onClose} commentsType={commentsType} parentID={parentID} />
      )}
      <CommentsList parentID={parentID} />
    </div>
  );
}
