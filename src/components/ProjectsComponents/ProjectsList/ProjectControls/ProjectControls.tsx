import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeProject } from '../../../../store/projectReducer';
import { DeleteItem } from '../../../DeleteItem';
import { EditItem } from '../../../EditItem';
import { ETypeModal } from '../../../Enums/ETypeModal';
import { ModalPortal } from '../../../ModalPortal';
import { ModalProject } from '../../ModalProject';

interface IProjectControls {
  id: string;
  text: string;
}

export function ProjectControls({ id, text }: IProjectControls) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  function deleteProject() {
    dispatch(removeProject({ id, text }));
  }

  return (
    <div className='project__controls'>
      <EditItem onOpen={() => setIsOpenModal(true)} />
      {isOpenModal && (
        <ModalPortal>
          <ModalProject id={id} typeModal={ETypeModal.edit} onClose={() => setIsOpenModal(false)} />
        </ModalPortal>
      )}
      <DeleteItem onDelete={() => deleteProject()} />
    </div>
  );
}
