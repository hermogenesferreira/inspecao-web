import { PencilIcon, PlusIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { api } from '../../services/api';

const Estabelecimento = () => {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [data, setData] = useState({
    id: '',
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    inscricaoEstadual: '',
    cnae: '',
    telefone: '',
    rua: '',
    bairro: '',
    cidade: '',
    uf: '',
    email: '',
    alvaraLocalizacao: '',
    alvaraSanitario: '',
    funcionarios: '',
    cpfResponsavel: '',
  });
  let navigate = useNavigate();

  async function fetchData2() {
    await api.get('/estabelecimento/').then((response) => {
      setEstabelecimentos(response.data);
    });
  }

  async function edit(e) {
    setHidden(false);
    await api.get(`/estabelecimento/${e}`).then((response) => {
      setData(response.data);
    });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  function update(e) {
    e.preventDefault();
    console.log(data);
    api
      .put(`/estabelecimento/${data.id}`, {
        razaoSocial: data.razaoSocial,
        nomeFantasia: data.nomeFantasia,
        cnpj: data.cnpj,
        inscricaoEstadual: data.inscricaoEstadual,
        cnae: data.cnae,
        telefone: data.telefone,
        rua: data.rua,
        bairro: data.bairro,
        cidade: data.cidade,
        uf: data.uf,
        email: data.email,
        alvaraLocalizacao: data.alvaraLocalizacao,
        alvaraSanitario: data.alvaraSanitario,
        funcionarios: data.funcionarios,
        cpfResponsavel: data.cpfResponsavel,
      })
      .then((res) => {
        console.log(res.data);
        alert('Empresa Atualizada com Sucesso!');
        document.location.reload(true);
      })
      .catch((err) => {
        alert('Erro interno!');
      });
  }
  useEffect(() => {
    fetchData2();
  }, []);
  return (
    <DashboardLayout>
      <div className="flex flex-col pl-80 pt-16">
        <div className={`${!hidden ? 'hidden' : 'visible'} pt-6`}>
          <h1 className="font-bold text-3xl pb-6 pt-6">Empresas Cadastradas</h1>
          <div className="flex flex-col text-white w-[90%]">
            <div className="bg-blue-500 rounded">
              <div className='flex flex-col text-3xl font-bold p-1"'>
                <table className="border-collapse border border-slate-400 text-2xl">
                  <thead>
                    <tr>
                      <th className="border border-slate-300 ...">#</th>
                      <th className="border border-slate-300 ...">
                        Estabelecimento
                      </th>
                      <th className="border border-slate-300 ...">Editar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {estabelecimentos.map((item, key) => (
                      <tr key={key}>
                        <td className="text-center border ">{item.id}</td>
                        <td className="border px-2 hover:bg-blue-800">
                          {item.nomeFantasia}
                        </td>
                        <td className="text-center border">
                          <button
                            className="bg-transparent border-none"
                            onClick={() => edit(item.id)}
                          >
                            <PencilIcon className="w-8 fill-yellow-500" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className={`${hidden ? 'hidden' : 'visible'} absolute pt-6`}>
          <h1 className="font-bold text-3xl pb-6">Atualizar empresa</h1>
          <div className="flex flex-col text-blue-800 font-bold w-[80%]">
            <div className="">
              <label>
                Raz??o Social:
                <input
                  type="text"
                  id="razaoSocial"
                  value={data.razaoSocial || ''}
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900"
                  placeholder="Raz??o Social"
                  onChange={(e) => handle(e)}
                />
              </label>
              <label>
                Nome Fantasia:
                <input
                  type="text"
                  id="nomeFantasia"
                  value={data.nomeFantasia || ''}
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                  placeholder="Nome Fantasia"
                  onChange={(e) => handle(e)}
                />
              </label>
              <div className="grid grid-cols-3 gap-4">
                <label>
                  CNPJ:
                  <input
                    type="text"
                    id="cnpj"
                    value={data.cnpj || ''}
                    required
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                    placeholder="CNPJ"
                    onChange={(e) => handle(e)}
                  />
                </label>
                <label>
                  Inscri????o Estadual:
                  <input
                    type="text"
                    id="inscricaoEstadual"
                    value={data.inscricaoEstadual || ''}
                    required
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                    placeholder="Inscri????o Estadual"
                    onChange={(e) => handle(e)}
                  />
                </label>
                <label>
                  CNAE:
                  <input
                    type="text"
                    id="cnae"
                    value={data.cnae || ''}
                    required
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                    placeholder="CNAE"
                    onChange={(e) => handle(e)}
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label>
                  Telefone:
                  <input
                    type="tel"
                    id="telefone"
                    value={data.telefone || ''}
                    required
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                    placeholder="Telefone"
                    onChange={(e) => handle(e)}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    id="email"
                    value={data.email || ''}
                    required
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                    placeholder="Email"
                    onChange={(e) => handle(e)}
                  />
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label>
                  Rua:
                  <input
                    type="text"
                    id="rua"
                    value={data.rua || ''}
                    required
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                    placeholder="Rua"
                    onChange={(e) => handle(e)}
                  />
                </label>
                <label>
                  Bairro:
                  <input
                    type="text"
                    id="bairro"
                    value={data.bairro || ''}
                    required
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                    placeholder="Bairro"
                    onChange={(e) => handle(e)}
                  />
                </label>
                <label>
                  Cidade:
                  <input
                    type="text"
                    id="cidade"
                    value={data.cidade || ''}
                    required
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                    placeholder="Cidade"
                    onChange={(e) => handle(e)}
                  />
                </label>
                <label>
                  Estado:
                  <select
                    name="uf"
                    id="uf"
                    value={data.uf || ''}
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 font-bold text-blue-800"
                    onChange={(e) => handle(e)}
                  >
                    <option value="AC" className="font-bold">
                      Acre
                    </option>
                    <option value="AL" className="font-bold">
                      Alagoas{' '}
                    </option>
                    <option value="AP" className="font-bold">
                      Amap??{' '}
                    </option>
                    <option value="AM" className="font-bold">
                      Amazonas{' '}
                    </option>
                    <option value="BA" className="font-bold">
                      Bahia
                    </option>
                    <option value="CE" className="font-bold">
                      Cear??
                    </option>
                    <option value="DF" className="font-bold">
                      Distrito Federal
                    </option>
                    <option value="ES" className="font-bold">
                      Esp??rito Santo{' '}
                    </option>
                    <option value="GO" className="font-bold">
                      Goi??s
                    </option>
                    <option value="MA" className="font-bold">
                      Maranh??o
                    </option>
                    <option value="MT" className="font-bold">
                      Mato Grosso
                    </option>
                    <option value="MS" className="font-bold">
                      Mato Grosso do Sul
                    </option>
                    <option value="MG" className="font-bold">
                      Minas Gerais
                    </option>
                    <option value="PA" className="font-bold">
                      Par??
                    </option>
                    <option value="PB" className="font-bold">
                      Para??ba
                    </option>
                    <option value="PR" className="font-bold">
                      Paran??
                    </option>
                    <option value="PE" className="font-bold">
                      Pernambuco
                    </option>
                    <option value="PI" className="font-bold">
                      Piau??
                    </option>
                    <option value="RJ" className="font-bold">
                      Rio de Janeiro
                    </option>
                    <option value="RN" className="font-bold">
                      Rio Grande do Norte
                    </option>
                    <option value="RS" className="font-bold">
                      Rio Grande do Sul
                    </option>
                    <option value="RO" className="font-bold">
                      Rond??nia
                    </option>
                    <option value="RR" className="font-bold">
                      Roraima
                    </option>
                    <option value="SC" className="font-bold">
                      Santa Catarina
                    </option>
                    <option value="SP" className="font-bold">
                      S??o Paulo
                    </option>
                    <option value="SE" className="font-bold">
                      Sergipe
                    </option>
                    <option value="TO" className="font-bold">
                      Tocantins
                    </option>
                  </select>
                </label>
              </div>

              <label>
                Alvara Localiza????o:
                <input
                  type="text"
                  id="alvaraLocalizacao"
                  value={data.alvaraLocalizacao || ''}
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                  placeholder="Alvara Localiza????o"
                  onChange={(e) => handle(e)}
                />
              </label>
              <label>
                Alvara Sanit??rio:
                <input
                  type="text"
                  id="alvaraSanitario"
                  value={data.alvaraSanitario || ''}
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                  placeholder="Alvara Sanit??rio"
                  onChange={(e) => handle(e)}
                />
              </label>
              <label>
                Numero de Funcionarios:
                <input
                  type="number"
                  id="funcionarios"
                  value={data.funcionarios || ''}
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                  placeholder="Numero de Funcionarios"
                  onChange={(e) => handle(e)}
                />
              </label>
              <label>
                CPF do respons??vel:
                <input
                  type="text"
                  id="cpfResponsavel"
                  value={data.cpfResponsavel || ''}
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                  placeholder="CPF do respons??vel"
                  onChange={(e) => handle(e)}
                />
              </label>
            </div>
            <div className="pb-4">
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-green-500 py-2 px-6 my-2 border-green-500 hover:bg-green-900"
                  onClick={(e) => update(e)}
                >
                  Atualizar
                </button>
                <button
                  type="button"
                  className="bg-red-500 py-2 px-6 mx-2 my-2 border-red-500 hover:bg-red-900"
                  onClick={() => setHidden(true)}
                >
                  Voltar
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${
            !hidden ? 'hidden' : 'visible'
          } flex justify-end items-end bottom-0 right-0 absolute px-16 py-16`}
        >
          <Link to="/dashboard/addestabelecimento">
            <button className="rounded-full h-20 w-20">
              <PlusIcon />
            </button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Estabelecimento;
