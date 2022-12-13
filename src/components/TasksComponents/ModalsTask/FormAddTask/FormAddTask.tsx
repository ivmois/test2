/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import { addSubtask, addTask, ITaskState } from '../../../../store/projectReducer';
import { ETypeCard } from '../../../Enums/ETypeCard';
import { ETypeModal } from '../../../Enums/ETypeModal';
import FormTask from '../FormTask/FormTask';

export default function FormAddTask({
  onClose,
  parentID,
  typeCard,
}: {
  onClose: () => void;
  parentID?: string;
  typeCard: ETypeCard;
}) {
  const dispatch = useDispatch();

  function addNewTask(taskData: ITaskState) {
    if (typeCard === 'task') {
      dispatch(addTask(taskData));
      onClose();
    }
    if (typeCard === 'subtask') {
      dispatch(addSubtask(taskData));
      onClose();
    }
  }
  if (!parentID) return null;
  return (
    <FormTask
      typeCard={typeCard}
      typeModal={ETypeModal.add}
      parentID={parentID}
      buttonText='Add'
      addNewTask={(taskData) => addNewTask(taskData)}
    />
  );
}
