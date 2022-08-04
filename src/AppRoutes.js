import React from 'react';
import { useContext } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthContext, AuthProvider } from './contexts/auth';
import carregando from './assets/carregando.jpg';

import About from './pages/About';
import Contato from './pages/Contato';
import Agendamentos from './pages/dashboard/Agendamentos';
import Agendar from './pages/dashboard/Agendar';
import Dashboard from './pages/dashboard/Dashboard';
import Estabelecimento from './pages/dashboard/Estabelecimento';
import Forms from './pages/dashboard/Forms';
import Insp from './pages/dashboard/Insp';
import Inspecao from './pages/dashboard/Inspecao';
import Insps from './pages/dashboard/Insps';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddEstabelecimento from './pages/dashboard/AddEstabelecimento';

const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return (
        <div>
          <img
            src={carregando}
            alt="imagem de carregamento"
            className={`cursor-pointer py-8 px-2 duration-500`}
          />
        </div>
      );
    }

    if (!authenticated) {
      return <Navigate to="/entrar" />;
    }
    return children;
  };
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Private>
                <Dashboard />
              </Private>
            }
          />
          <Route
            path="/dashboard/forms"
            element={
              <Private>
                <Forms />
              </Private>
            }
          />
          <Route
            path="/dashboard/inspecao/:roteiro"
            element={
              <Private>
                <Inspecao />
              </Private>
            }
          />
          <Route
            path="/dashboard/insps"
            element={
              <Private>
                <Insps />
              </Private>
            }
          />
          <Route
            path="/dashboard/agendamentos"
            element={
              <Private>
                <Agendamentos />
              </Private>
            }
          />
          <Route
            path="/dashboard/agendar"
            element={
              <Private>
                <Agendar />
              </Private>
            }
          />

          <Route
            path="/dashboard/insp/:inspecao"
            element={
              <Private>
                <Insp />
              </Private>
            }
          />
          <Route
            path="/dashboard/estabelecimento"
            element={
              <Private>
                <Estabelecimento />
              </Private>
            }
          />
          <Route
            path="/dashboard/addestabelecimento"
            element={
              <Private>
                <AddEstabelecimento />
              </Private>
            }
          />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/cadastrar" element={<Register />} />
          <Route exact path="/entrar" element={<Login />} />
          <Route exact path="/sobre" element={<About />} />
          <Route exact path="/contato" element={<Contato />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
