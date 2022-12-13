import { ActionCreator, AnyAction, Reducer } from 'redux';

const INITIAL_STATE_STORAGE = 'INITIAL_STATE_STORAGE';
const ADD_PROJECT = 'ADD_PROJECT';
const REMOVE_PROJECT = 'REMOVE_PROJECT';
const EDIT_PROJECT = 'EDIT_PROJECT';

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const EDIT_TASK = 'EDIT_TASK';
const SORT_TASK = 'SORT_TASK';

const ADD_SUBTASK = 'ADD_SUBTASK';
const REMOVE_SUBTASK = 'REMOVE_SUBTASK';
const EDIT_SUBTASK = 'EDIT_SUBTASK';

const ADD_COMMENTS = 'ADD_COMMENTS';
const REMOVE_COMMENTS = 'REMOVE_COMMENTS';
const EDIT_COMMENTS = 'EDIT_COMMENTS';

export const initialStateStorege: ActionCreator<AnyAction> = (project) => ({
  type: INITIAL_STATE_STORAGE,
  payload: project,
});

export const addProject: ActionCreator<AnyAction> = (project) => ({
  type: ADD_PROJECT,
  payload: project,
});

export const removeProject: ActionCreator<AnyAction> = (project) => ({
  type: REMOVE_PROJECT,
  payload: project,
});

export const editProject: ActionCreator<AnyAction> = (project) => ({
  type: EDIT_PROJECT,
  payload: project,
});

export const addTask: ActionCreator<AnyAction> = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const removeTask: ActionCreator<AnyAction> = (task) => ({
  type: REMOVE_TASK,
  payload: task,
});

export const editTask: ActionCreator<AnyAction> = (task) => ({
  type: EDIT_TASK,
  payload: task,
});

export const sortTask: ActionCreator<AnyAction> = (tasks) => ({
  type: SORT_TASK,
  payload: tasks,
});

export const addSubtask: ActionCreator<AnyAction> = (task) => ({
  type: ADD_SUBTASK,
  payload: task,
});

export const removeSubtask: ActionCreator<AnyAction> = (task) => ({
  type: REMOVE_SUBTASK,
  payload: task,
});

export const editSubtask: ActionCreator<AnyAction> = (task) => ({
  type: EDIT_SUBTASK,
  payload: task,
});

export const addComments: ActionCreator<AnyAction> = (comment) => ({
  type: ADD_COMMENTS,
  payload: comment,
});

export const editComments: ActionCreator<AnyAction> = (comment) => ({
  type: EDIT_COMMENTS,
  payload: comment,
});

export const removeComments: ActionCreator<AnyAction> = (comment) => ({
  type: REMOVE_COMMENTS,
  payload: comment,
});

export interface IProjectState {
  text: string;
  id: string;
}

export interface ITaskState {
  number?: number;
  parentID: string;
  id: string;
  name: string;
  priority: string;
  descr: string;
  createDate: string;
  endDate: string;
  status: string;
}

export interface ICommentsState {
  parentID: string;
  id: string;
  date: string;
  value: string;
}

export interface IMainState {
  projects: Array<IProjectState>;
  tasks: Array<ITaskState>;
  subtasks: Array<ITaskState>;
  comments: Array<ICommentsState>;
}

const initialState: IMainState = {
  projects: [],
  tasks: [],
  subtasks: [],
  comments: [],
};

export const projectReducer: Reducer<IMainState> = (state = initialState, action): IMainState => {
  switch (action.type) {
    case INITIAL_STATE_STORAGE:
      return action.payload;

    case ADD_PROJECT:
      localStorage.setItem('projectState', JSON.stringify({ ...state, projects: [...state.projects, action.payload] }));
      return { ...state, projects: [...state.projects, action.payload] };
    case REMOVE_PROJECT:
      localStorage.setItem(
        'projectState',
        JSON.stringify({ ...state, projects: [...state.projects.filter((item) => item.id !== action.payload.id)] })
      );
      return { ...state, projects: [...state.projects.filter((item) => item.id !== action.payload.id)] };
    case EDIT_PROJECT:
      localStorage.setItem(
        'projectState',
        JSON.stringify({
          ...state,
          projects: [...state.projects].map((post) => ({
            ...post,
            text: post.id === action.payload.id ? action.payload.text : post.text,
          })),
        })
      );
      return {
        ...state,
        projects: [...state.projects].map((post) => ({
          ...post,
          ...(post.id === action.payload.id ? action.payload : post),
        })),
      };

    case ADD_TASK:
      localStorage.setItem('projectState', JSON.stringify({ ...state, tasks: [...state.tasks, action.payload] }));
      return { ...state, tasks: [...state.tasks, action.payload] };

    case REMOVE_TASK:
      localStorage.setItem(
        'projectState',
        JSON.stringify({ ...state, tasks: [...state.tasks.filter((item) => item.id !== action.payload.id)] })
      );
      return { ...state, tasks: [...state.tasks.filter((item) => item.id !== action.payload.id)] };
    case EDIT_TASK:
      localStorage.setItem(
        'projectState',
        JSON.stringify({
          ...state,
          tasks: [...state.tasks].map((post) => ({
            ...post,
            ...(post.id === action.payload.id ? action.payload : post),
          })),
        })
      );
      return {
        ...state,
        tasks: [...state.tasks].map((post) => ({
          ...post,
          ...(post.id === action.payload.id ? action.payload : post),
        })),
      };

    case SORT_TASK:
      localStorage.setItem(
        'projectState',
        JSON.stringify({
          ...state,
          tasks: [...action.payload],
        })
      );
      return {
        ...state,
        tasks: [...action.payload],
      };

    case ADD_SUBTASK:
      localStorage.setItem('projectState', JSON.stringify({ ...state, subtasks: [...state.subtasks, action.payload] }));
      return { ...state, subtasks: [...state.subtasks, action.payload] };

    case REMOVE_SUBTASK:
      localStorage.setItem(
        'projectState',
        JSON.stringify({ ...state, subtasks: [...state.subtasks.filter((item) => item.id !== action.payload.id)] })
      );
      return { ...state, subtasks: [...state.subtasks.filter((item) => item.id !== action.payload.id)] };
    case EDIT_SUBTASK:
      localStorage.setItem(
        'projectState',
        JSON.stringify({
          ...state,
          subtasks: [...state.subtasks].map((post) => ({
            ...post,
            ...(post.id === action.payload.id ? action.payload : post),
          })),
        })
      );
      return {
        ...state,
        subtasks: [...state.subtasks].map((post) => ({
          ...post,
          ...(post.id === action.payload.id ? action.payload : post),
        })),
      };
    case ADD_COMMENTS:
      localStorage.setItem('projectState', JSON.stringify({ ...state, comments: [...state.comments, action.payload] }));
      return { ...state, comments: [...state.comments, action.payload] };

    case REMOVE_COMMENTS:
      localStorage.setItem(
        'projectState',
        JSON.stringify({ ...state, comments: [...state.comments.filter((item) => item.id !== action.payload.id)] })
      );
      return { ...state, comments: [...state.comments.filter((item) => item.id !== action.payload.id)] };
    case EDIT_COMMENTS:
      localStorage.setItem(
        'projectState',
        JSON.stringify({
          ...state,
          comments: [...state.comments].map((post) => ({
            ...post,
            ...(post.id === action.payload.id ? action.payload : post),
          })),
        })
      );
      return {
        ...state,
        comments: [...state.comments].map((post) => ({
          ...post,
          ...(post.id === action.payload.id ? action.payload : post),
        })),
      };

    default:
      return state;
  }
};
