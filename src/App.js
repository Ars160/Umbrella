import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import Profile from './pages/profile';
import Header from './components/Header';
import NotFound from './pages/NotFound';
import ProjectsPage from './pages/ProjectsPage';
import EditProjectPage from './pages/EditProjectPage';
import EditTaskPage from './pages/EditTaskPage';
import TaskItem from './pages/TaskItem';



function App() {
  const routs = createBrowserRouter([
    {
      path: "/",
      element: <Header />,
      errorElement: < NotFound />,
      children: [
        { 
          path: "project/:projectId",
          element: <BoardPage />
        },

        {
          path: "projects/",
          element: <ProjectsPage />
        },

        {
          path: "projects/:id/edit",
          element: <EditProjectPage />,
        },
        
        {
          path: "task/:taskId/edit",
          element: <EditTaskPage />,
        },

        {
          path: "task/:taskId",
          element: <TaskItem />
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
