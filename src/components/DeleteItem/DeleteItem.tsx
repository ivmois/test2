import React from 'react';

interface IDeleteItem {
  nonText?: boolean;
  onDelete: () => void;
}

export function DeleteItem({ onDelete, nonText = true }: IDeleteItem) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    onDelete();
  }

  return (
    <button onClick={handleClick} className='controls-btn delete-btn'>
      <svg
        className='controls-btn__svg delete-btn__svg'
        width='10'
        height='12'
        viewBox='0 0 10 12'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.714286 10.6667C0.714286 11.4 1.35714 12 2.14286 12H7.85714C8.64286 12 9.28571 11.4 9.28571 10.6667V2.66667H0.714286V10.6667ZM2.14286 4H7.85714V10.6667H2.14286V4ZM7.5 0.666667L6.78571 0H3.21429L2.5 0.666667H0V2H10V0.666667H7.5Z'
          fill='#999999'
        />
      </svg>
      {nonText && <span className='controls-btn__text delete-btn__text'> Delete</span>}
    </button>
  );
}
