import { createBrowserRouter, type RouteObject } from 'react-router';

import { ROUTE_PATHS } from './path';

import RootLayout from '@/layouts/RootLayout';
import ScatterPage from '@/pages/ScatterDataPage';
import TreeVisualization from '@/pages/TreeVisualization';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        path: ROUTE_PATHS.SCATTER_PAGE,
        element: <ScatterPage />,
      },
      {
        path: ROUTE_PATHS.TREE_VISUALIZATION,
        element: <TreeVisualization />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
