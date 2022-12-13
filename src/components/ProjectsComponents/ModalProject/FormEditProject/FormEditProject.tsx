/* eslint-disable no-unused-vars */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { editProject, IProjectState } from '../../../../store/projectReducer';
import { generateRandomString } from '../../../../utils/generateRandomIndex';
import { IItem } from '../../ProjectsList/GenericListProjects/GenericListProjects';
import FormProject from '../FormProject/FormProject';

export default function FormEditProject({ onClose, id }: { onClose: () => void; id?: string }) {
  if (!id) return null;
  const dispatch = useDispatch();
  const Projects: IItem[] = useSelector<RootState, Array<IProjectState>>((state) => state.projects.projects);
  const nameProject = Projects.find((item) => item.id === id)?.text;

  function editProjectData(value: string) {
    const projectData = {
      text: value,
      id,
    };
    dispatch(editProject(projectData));
    onClose();
  }

  return (
    <FormProject buttonText='Save' nameProject={nameProject} editProjectData={(value) => editProjectData(value)} />
  );
}
