// src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Community from './routes/Community/Community';
import CommunityDetail from './routes/Community/CommunityDetail/CommunityDetail';
import CommunityWrite from './routes/Community/CommunityWrite/CommunityWrite';
import Home from './routes/Home';
import MyPage from './routes/mypage/MyPage';
import OAuthSuccessPage from './routes/OAuth/OAuthSuccessPage';
import Timer from './routes/Timer/Timer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/community', element: <Community /> },
      { path: '/community/write', element: <CommunityWrite /> },
      { path: '/community/edit/:id', element: <CommunityWrite /> },
      { path: '/community/:platform/:id', element: <CommunityDetail /> },

      { path: '/search', element: <Community /> },

      { path: '/timer', element: <Timer /> },

      { path: '/mypage', element: <MyPage /> },

      { path: '/oauth/callback/success', element: <OAuthSuccessPage /> },
    ],
  },
]);

export default router;
