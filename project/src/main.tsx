import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './home.tsx'
import Login from './login.tsx'
import Recipes from './recipes.tsx'
import SignUp from './sign-up.tsx'
import Addrecipes from './addRecipe.tsx'
import { UserProvider } from './UserContext.tsx'
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Navigate to="/home"></Navigate>,
      },
    ],
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        path: "login",
        element: <Login />,
      },

      { path: "recipes", element: <Recipes /> },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  { path: "signin", element: <SignUp /> },
  { path: "addrecipe", element: <Addrecipes /> },
  { path: "recipes", element: <Recipes /> },

]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={Routes} />
    </UserProvider>
  </StrictMode>,
)
