import React from 'react';

interface IAddButton {
  text: string;
  onOpen: () => void;
}

export function AddButton({ text, onOpen }: IAddButton) {
  return (
    <button type='button' onClick={onOpen} className='projects__btn'>
      {text}
    </button>
  );
}
