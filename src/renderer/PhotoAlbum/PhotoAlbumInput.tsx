/* PhotoAlbumInput.tsx */

import { Form } from 'react-bootstrap';
import { AlbumInputProps } from '../../models/component-props/photo-album-input';

function validateInputFields(inputName: string, inputValue: string): boolean {
  if (inputName && (inputName === 'albumId' || inputName === 'id')) {
    return inputValue.length > 0 && /^\d+$/.test(inputValue);
  }
  if (inputName && inputName === 'title' && inputValue.length >= 3) {
    return /^[a-zA-Z0-9\-_.]+$/.test(inputValue);
  }
  return true;
}

function setErrorMessage(inputName: string): string {
  if (inputName && (inputName === 'albumId' || inputName === 'id')) {
    return 'ID fields must be numeric.';
  }
  if (inputName && inputName === 'title') {
    return 'Title field must only contain letters, digits, hyphens, underscores, and periods.';
  }
  return 'An unknown error occurred.';
}

export default function PhotoAlbumInput(props: AlbumInputProps) {
  const {
    name,
    setShowAlert,
    setAlertMessage,
    setSearchCategory,
    setSearchTerm,
  } = props;

  const displayName = () => {
    switch (name) {
      case 'albumId':
        return 'for Album ID';
      case 'id':
        return 'for Photo ID';
      case 'title':
        return 'for Title';
      default:
        return '';
    }
  };

  return (
    <Form.Control
      type="text"
      name={name}
      aria-label={`Please enter a search value ${displayName()}`}
      title={`Please enter a search value ${displayName()}`}
      onChange={($event) => {
        if (validateInputFields($event.target.name, $event.target.value)) {
          setSearchCategory(
            $event.target.name !== undefined ? $event.target.name : '',
          );
          setSearchTerm(
            $event.target.value !== undefined ? $event.target.value : '',
          );
          setAlertMessage('');
          setShowAlert(false);
        } else {
          setAlertMessage(setErrorMessage($event.target.name));
          setShowAlert(true);
        }
      }}
    />
  );
}
