import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AddButton } from '../components/AddButton';
import { ETypeCard } from '../components/Enums/ETypeCard';
import { ETypeModal } from '../components/Enums/ETypeModal';
import { ModalPortal } from '../components/ModalPortal';
import { ButtonBack } from '../components/TasksComponents/ButtonBack';
import { ModalTask } from '../components/TasksComponents/ModalsTask';
import { TasksListFilter } from '../components/TasksComponents/TasksList';
import { RootState } from '../store';
import { initialStateStorege, IProjectState, ITaskState } from '../store/projectReducer';

export default function Tasks() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const stateGlobal = localStorage.getItem('projectState');

    if (stateGlobal) dispatch(initialStateStorege(JSON.parse(stateGlobal)));
  }, []);

  const params = useParams();
  const navigate = useNavigate();

  const project = useSelector<RootState, Array<IProjectState>>((state) => state.projects.projects).find(
    (item, index) => index + 1 === Number(params.id)
  );

  const nameProject = project?.text;

  const tasksList = useSelector<RootState, ITaskState[]>((state) => state.projects.tasks)
    .filter((task) => task.parentID === project?.id)
    .map((task, index) => ({ ...task, number: index + 1 }));

  function goBack() {
    navigate('/');
  }

  return (
    <div className='tasks'>
      <ButtonBack goBack={() => goBack()} />
      <h1 className='tasks__title'>{nameProject}</h1>
      <AddButton
        text='Add task'
        onOpen={() => {
          setIsOpenModal(true);
        }}
      />
      <TasksListFilter tasksList={tasksList} />
      {isOpenModal && (
        <ModalPortal>
          <ModalTask
            typeCard={ETypeCard.task}
            parentID={project?.id}
            typeModal={ETypeModal.add}
            onClose={() => setIsOpenModal(false)}
          />
        </ModalPortal>
      )}
    </div>
  );
}
