import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App.jsx';
import './index.css';
import Customtheme from './Components/custom/customTheme.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={Customtheme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
