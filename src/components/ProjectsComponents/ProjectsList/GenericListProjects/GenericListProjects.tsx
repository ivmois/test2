import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectControls } from '../ProjectControls';

export interface IItem {
  text: string;
  id: string;
  href?: string;
}

interface IMyListProps {
  list: IItem[];
}

export function GenericListProject({ list }: IMyListProps) {
  return (
    <>
      {list.map(({ text, id, href }: IItem) => (
        <li className='projects-list__item project' key={id}>
          <Link to={`/project/${href}`} className='project__link'>
            <span>{text}</span>
          </Link>
          <ProjectControls id={id} text={text} />
        </li>
      ))}
    </>
  );
}
