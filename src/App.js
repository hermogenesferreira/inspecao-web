import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Forms from './pages/dashboard/Forms';
import Inspecao from './pages/dashboard/Inspecao';
import Register from './pages/Register';
import Insps from './pages/dashboard/Insps';
import Insp from './pages/dashboard/Insp';
import ErrorPage from './pages/ErrorPage';
import Estabelecimento from './pages/dashboard/Estabelecimento';
import Login from './pages/Login';
import About from './pages/About';
import Contato from './pages/Contato';
//import Teste from './pages/Teste';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/forms" element={<Forms />} />
        <Route path="/dashboard/inspecao/:roteiro" element={<Inspecao />} />
        <Route path="/dashboard/insps" element={<Insps />} />
        <Route path="/dashboard/insp/:inspecao" element={<Insp />} />
        <Route
          path="/dashboard/estabelecimento"
          element={<Estabelecimento />}
        />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/cadastrar" element={<Register />} />
        <Route exact path="/entrar" element={<Login />} />
        <Route exact path="/sobre" element={<About />} />
        <Route exact path="/contato" element={<Contato />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
