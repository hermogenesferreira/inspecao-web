import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

import { api } from '../../services/api';

const Insp = () => {
  const [insp, setInsp] = useState([]);
  const { inspecao } = useParams();
  async function fetchData() {
    await api.get(`/inspecao/${inspecao}`).then((response) => {
      setInsp(response.data);
      console.log(response.data);
    });
  }
  const RecursiveComponent = ({ name, description, pergunta, respostas }) => {
    const hasChildren = respostas && respostas.length;
    let campos;
    if (
      typeof pergunta?.cabecalho.name === 'string' &&
      pergunta?.cabecalho.name.includes('c')
    ) {
      campos = (
        <tr>
          <td className="border border-white text-center">
            {pergunta?.cabecalho.name}
          </td>
        </tr>
      );
    }
    if (typeof name === 'string' && name.includes('p')) {
      campos = (
        <tr className="border border-white">
          <td className="border border-white text-center">
            {pergunta?.cabecalho.description}
          </td>
          <td className="border border-white ">{pergunta?.description}</td>
          <td
            className={
              description === 'Sim'
                ? 'bg-green-500 text-center'
                : 'bg-red-500 text-center' && description === 'NA'
                ? 'bg-yellow-500 text-center'
                : 'bg-red-500 text-center'
            }
          >
            {description}
          </td>
        </tr>
      );
    }
    return (
      <>
        {campos}
        {hasChildren &&
          respostas.map((item) => (
            <RecursiveComponent key={item.name} {...item} />
          ))}
      </>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col pl-80 pt-20 pb-16">
        <h1 className="font-bold text-3xl pb-8">Visualizar Inspeção:</h1>
        <div className="flex flex-col text-white w-[90%]">
          <div className="bg-blue-500 rounded">
            <div className='flex flex-col text-3xl font-bold p-1"'>
              <table className="border-collapse border border-slate-400 text-2xl">
                <thead>
                  <tr>
                    <th className="border border-slate-300">Campos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td className="border">
                      Nome: {insp.estabelecimento?.nomeFantasia}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border">Motivo: {insp?.motivo}</td>
                  </tr>
                  <tr className="border">
                    <td className="border">Observação: {insp?.obs}</td>
                  </tr>
                  <tr className="border">
                    <td className="border">
                      Email: {insp.estabelecimento?.inscricaoEstadual}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border">
                      Telefone: {insp.estabelecimento?.telefone}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border">
                      Endereço: {insp.estabelecimento?.rua} Bairro:
                      {insp.estabelecimento?.bairro},
                      {insp.estabelecimento?.cidade}/{insp.estabelecimento?.uf}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border">
                      Alvara Localização:
                      {insp.estabelecimento?.alvaraLocalizacao}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border">
                      Alvara Sanitário: {insp.estabelecimento?.alvaraSanitario}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border">
                      CPF Responsável da empresa:{' '}
                      {insp.estabelecimento?.cpfResponsavel}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="border">
                      Inspeção realizada por:
                      {insp.user?.name}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="border-collapse border border-slate-400 text-2xl">
                <thead>
                  <tr>
                    <th className="border border-slate-300 ">Grupo</th>
                    <th className="border border-slate-300">Pergunta</th>
                    <th className="border border-slate-300 ">Resposta</th>
                  </tr>
                </thead>
                <tbody>
                  <RecursiveComponent {...insp} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Insp;
