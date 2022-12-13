/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import { addProject } from '../../../../store/projectReducer';
import { generateRandomString } from '../../../../utils/generateRandomIndex';
import FormProject from '../FormProject/FormProject';

export default function FormAddProject({ onClose }: { onClose: () => void }) {
  const dispatch = useDispatch();

  function addNewProject(value: string) {
    const projectData = {
      text: value,
      id: generateRandomString(),
    };
    dispatch(addProject(projectData));
    onClose();
  }

  return <FormProject buttonText='Add' addNewProject={(value) => addNewProject(value)} />;
}
