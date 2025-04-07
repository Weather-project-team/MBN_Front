// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './routes/Home';
import Community from './routes/Community';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/community/:platform', element: <Community /> },
    ],
  },
]);

export default router;
