import React, { useEffect, useState, useContext } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { api } from '../../services/api';

import { AuthContext } from '../../contexts/auth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [insps, setInsps] = useState([]);
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [agendamentos, setAgendamentos] = useState([]);
  const { user } = useContext(AuthContext);
  async function fetchInsps() {
    await api.get('/inspecao').then((response) => {
      setInsps(response.data);
    });
  }

  async function fetchEstabelecimentos() {
    await api.get('/estabelecimento').then((response) => {
      setEstabelecimentos(response.data);
    });
  }

  async function fetchUsuarios() {
    await api.get('/users').then((response) => {
      setUsuarios(response.data);
    });
  }

  async function fetchAgendamentos() {
    await api.get('/agendamento').then((response) => {
      setAgendamentos(response.data);
    });
  }

  const impressoes = insps.length * 11;
  const valorEconomizado = impressoes * 0.05;

  useEffect(() => {
    fetchInsps();
    fetchEstabelecimentos();
    fetchUsuarios();
    fetchAgendamentos();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col pl-80 pt-20">
        <h1 className="font-bold text-2xl pb-8">Olá {user?.name},</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 overflow-hidden md:grid-cols-2 sm:grid-cols-1 gap-3 w-4/5 text-white text-2xl font-bold text-center">
          <Link to="/dashboard/insps">
            <div className="rounded shadow-lg bg-blue-500 py-4 px-4 hover:bg-blue-600">
              Inspeções Realizadas:
              <p>{insps.length}</p>
            </div>
          </Link>
          <div className="rounded shadow-lg bg-blue-500 py-4 px-4 ">
            Agentes Cadastrados:
            <p>{usuarios.length}</p>
          </div>
          <Link to="/dashboard/agendamentos">
            <div className="rounded shadow-lg bg-blue-500 py-4 px-4 hover:bg-blue-600">
              Inspeções Agendadas:
              <p>{agendamentos.length}</p>
            </div>
          </Link>
          <Link to="/dashboard/estabelecimento">
            <div className="rounded shadow-lg bg-blue-500 py-4 px-4 hover:bg-blue-600">
              Empresas Cadastradas:
              <p>{estabelecimentos.length}</p>
            </div>
          </Link>
          <div className="rounded shadow-lg bg-blue-500 py-4 px-4 ">
            Impressões evitadas:
            <p>{impressoes}</p>
          </div>
          <div className="rounded shadow-lg bg-blue-500 py-4 px-4 ">
            Valor Economizado:
            <p>
              {valorEconomizado.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
