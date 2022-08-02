import { UsersIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import api from '../../services/api';

const Dashboard = () => {
  const [insps, setInsps] = useState([]);
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

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

  const impressoes = insps.length * 11;
  const valorEconomizado = impressoes * 0.05;

  useEffect(() => {
    fetchInsps();
    fetchEstabelecimentos();
    fetchUsuarios();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col pl-8 pt-20">
        <h1 className="font-bold text-2xl pb-8">Olá Usuário,</h1>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 overflow-hidden md:grid-cols-2 sm:grid-cols-1 gap-3 w-4/5 text-white text-2xl font-bold text-center">
          <div className="rounded shadow-lg bg-blue-500 py-4 px-4">
            Inspeções Realizadas:
            <p>{insps.length}</p>
          </div>
          <div className="rounded shadow-lg bg-blue-500 py-4 px-4">
            Agentes Cadastrados:
            <p>{usuarios.length}</p>
          </div>
          <div className="rounded shadow-lg bg-blue-500 py-4 px-4">
            Empresas Cadastradas:
            <p>{estabelecimentos.length}</p>
          </div>
          <div className="rounded shadow-lg bg-blue-500 py-4 px-4">
            Impressões evitadas:
            <p>{impressoes}</p>
          </div>
          <div className="rounded shadow-lg bg-blue-500 py-4 px-4">
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
