import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { AuthContext } from '../../contexts/auth';
import { api } from '../../services/api';

const Agendar = () => {
  const [estabelecimento, setEstabelecimento] = useState([]);
  const [data, setData] = useState({
    data: '',
    empresa: '',
    description: '',
  });
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  function submit(e) {
    e.preventDefault();
    api
      .post('agendamento', {
        dataAgendamento: data.data,
        description: data.description,
        estabelecimentoId: data.empresa,
        userId: user.id,
      })
      .then((res) => {
        console.log(res.data);
        alert('Agendamento Adicionado com Sucesso!');
        navigate('/dashboard/agendamentos');
      })
      .catch((err) => {
        alert('Erro interno!');
      });
  }

  async function fetchData2() {
    await api.get('/estabelecimento/').then((response) => {
      setEstabelecimento(response.data);
    });
  }

  useEffect(() => {
    fetchData2();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col pl-80 pt-16">
        <h1 className="font-bold text-3xl pb-6">Agendar Inspeção</h1>
        <div className="flex flex-col text-blue-800 font-bold w-[80%]">
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label>
                Data:
                <input
                  type="date"
                  id="data"
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900"
                  placeholder="Data"
                  onChange={(e) => handle(e)}
                />
              </label>
              <label>
                Observação:
                <input
                  type="text"
                  id="description"
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900"
                  placeholder="Observação."
                  onChange={(e) => handle(e)}
                />
              </label>
              <label>
                Empresa:
                <select
                  name="empresa"
                  id="empresa"
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 font-bold text-blue-800"
                  onChange={(e) => handle(e)}
                >
                  <option>Selecione um estabelecimento</option>
                  {estabelecimento.map((item, key) => {
                    return (
                      <option
                        name={item.nomeFantasia}
                        key={key}
                        value={item.id}
                      >
                        {item.nomeFantasia}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div className="pb-4">
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-green-500 py-2 px-6 my-2 border-green-500 hover:bg-green-900"
                  onSubmit={(e) => submit(e)}
                >
                  Agendar
                </button>
                <button
                  className="bg-red-500 py-2 px-6 mx-2 my-2 border-red-500 hover:bg-red-900"
                  onClick={() => navigate('/dashboard/agendamentos')}
                >
                  Voltar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Agendar;
