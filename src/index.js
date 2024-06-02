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
import TabelaSalas from './Paginas/Salas/TabelaSalas.jsx';
import EditarSalas from './Paginas/Salas/EditarSalas.jsx';
import TabelaPlanos from './Paginas/Planos/TabelaPlanos.jsx';
import EditarPlanos from './Paginas/Planos/EditarPlanos.jsx';
import TabelaHorarios from './Paginas/Horarios/TabelaHorarios.jsx';
import EditarHorario from './Paginas/Horarios/EditarHorario.jsx';
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
        },
        {
          path: '/buscar/salas',
          element:<TabelaSalas></TabelaSalas>
        },
        {
          path: '/editar/sala/:id',
          element:<EditarSalas></EditarSalas>
        },
        {
          path: '/buscar/planos',
          element:<TabelaPlanos></TabelaPlanos>
        },
        {
          path: '/editar/planos/:id',
          element: <EditarPlanos></EditarPlanos>
        },
        {
          path: '/buscar/horarios',
          element: <TabelaHorarios></TabelaHorarios>
        },
        {
          path:'/editar/horarios/:id',
          element: <EditarHorario></EditarHorario>
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
