import React, { useEffect } from 'react';
import { ITaskState } from '../../../store/projectReducer';
import { CloseButton } from '../../CloseButton';
import { ETypeCard } from '../../Enums/ETypeCard';
import { ETypeComment } from '../../Enums/ETypeComment';
import { ETypeModal } from '../../Enums/ETypeModal';
import { Subtasks } from '../Subtasks';
import { CommentsMenu } from './CommentsMenu';
import FormAddTask from './FormAddTask/FormAddTask';
import { FormEditTask } from './FormEditTask';

interface IModalTask {
  taskData?: ITaskState;
  parentID?: string;
  onClose: () => void;
  typeModal: ETypeModal;
  typeCard: ETypeCard;
}
export function ModalTask({ onClose, typeModal, parentID, taskData, typeCard }: IModalTask) {
  if (!parentID) return null;

  useEffect(() => {
    const taskModal = document.querySelector('.modal-task') as HTMLElement;
    if (typeCard === ETypeCard.subtask) {
      taskModal.style.display = 'none';
    }
    return () => {
      taskModal.style.display = 'block';
    };
  }, []);

  return (
    <div className={`modal__addTask addTask ${typeCard === ETypeCard.task ? 'modal-task' : ''}`}>
      <CloseButton onClose={onClose} />
      <div className='addTask__form-container'>
        {typeModal === ETypeModal.add && <FormAddTask typeCard={typeCard} parentID={parentID} onClose={onClose} />}
        {typeModal === ETypeModal.edit && (
          <FormEditTask typeCard={typeCard} parentID={parentID} taskData={taskData} onClose={onClose} />
        )}
        {typeModal === ETypeModal.edit && typeCard === ETypeCard.task && <Subtasks taskData={taskData} />}
      </div>

      {ETypeModal.edit && (
        <div className='addTask__comments'>
          <CommentsMenu commentsType={ETypeComment.new} parentID={taskData?.id} />
        </div>
      )}
    </div>
  );
}
