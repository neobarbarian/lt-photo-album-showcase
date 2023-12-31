/* PhotoAlbumModal.tsx */

import { Modal } from 'react-bootstrap';
import { Photo } from '../../models/photo';
import { PhotoAlbumModalProps } from '../../models/component-props/photo-album-modal';

export default function PhotoAlbumModal(props: PhotoAlbumModalProps) {
  const { showModal, setShowModal, imageInfo, setImageInfo } = props;

  return (
    <Modal
      size="lg"
      dialogClassName="modal-90w"
      show={showModal}
      onHide={() => {
        setImageInfo({} as Photo);
        setShowModal(false);
      }}
      aria-labelledby="photo-album-modal-display"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="photo-album-modal-display">
          {imageInfo.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-img">
        <img src={imageInfo.url} alt={imageInfo.title} />
      </Modal.Body>
    </Modal>
  );
}
