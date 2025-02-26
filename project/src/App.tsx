import * as React from 'react';
import Home from './home';
import { UserProvider } from './UserContext';
import Login from './login';
import HeaderCom from './header';
import SignUp from './sign-up';
import { Outlet, Router } from 'react-router-dom';
import Recipes from './recipes';

export default function App() {
  return (

    <>
      <HeaderCom />
      <Recipes></Recipes>
      <Outlet />
    </>
  )
}
