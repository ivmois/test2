import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { IProjectState } from '../../../store/projectReducer';
import { merge } from '../../../utils/merge';
import { GenericListProject, IItem } from './GenericListProjects/GenericListProjects';

export function ProjectsList() {
  const projects: IItem[] = useSelector<RootState, IProjectState[]>((state) => state.projects.projects).map(
    (item, index) => {
      return merge(item)({
        href: `${index + 1}`,
      });
    }
  );
  return (
    <ul className='projects-list'>
      <GenericListProject list={projects} />
    </ul>
  );
}
