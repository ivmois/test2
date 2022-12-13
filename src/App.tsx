import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Projects />} />
        <Route path='/project/:id' element={<Tasks />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  );
}

export default App;
