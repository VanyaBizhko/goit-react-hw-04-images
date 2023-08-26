import React, { useState } from 'react';
import styles from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [photoName, setPhotoName] = useState('');

  const handleNameChange = (e) => {
    setPhotoName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (photoName.trim() === '') {
      alert('Enter photo description!');
      return;
    }
    onSubmit(photoName);
    setPhotoName('');
  };

  return (
    <header className={styles.searchbar}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <button type="submit" className={styles.button}>
          <span className={styles.button_label}>Search</span>
        </button>

        <input
          className={styles.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={photoName}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}