import React from 'react';
import { CloseButton } from '../../CloseButton';
import { ETypeModal } from '../../Enums/ETypeModal';
import FormAddProject from './FormAddProject/FormAddProject';
import FormEditProject from './FormEditProject/FormEditProject';

interface IModalAddProject {
  id?: string;
  onClose: () => void;
  typeModal: ETypeModal;
}
export function ModalProject({ onClose, typeModal, id }: IModalAddProject) {
  return (
    <div className='modal__addProjects addProject'>
      <CloseButton onClose={onClose} />
      {typeModal === 'add' && <FormAddProject onClose={onClose} />}
      {typeModal === 'edit' && <FormEditProject id={id} onClose={onClose} />}
    </div>
  );
}
