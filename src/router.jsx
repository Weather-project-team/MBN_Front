// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './routes/Home';
import Community from './routes/Community/Community';
import CommunityWrite from './routes/Community/CommunityWrite/CommunityWrite';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/community/:platform', element: <Community /> },
      { path: '/community/write', element: <CommunityWrite /> },
    ],
  },
]);

export default router;
