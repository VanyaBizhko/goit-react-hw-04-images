import React from 'react';
import styles from './Button.module.css';

export default function Button({ onClick, loading }) {
  return (
    <button type="button" onClick={onClick} className={styles.button} disabled={loading}>
      {loading ? 'Loading...' : 'Load More'}
    </button>
  );
}