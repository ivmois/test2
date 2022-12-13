import React from 'react';
import { createPortal } from 'react-dom';

export function ModalPortal({ children }: { children: React.ReactNode }) {
  const modalElement = document.querySelector('#modal');
  if (!modalElement) return null;
  return createPortal(<div className='modal'>{children}</div>, modalElement);
}
