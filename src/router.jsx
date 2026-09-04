import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Customize from './pages/Customize';
import About from './pages/About';
import GalleryPage from './pages/GalleryPage';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'packages',
        element: <Packages />,
      },
      {
        path: 'packages/:slug',
        element: <PackageDetail />,
      },
      {
        path: 'customize',
        element: <Customize />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'gallery',
        element: <GalleryPage />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
