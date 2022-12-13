/* eslint-disable no-unused-vars */
import React, { ChangeEvent, FormEvent, useState } from 'react';

interface IFormProject {
  addNewProject?: (value: string) => void;
  editProjectData?: (value: string) => void;
  nameProject?: string;
  buttonText: string;
}

export default function FormProject({ addNewProject, editProjectData, nameProject, buttonText }: IFormProject) {
  const [value, setValue] = useState(nameProject ?? '');
  const [valid, setValid] = useState(true);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (addNewProject) {
      if (value !== '') {
        addNewProject(value);
      } else {
        setValid(false);
      }
    }
    if (editProjectData) {
      if (value !== '') {
        editProjectData(value);
      } else {
        setValid(false);
      }
    }
  }
  return (
    <form className='addProject__form' onSubmit={handleSubmit}>
      <label className='addProject__label' htmlFor='name'>
        Project name
        <input
          id='name'
          className={`addProject__input ${!valid ? 'noValid' : ''}`}
          value={value}
          onChange={handleChange}
        />
      </label>

      <button type='submit' className='addProject__button'>
        {buttonText}
      </button>
    </form>
  );
}
