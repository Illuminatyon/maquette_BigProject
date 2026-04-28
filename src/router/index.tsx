import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { HomePage }      from '../pages/HomePage';
import { CategoryPage }  from '../pages/CategoryPage';
import { ProductPage }   from '../pages/ProductPage';
import { CartPage }      from '../pages/CartPage';
import { AccountPage }   from '../pages/AccountPage';
import { ContactPage }   from '../pages/ContactPage';
import { AboutPage }     from '../pages/AboutPage';
import { ChatbotPage }   from '../pages/ChatbotPage';
import { NotFoundPage }  from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true,                   element: <HomePage />      },
      { path: 'category/:slug',        element: <CategoryPage />  },
      { path: 'product/:slug',         element: <ProductPage />   },
      { path: 'cart',                  element: <CartPage />      },
      { path: 'account',               element: <AccountPage />   },
      { path: 'contact',               element: <ContactPage />   },
      { path: 'about',                 element: <AboutPage />     },
      { path: 'chatbot',               element: <ChatbotPage />   },
      { path: '*',                     element: <NotFoundPage />  },
    ],
  },
]);
