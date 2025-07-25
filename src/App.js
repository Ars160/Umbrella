import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Profile from './pages/profile';
import Header from './components/Header';
import NotFound from './pages/NotFound';


function App() {
  const routs = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: < NotFound />,
      children: [
        { 
          path: "dashboard/",
          element: <BoardPage />
        },

        {
          path: "profile/",
          element: <Profile />
        }
      ]
    },
    {
      path: "/login",
      element: < LoginPage />
    },

    {
      path: "/register",
      element: < RegisterPage />
    }
  ])

  return(
    <RouterProvider router={routs} />
  )
}

export default App;
