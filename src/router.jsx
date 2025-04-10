// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './routes/Home';
import Community from './routes/Community/Community';
import CommunityWrite from './routes/Community/CommunityWrite/CommunityWrite';
import CommunityDetail from './routes/Community/CommunityDetail/CommunityDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/community/:platform', element: <Community /> },
      { path: '/community/write', element: <CommunityWrite /> },
      { path: '/community/:platform/:id', element: <CommunityDetail /> },
    ],
  },
]);

export default router;
