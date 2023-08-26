import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import styles from './App.module.css';

export default function App() {
  const [photoName, setPhotoName] = useState('');

  const handleSearchbarSubmit = (newPhotoName) => {
    setPhotoName(newPhotoName);
  };

  return (
    <div className={styles.app}>
      <Searchbar onSubmit={handleSearchbarSubmit} />
      <ImageGallery photoName={photoName} />
    </div>
  );
}
//35297902-06b0f2f0980941222f0bd9a52