/* eslint-disable no-nested-ternary */
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editTask, ITaskState, sortTask } from '../../../store/projectReducer';
import { ETasksStatus } from '../../Enums/ETasksStatus';
import { ETypeCard } from '../../Enums/ETypeCard';
import { TaskCard } from '../TaskCard';

interface ITasksList {
  tasksList: ITaskState[];
}

interface ITaskBoard {
  id: number;
  status: string;
  items: ITaskState[];
}

export function TasksListFilter({ tasksList }: ITasksList) {
  const [selected, setSelected] = useState('name');
  const [inputValue, setInputValue] = useState('');
  const [currentTasks, setCurrentTasks] = useState(tasksList);

  useEffect(() => {
    setCurrentTasks(tasksList);
    if (selected === 'name') {
      if (inputValue !== '') {
        setCurrentTasks(tasksList.filter((task) => task.name.includes(inputValue)));
      } else setCurrentTasks(tasksList);
    }

    if (selected === 'number') {
      if (inputValue !== '') {
        setCurrentTasks(tasksList.filter((task, index) => index + 1 === Number(inputValue)));
      } else setCurrentTasks(tasksList);
    }
  }, [tasksList, inputValue]);

  const queueList = currentTasks.filter((task) => task.status === ETasksStatus.Queue);
  const developmentList = currentTasks.filter((task) => task.status === ETasksStatus.Development);
  const doneList = currentTasks.filter((task) => task.status === ETasksStatus.Done);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
  }

  const taskBords: ITaskBoard[] = [
    { id: 1, status: ETasksStatus.Queue, items: queueList },
    { id: 2, status: ETasksStatus.Development, items: developmentList },
    { id: 3, status: ETasksStatus.Done, items: doneList },
  ];

  const [currentTaskID, setCurrentTaskID] = useState('');
  const dispatch = useDispatch();

  function dropBordHandler(e: React.DragEvent<HTMLLIElement>, board: ITaskBoard) {
    e.preventDefault();
    const currentTask = tasksList.find((item) => item.id === currentTaskID);
    if (!currentTask) return;
    currentTask.status = board.status;
    dispatch(editTask(currentTask));
  }

  function dragOverHandler(e: React.DragEvent<HTMLLIElement>) {
    e.preventDefault();
    if (e.currentTarget.className === 'task-card') {
      e.currentTarget.style.boxShadow = '0 4px 3px gray';
    }
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLLIElement>) {
    e.currentTarget.style.boxShadow = 'none';
  }
  function dragStartHandler(e: React.DragEvent<HTMLLIElement>, task: ITaskState) {
    setCurrentTaskID(task.id);
  }
  function dragEndHandler(e: React.DragEvent<HTMLLIElement>) {
    e.currentTarget.style.boxShadow = 'none';
  }

  function dropHandler(e: React.DragEvent<HTMLLIElement>, task: ITaskState) {
    e.preventDefault();
    e.currentTarget.style.boxShadow = 'none';
    const currentTask = tasksList.find((item) => item.id === currentTaskID);
    if (!currentTask) return;

    const currentIndex = tasksList.indexOf(currentTask);
    const newIndex = tasksList.indexOf(task);
    tasksList.splice(currentIndex, 1);
    tasksList.splice(newIndex, 0, currentTask);
    dispatch(sortTask(tasksList));
  }

  return (
    <div>
      <form className='tasks__filter form-filter' onSubmit={handleSubmit}>
        <label className='form-filter__label' htmlFor='filterSelect'>
          <span className='form-filter__name'> Task filter </span>
          <select
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
            }}
            className='form-filter__select'
            id='filterSelect'
          >
            <option value='number'> number </option>
            <option value='name'> name </option>
          </select>
        </label>
        <input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className='form-filter__input'
          type='text'
        />
      </form>
      <ul className='tasks__status-list'>
        {taskBords.map((board) => (
          <li
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropBordHandler(e, board)}
            key={board.id}
            className='tasks__status-item'
          >
            <div className='tasks__status-status'>{board.status}</div>
            <div
              className={`tasks__status-block ${
                board.status === ETasksStatus.Queue
                  ? 'status-queue'
                  : board.status === ETasksStatus.Development
                  ? 'status-development'
                  : 'status-done'
              }`}
            >
              <ul className='tasks-list'>
                {board.items.map((task) => {
                  return (
                    <li
                      key={task.id}
                      className='task-card'
                      draggable
                      onDragOver={(e) => dragOverHandler(e)}
                      onDragLeave={(e) => dragLeaveHandler(e)}
                      onDragStart={(e) => dragStartHandler(e, task)}
                      onDragEnd={(e) => dragEndHandler(e)}
                      onDrop={(e) => dropHandler(e, task)}
                    >
                      <TaskCard typeCard={ETypeCard.task} taskData={task} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
