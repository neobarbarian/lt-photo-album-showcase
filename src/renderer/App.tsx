import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PhotoAlbum from './PhotoAlbum/PhotoAlbumHome';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotoAlbum />} />
      </Routes>
    </Router>
  );
}
