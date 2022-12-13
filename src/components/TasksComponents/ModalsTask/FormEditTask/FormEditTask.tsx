import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { editSubtask, editTask, ITaskState } from '../../../../store/projectReducer';
import { ETypeCard } from '../../../Enums/ETypeCard';
import { ETypeModal } from '../../../Enums/ETypeModal';
import FormTask from '../FormTask/FormTask';

interface IFormEditTask {
  taskData?: ITaskState;
  typeCard: ETypeCard;
  parentID: string;
  onClose: () => void;
}

export function FormEditTask({ onClose, taskData, parentID, typeCard }: IFormEditTask) {
  if (!taskData) return null;
  const dispatch = useDispatch();
  const task = useSelector<RootState, ITaskState[]>((state) => state.projects.tasks).filter(
    (item) => item.id === taskData.id
  );

  if (!task) return null;

  function editTaskData(newTaskData: ITaskState) {
    if (typeCard === 'task') {
      dispatch(editTask(newTaskData));
    }
    if (typeCard === 'subtask') {
      dispatch(editSubtask(newTaskData));
    }
    onClose();
  }

  return (
    <FormTask
      typeCard={typeCard}
      typeModal={ETypeModal.edit}
      taskData={taskData}
      parentID={parentID}
      buttonText='save'
      editTaskData={(newTaskData) => editTaskData(newTaskData)}
    />
  );
}
