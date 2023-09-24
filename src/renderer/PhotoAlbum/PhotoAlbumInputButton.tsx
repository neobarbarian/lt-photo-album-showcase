/* PhotoAlbumInputButton.tsx */

import { Button } from 'react-bootstrap';
import { InputButtonProps } from '../../models/component-props/input-button';

export default function PhotoAlbumInputButton(props: InputButtonProps) {
  const { name, label, setSearchCategory, setSearchTerm } = props;
  const partnerTextInput = document.getElementsByName(
    name,
  )[0] as HTMLInputElement;

  return (
    <Button
      variant="primary"
      disabled={partnerTextInput?.value.length === 0}
      onClick={() => {
        if (partnerTextInput) {
          partnerTextInput.value = '';
        }
        setSearchTerm('');
        setSearchCategory(name);
      }}
      aria-label={`Clear the ${label} search field.`}
    >
      Clear
    </Button>
  );
}
