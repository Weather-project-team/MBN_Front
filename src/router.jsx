// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './routes/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [{ index: true, element: <Home /> }],
  },
]);

export default router;
