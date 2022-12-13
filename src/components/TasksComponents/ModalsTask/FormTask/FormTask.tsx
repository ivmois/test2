/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
import moment from 'moment';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { generateRandomString } from '../../../../utils/generateRandomIndex';
import { ITaskState } from '../../../../store/projectReducer';
import { ETypeModal } from '../../../Enums/ETypeModal';
import { EditItem } from '../../../EditItem';
import { ETypeCard } from '../../../Enums/ETypeCard';
import { ETasksStatus } from '../../../Enums/ETasksStatus';

interface IFormTask {
  typeModal: ETypeModal;
  typeCard: ETypeCard;
  parentID: string;
  addNewTask?: (value: ITaskState) => void;
  editTaskData?: (value: ITaskState) => void;
  buttonText: string;
  taskData?: ITaskState;
}

// Если указан typeModal: add форма работет в режиме создания новой задачи. Если edit, тогда в редижиме редактирования,
// при этом копонента получает  taskDate  и все поля изначально  disabled.

export default function FormTask({
  addNewTask,
  editTaskData,
  buttonText,
  parentID,
  typeModal,
  taskData,
  typeCard,
}: IFormTask) {
  const [name, setName] = useState(taskData?.name ?? '');
  const [priority, setPriority] = useState(taskData?.priority ?? 'low');
  const [descr, setDescr] = useState(taskData?.descr ?? '<p></p>');
  const [createDate, setCreateDate] = useState(taskData?.createDate ?? moment().format('YYYY-MM-DDTHH:mm'));
  const [endDate, setEndDate] = useState(taskData?.endDate ?? '');
  const [status, setStatus] = useState(taskData?.status ?? ETasksStatus.Queue);
  const [valid, setValid] = useState(true);

  const [disabledName, setDisabledName] = useState(typeModal === 'edit');
  const [disabledPriority, setDisabledPriority] = useState(typeModal === 'edit');
  const [disabledDescr, setDisabledDescr] = useState(typeModal === 'edit');
  const [disabledEndDate, setDisabledEndDate] = useState(typeModal === 'edit');

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    switch (e.target.id) {
      case 'name':
        setName(e.target.value);
        break;
      case 'priority':
        setPriority(e.target.value);
        break;
      case 'createDate':
        setCreateDate(e.target.value);
        break;
      case 'endDate':
        setEndDate(e.target.value);
        break;
      case 'status':
        setStatus(e.target.value);
        break;
      default:
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (name && priority && descr && createDate && endDate) {
      if (addNewTask) {
        const taskDate = {
          name,
          priority,
          descr,
          createDate,
          endDate,
          id: generateRandomString(),
          parentID,
          status,
        };

        addNewTask(taskDate);
      }
    } else {
      setValid(false);
    }

    if (taskData) {
      if (name && priority && descr && createDate && endDate) {
        if (editTaskData) {
          const taskDate = {
            name,
            priority,
            descr,
            createDate,
            endDate,
            id: taskData.id,
            parentID,
            status,
          };
          editTaskData(taskDate);
        }
      } else {
        setValid(false);
      }
    }
  }

  return (
    <form className='addTask__form' onSubmit={handleSubmit}>
      <div className='addTask__blosk-status'>
        <label className='addTask__label_status' htmlFor='status'>
          <span>Status:</span>
          <select value={status} className='addTask__status' id='status' onChange={handleChange}>
            <option value={ETasksStatus.Queue}> queue </option>
            <option value={ETasksStatus.Development}> development </option>
            <option value={ETasksStatus.Done}> done </option>
          </select>
        </label>
        {disabledDescr && (
          <div>
            <span> Time spend: </span>
            <span>{moment(createDate).toNow(true)}</span>{' '}
          </div>
        )}
      </div>
      <label className='addTask__label' htmlFor='name'>
        <span>Task name:</span>
        <input
          id='name'
          className='addTask__input addTask__input_name'
          value={name}
          onChange={handleChange}
          disabled={disabledName}
        />
        {typeModal === 'edit' && <EditItem onOpen={() => setDisabledName(false)} />}
      </label>
      <label className='addTask__label' htmlFor='priority'>
        <span>Priority:</span>
        <select
          value={priority}
          className='addTask__input'
          id='priority'
          onChange={handleChange}
          disabled={disabledPriority}
        >
          <option value='hight'> hight </option>
          <option value='mediumt'> medium </option>
          <option value='low'> low </option>
        </select>
        {disabledDescr && <EditItem onOpen={() => setDisabledPriority(false)} />}
      </label>
      <div className='addTask__textarea'>
        <span> Task description: </span>
        {disabledDescr && <EditItem onOpen={() => setDisabledDescr(false)} />}

        <Editor
          onEditorChange={(newText) => setDescr(newText)}
          init={{ menubar: false, height: '200px', statusbar: false, toolbar: !disabledDescr }}
          value={descr}
          disabled={disabledDescr}
        />
      </div>

      <label className='addTask__label' htmlFor='createDate'>
        <span>Date started:</span>
        <input
          className='addTask__input'
          id='createDate'
          type='datetime-local'
          defaultValue={moment().format('YYYY-MM-DDTHH:mm')}
          onChange={handleChange}
          disabled={disabledEndDate}
        />
      </label>
      <label className='addTask__label' htmlFor='endDate'>
        <span>Date ended:</span>
        <input
          className='addTask__input'
          id='endDate'
          type='datetime-local'
          onChange={handleChange}
          value={endDate}
          disabled={disabledEndDate}
        />
        {typeModal === 'edit' && <EditItem onOpen={() => setDisabledEndDate(false)} />}
      </label>

      <button type='submit' className='addProject__button'>
        {buttonText}
        {valid || <span className='addProject__valid'> Все поля должны быть заполнены </span>}
      </button>
    </form>
  );
}
