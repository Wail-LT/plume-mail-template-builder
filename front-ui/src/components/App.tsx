import Editor from '@components/pages/editor/Editor';
import React, { useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Logger } from 'simple-logging-system';
import Layout from '@components/layout/preview-layout/Layout';
import ErrorPage from '@components/pages/ErrorPage';
import Home from '@components/pages/Home';

const logger = new Logger('App');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Outlet /></Layout>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'preview/:templateId',
        element: <div>preview</div>,
      },
    ],
  },
  {
    path: 'editor',
    element: <Layout><Outlet /></Layout>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Editor/>,
      },
    ],
  },
]);

export default function App() {
  logger.info('Render App');
  return <RouterProvider router={router} />;
}
