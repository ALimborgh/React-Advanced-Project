import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventsPage } from './pages/EventsPage';
import { SeperetEvent } from './pages/SeperetEvent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/events/:id" element={<SeperetEvent />} />
        <Route path="/" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}