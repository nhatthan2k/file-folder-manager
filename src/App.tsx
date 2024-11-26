import './App.css';
import './index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import FileManager from './page/fileManager';
import DeleteFile from './page/deleteFile';
import ShareFile from './page/shareFile';
import AppLayout from './component/layout';
import Home from './page/home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="my-file" element={<FileManager />} />
          <Route path="delete-file" element={<DeleteFile />} />
          <Route path="share-file" element={<ShareFile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;