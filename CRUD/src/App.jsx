import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Edit from "./components/Edit";
import User from "./components/User";
import New from "./components/New";
import Statistic from './components/Statistic';
import Sem from './components/Sem'; 
import Mark from './components/Mark';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <User />
    },
    {
      path: "/edit/:id",
      element: <Edit />
    },
    {
      path: "/new",
      element: <New />
    },
    {
      path: "/statistic/sem/:semester/:id/:name/mark",
      element: <Mark /> 
    },
    {
      path: "/statistic/sem/:semester/:id/:name",
      element: <Sem />
    },
    {
      path: "/statistic/:id/:name",
      element: <Statistic />
    },
    {
      path: "*",
      element: <div>404 Not Found</div>
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;