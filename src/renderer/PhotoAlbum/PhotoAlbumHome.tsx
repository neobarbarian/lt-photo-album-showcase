/* PhotoAlbumHome.tsx */

import { useEffect, useState } from 'react';
import { Alert, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import './PhotoAlbumHome.scss';
import { SearchFilter } from '../../models/search-filter';
import { Photo } from '../../models/photo';
import PhotoAlbumModal from './PhotoAlbumModal';
import PhotoAlbumInput from './PhotoAlbumInput';
import PhotoAlbumInputButton from './PhotoAlbumInputButton';

const searchFilter: SearchFilter = {};

export default function PhotoAlbum() {
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [imageInfo, setImageInfo] = useState({} as Photo);
  const [photos, setPhotos] = useState([] as Photo[]);

  useEffect(() => {
    const fieldCleared = searchTerm.length === 0;
    const searchTermMinLength = searchCategory === 'title' ? 3 : 1;

    if (fieldCleared) {
      delete searchFilter[searchCategory as keyof typeof searchFilter];
    } else if (!fieldCleared && searchTerm.length >= searchTermMinLength) {
      searchFilter[searchCategory as keyof typeof searchFilter] = searchTerm;
    } else {
      return () => {};
    }

    let timer = 0;
    timer = searchCategory === 'title' ? 2000 : 1000;

    const delayDebounceFn = setTimeout(() => {
      window.electron.ipcRenderer.once('album:get', (arg) => {
        setPhotos(arg as Photo[]);
      });
      window.electron.ipcRenderer.sendMessage('album:get', searchFilter);
    }, timer);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchCategory]);

  return (
    <div className="photo-album">
      <Col className="photo-album__main">
        {photos.length > 0 ? (
          photos.map((photo: Photo) => (
            <Card
              key={photo.id}
              className="photo-album__card"
              onClick={() => {
                setImageInfo(photo);
                setShowModal(true);
              }}
            >
              <Card.Img
                className="photo-album__img"
                variant="top"
                src={photo.thumbnailUrl}
              />
              <Card.Body className="title">
                <span>{photo.title}</span>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div className="photo-album__no-results">
            <h1>No Photos Available</h1>
            <p>
              Please enter or modify search terms in the form below to find
              photos.
            </p>
          </div>
        )}
      </Col>

      {Object.keys(imageInfo).length > 0 && (
        <PhotoAlbumModal
          showModal={showModal}
          setShowModal={setShowModal}
          imageInfo={imageInfo}
          setImageInfo={setImageInfo}
        />
      )}

      <Alert
        className="photo-album__alert"
        show={showAlert}
        variant="danger"
        role="alert"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        <Alert.Heading>Invalid Entry</Alert.Heading>
        <p>{alertMessage}</p>
      </Alert>

      <div className="photo-album__footer">
        <Form noValidate>
          <Row className="search-form-row">
            <Col className="search-form-control">
              <InputGroup>
                <InputGroup.Text>album id</InputGroup.Text>
                <PhotoAlbumInput
                  name="albumId"
                  setShowAlert={setShowAlert}
                  setAlertMessage={setAlertMessage}
                  setSearchCategory={setSearchCategory}
                  setSearchTerm={setSearchTerm}
                />
                <PhotoAlbumInputButton
                  name="albumId"
                  label="album id"
                  setSearchCategory={setSearchCategory}
                  setSearchTerm={setSearchTerm}
                />
              </InputGroup>
            </Col>
            <Col className="search-form-control">
              <InputGroup>
                <InputGroup.Text>photo id</InputGroup.Text>
                <PhotoAlbumInput
                  name="id"
                  setShowAlert={setShowAlert}
                  setAlertMessage={setAlertMessage}
                  setSearchCategory={setSearchCategory}
                  setSearchTerm={setSearchTerm}
                />
                <PhotoAlbumInputButton
                  name="id"
                  label="photo id"
                  setSearchCategory={setSearchCategory}
                  setSearchTerm={setSearchTerm}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row className="search-form-row">
            <Col className="search-form-control">
              <InputGroup>
                <InputGroup.Text>title</InputGroup.Text>
                <PhotoAlbumInput
                  name="title"
                  setShowAlert={setShowAlert}
                  setAlertMessage={setAlertMessage}
                  setSearchCategory={setSearchCategory}
                  setSearchTerm={setSearchTerm}
                />
                <PhotoAlbumInputButton
                  name="title"
                  label="title"
                  setSearchCategory={setSearchCategory}
                  setSearchTerm={setSearchTerm}
                />
              </InputGroup>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
