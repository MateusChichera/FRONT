import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NavBar from './Componentes/NavBar';
import Salas from './Paginas/Salas/Salas.jsx';
import Horarios from './Paginas/Horarios/Horarios.jsx';
import Planos from './Paginas/Planos/Planos.jsx';
import Clientes from  './Paginas/Clientes/Clientes.jsx'
import TabelaClientes from './Paginas/Clientes/TabelaClientes.jsx';
import Editar from './Paginas/Clientes/Editar.jsx';
const router =createBrowserRouter(
  [
    {
      //Componente Padrão
      element:<NavBar></NavBar>,
      children:[
        {
          path:'/',
          element:<App></App>
        },
        {
          path:'/salas',
          element:<Salas></Salas>
        },
        {
          path:'/Horarios',
          element:<Horarios></Horarios>
        },
        {
          path:'/clientes',
          element:<Clientes></Clientes>
        },
        {
          path:'/planos',
          element:<Planos></Planos>
        },
        {
          path: '/buscar',
          element:<TabelaClientes></TabelaClientes>
        },
        {
          path: '/editar/:id',
          element:<Editar></Editar>
        }

      ]
    }
  ]
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router}>

   </RouterProvider>
  </React.StrictMode>
);

reportWebVitals();
