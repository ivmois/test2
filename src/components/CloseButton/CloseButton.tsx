import React from 'react';

export function CloseButton({ onClose }: { onClose?: () => void }) {
  return (
    <button type='button' className='addTask__close close' onClick={onClose}>
      <span />
    </button>
  );
}
