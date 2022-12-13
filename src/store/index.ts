import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { projectReducer } from './projectReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({ projects: projectReducer });

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
