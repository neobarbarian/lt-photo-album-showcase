export type AlbumInputProps = {
  name: string;
  setShowAlert: (showAlert: boolean) => void;
  setAlertMessage: (alertMessage: string) => void;
  setSearchCategory: (searchCategory: string) => void;
  setSearchTerm: (searchTerm: string) => void;
};
