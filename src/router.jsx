// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from './routes/Home';
import Community from './routes/Community/Community';
import CommunityWrite from './routes/Community/CommunityWrite/CommunityWrite';
import CommunityDetail from './routes/Community/CommunityDetail/CommunityDetail';
import OAuthSuccessPage from './routes/OAuth/OAuthSuccessPage';
import MyPage from './routes/mypage/MyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/community/:platform', element: <Community /> },
      { path: '/community/write', element: <CommunityWrite /> },
      { path: '/community/edit/:id', element: <CommunityWrite /> },
      { path: '/community/:platform/:id', element: <CommunityDetail /> },

      { path: '/mypage', element: <MyPage /> },

      { path: '/oauth/callback/success', element: <OAuthSuccessPage /> },
    ],
  },
]);

export default router;
