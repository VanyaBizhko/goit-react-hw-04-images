import React, { useEffect } from 'react';
import 'basiclightbox/dist/basicLightbox.min.css';
import styles from './Modal.module.css';

export default function Modal({ imageUrl, onClose }) {
 

  const handleBackdropClick = (e) => {
    if (e.target !== imageUrl) {
      onClose();
    }
  };

 useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} onClick={handleBackdropClick}>
        <img src={imageUrl} alt="Large" />
      </div>
    </div>
  );
}