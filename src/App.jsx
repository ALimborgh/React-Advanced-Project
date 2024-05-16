import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EventsPage } from './pages/EventsPage';
import { SeparateEvent } from './pages/SeparateEvent';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EditEventForm } from './components/EditEventForm';
import { ChakraProvider, extendTheme, Box, CSSReset } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: "gray.800",
        color: "white",
      },
    },
  },
});

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box minH="100vh">
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/events/:id" element={<SeparateEvent />} />
            <Route path="/" element={<EventsPage />} />
            <Route path="/event/:id/edit" element={<EditEventForm/>}/>
          </Routes>
        </Router>
      </Box>
    </ChakraProvider>
  );
};