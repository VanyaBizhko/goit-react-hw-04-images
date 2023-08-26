import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import styles from './ImageGallery.module.css';

// const STATUS = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

export default function ImageGallery({ photoName }) {
  const [photo, setPhoto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentQuery, setCurrentQuery] = useState('');

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (imageURL) => {
    setModalImageUrl(imageURL);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setModalImageUrl('');
    setShowModal(false);
  };

  useEffect(() => {
    if (currentQuery !== photoName) {
      setPhoto([]);
      setCurrentPage(1);
      setCurrentQuery(photoName);
    }
  }, [photoName, currentQuery]);

  useEffect(() => {
    if (photoName) {
      setLoading(true);
      fetch(
        `https://pixabay.com/api/?q=${photoName}&page=${currentPage}&key=35297902-06b0f2f0980941222f0bd9a52&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((res) => res.json())
        .then((data) => {
          if (currentPage === 1) {
            setPhoto(data.hits);
          } else {
            setPhoto((prevPhotos) => [...prevPhotos, ...data.hits]);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading data:', error);
          setLoading(false);
        });
    }
  }, [photoName, currentPage]);

  return (
    <div>
      <ul className={styles.gallery}>
        {loading && (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
        {photo &&
          photo.map((photo) => (
            <li key={photo.id} className={styles.imageGalleryItem}>
              <img
                src={photo.previewURL}
                alt={photo.tags}
                className={styles.galleryImage}
                onClick={() => handleImageClick(photo.largeImageURL)}
              />
            </li>
          ))}
      </ul>
      {photo.length > 0 && !loading && (
        <Button onClick={loadMore} loading={loading} />
      )}
      {showModal && (
        <Modal imageUrl={modalImageUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
}