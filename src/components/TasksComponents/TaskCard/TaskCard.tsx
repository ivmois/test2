import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ITaskState, removeSubtask, removeTask } from '../../../store/projectReducer';
import { DeleteItem } from '../../DeleteItem';
import { ETypeCard } from '../../Enums/ETypeCard';
import { ETypeModal } from '../../Enums/ETypeModal';
import { ModalPortal } from '../../ModalPortal';
import { ModalTask } from '../ModalsTask';

interface ITaskCard {
  typeCard: ETypeCard;
  taskData: ITaskState;
  subtaskData?: ITaskState;
}

export function TaskCard({ taskData, subtaskData, typeCard }: ITaskCard) {
  const cardData = typeCard === 'task' ? taskData : subtaskData;
  if (!cardData) return null;
  const { name, priority, createDate, endDate, parentID, number } = cardData;
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  function deleteTask() {
    if (typeCard === 'task') {
      dispatch(removeTask(taskData));
    }
    if (typeCard === 'subtask') {
      dispatch(removeSubtask(subtaskData));
    }
  }

  function handleClick() {
    setIsOpenModal(true);
  }
  return (
    <>
      <button onClick={handleClick} className='task-card__btn'>
        <div className='task-card__header'>
          <span className='task-card__number'> {number} </span>
          <h2 className='task-card__title'>{name}</h2>
        </div>

        <div className='task-card__block priority-block'>
          <span>Priority:</span>
          <span>{priority}</span>
        </div>

        <div className='task-card__block data-block'>
          <div className=' data-block__createDate'>
            <span>Date started:</span>
            <span>{moment(createDate).format('YYYY-MM-DD')}</span>
          </div>
          <div className='data-block__endDate'>
            <span>Date ended:</span>
            <span>{moment(endDate).format('YYYY-MM-DD')}</span>
          </div>
        </div>
      </button>
      <div className='task-card__remove'>
        <DeleteItem
          nonText={false}
          onDelete={() => {
            deleteTask();
          }}
        />
      </div>
      {isOpenModal && (
        <ModalPortal>
          <ModalTask
            typeCard={typeCard}
            taskData={cardData}
            parentID={parentID}
            typeModal={ETypeModal.edit}
            onClose={() => setIsOpenModal(false)}
          />
        </ModalPortal>
      )}
    </>
  );
}
