import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AddButton } from '../components/AddButton';
import { ProjectsList } from '../components/ProjectsComponents/ProjectsList';
import { ModalProject } from '../components/ProjectsComponents/ModalProject';
import { ETypeModal } from '../components/Enums/ETypeModal';
import { initialStateStorege } from '../store/projectReducer';
import { ModalPortal } from '../components/ModalPortal';

export default function Projects() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const stateGlobal = localStorage.getItem('projectState');

    if (stateGlobal) dispatch(initialStateStorege(JSON.parse(stateGlobal)));
  }, []);

  return (
    <div className='projects'>
      <h1 className='projects__title'> Projects </h1>
      <AddButton text='Add' onOpen={() => setIsOpenModal(true)} />
      <ProjectsList />
      {isOpenModal && (
        <ModalPortal>
          <ModalProject typeModal={ETypeModal.add} onClose={() => setIsOpenModal(false)} />
        </ModalPortal>
      )}
    </div>
  );
}
