import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store';
import { ICommentsState } from '../../../../../store/projectReducer';
import { Comment } from './Comment/Comment';

interface ICommentsList {
  parentID: string;
}

export function CommentsList({ parentID }: ICommentsList) {
  const comments = useSelector<RootState, Array<ICommentsState>>((state) => state.projects.comments)
    .filter((comment) => comment.parentID === parentID)
    .reverse();

  return (
    <ul>
      {comments.map((comment) => (
        <Comment key={comment.id} commentData={comment} />
      ))}
    </ul>
  );
}
