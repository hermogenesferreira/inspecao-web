import { PlusIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { api } from '../../services/api';

const Agendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  async function fetchAgendamentos() {
    await api.get('/agendamento').then((response) => {
      setAgendamentos(response.data);
      console.log(response.data);
    });
  }

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col pl-80 pt-20">
        <h1 className="font-bold text-3xl pb-8">Agendamentos</h1>
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 overflow-hidden md:grid-cols-2 sm:grid-cols-1 gap-3 text-white text-2xl font-bold text-center px-5">
          {agendamentos.map((item, key) => {
            return (
              <div key={key} className="rounded shadow-lg bg-blue-500 pb-4">
                <div className="rounded shadow-lg bg-blue-800 py-2">
                  <p>Empresa: {item.estabelecimento.nomeFantasia}</p>
                  <p>Agente: {item.user.name}</p>

                  <p>
                    Data:
                    {new Date(item.dataAgendamento).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <p className="pt-2">Rua: {item.estabelecimento.rua}</p>
                <p>Bairro: {item.estabelecimento.bairro}</p>
                <p>Cidade: {item.estabelecimento.cidade}</p>
              </div>
            );
          })}
        </div>
        <div className="flex justify-end items-end bottom-0 right-0 absolute px-16 py-16">
          <Link to="/dashboard/agendar">
            <button className="rounded-full h-20 w-20">
              <PlusIcon />
            </button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Agendamentos;
