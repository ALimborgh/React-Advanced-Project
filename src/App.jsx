import { Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventsPage } from './pages/EventsPage';
import { SeperetEvent } from './pages/SeperetEvent';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/events/:id" element={<SeperetEvent />} />
        <Route path="/" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}