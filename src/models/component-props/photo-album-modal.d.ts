import { Photo } from '../photo';

export type PhotoAlbumModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  imageInfo: Photo;
  setImageInfo: (imageInfo: Photo) => void;
};
