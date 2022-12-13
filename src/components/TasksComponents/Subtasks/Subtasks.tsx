import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { ITaskState } from '../../../store/projectReducer';
import { AddButton } from '../../AddButton';
import { ETypeCard } from '../../Enums/ETypeCard';
import { ETypeModal } from '../../Enums/ETypeModal';
import { ModalPortal } from '../../ModalPortal';
import { ModalTask } from '../ModalsTask';
import { TaskCard } from '../TaskCard';

interface ISubtasks {
  taskData?: ITaskState;
}

export function Subtasks({ taskData }: ISubtasks) {
  if (!taskData) return null;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const subtasksList = useSelector<RootState, ITaskState[]>((state) => state.projects.subtasks).filter(
    (subtask) => subtask.parentID === taskData.id
  );

  return (
    <div className='subtasks'>
      <h3>Subtasks:</h3>
      <AddButton
        text='Add subtasks'
        onOpen={() => {
          setIsOpenModal(true);
        }}
      />
      <ul className='subtasks__list'>
        {subtasksList.map((subtask) => {
          return (
            <li className='task-card' key={subtask.id}>
              <TaskCard key={subtask.id} typeCard={ETypeCard.subtask} taskData={taskData} subtaskData={subtask} />
            </li>
          );
        })}
      </ul>
      {isOpenModal && (
        <ModalPortal>
          <ModalTask
            typeCard={ETypeCard.subtask}
            parentID={taskData.id}
            typeModal={ETypeModal.add}
            onClose={() => setIsOpenModal(false)}
          />
        </ModalPortal>
      )}
    </div>
  );
}
