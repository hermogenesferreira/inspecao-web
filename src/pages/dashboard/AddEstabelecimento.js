import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { api } from '../../services/api';

const AddEstabelecimento = () => {
  const [data, setData] = useState({
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

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  function submit(e) {
    e.preventDefault();
    api
      .post('estabelecimento', {
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
        alert('Empresa Adicionada com Sucesso!');
        navigate('/dashboard/estabelecimento');
      })
      .catch((err) => {
        alert('Erro interno!');
      });
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col pl-80 pt-16">
        <h1 className="font-bold text-3xl pb-6">Cadastrar empresa</h1>
        <div className="flex flex-col text-blue-800 font-bold w-[80%]">
          <form className="space-y-6" onSubmit={submit}>
            <div className="">
              <label>
                Razão Social:
                <input
                  type="text"
                  id="razaoSocial"
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900"
                  placeholder="Razão Social"
                  onChange={(e) => handle(e)}
                />
              </label>
              <label>
                Nome Fantasia:
                <input
                  type="text"
                  id="nomeFantasia"
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
                    required
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                    placeholder="CNPJ"
                    onChange={(e) => handle(e)}
                  />
                </label>
                <label>
                  Inscrição Estadual:
                  <input
                    type="text"
                    id="inscricaoEstadual"
                    required
                    className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                    placeholder="Inscrição Estadual"
                    onChange={(e) => handle(e)}
                  />
                </label>
                <label>
                  CNAE:
                  <input
                    type="text"
                    id="cnae"
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
                      Amapá{' '}
                    </option>
                    <option value="AM" className="font-bold">
                      Amazonas{' '}
                    </option>
                    <option value="BA" className="font-bold">
                      Bahia
                    </option>
                    <option value="CE" className="font-bold">
                      Ceará
                    </option>
                    <option value="DF" className="font-bold">
                      Distrito Federal
                    </option>
                    <option value="ES" className="font-bold">
                      Espírito Santo{' '}
                    </option>
                    <option value="GO" className="font-bold">
                      Goiás
                    </option>
                    <option value="MA" className="font-bold">
                      Maranhão
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
                      Pará
                    </option>
                    <option value="PB" className="font-bold">
                      Paraíba
                    </option>
                    <option value="PR" className="font-bold">
                      Paraná
                    </option>
                    <option value="PE" className="font-bold">
                      Pernambuco
                    </option>
                    <option value="PI" className="font-bold">
                      Piauí
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
                      Rondônia
                    </option>
                    <option value="RR" className="font-bold">
                      Roraima
                    </option>
                    <option value="SC" className="font-bold">
                      Santa Catarina
                    </option>
                    <option value="SP" className="font-bold">
                      São Paulo
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
                Alvara Localização:
                <input
                  type="text"
                  id="alvaraLocalizacao"
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                  placeholder="Alvara Localização"
                  onChange={(e) => handle(e)}
                />
              </label>
              <label>
                Alvara Sanitário:
                <input
                  type="text"
                  id="alvaraSanitario"
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                  placeholder="Alvara Sanitário"
                  onChange={(e) => handle(e)}
                />
              </label>
              <label>
                Numero de Funcionarios:
                <input
                  type="number"
                  id="funcionarios"
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                  placeholder="Numero de Funcionarios"
                  onChange={(e) => handle(e)}
                />
              </label>
              <label>
                CPF do responsável:
                <input
                  type="text"
                  id="cpfResponsavel"
                  required
                  className="rounded-md px-3 w-full py-1 border border-gray-300 placeholder-gray-500 text-gray-900 "
                  placeholder="CPF do responsável"
                  onChange={(e) => handle(e)}
                />
              </label>
            </div>
            <div className="pb-4">
              <div className="flex justify-start">
                <button
                  type="submit"
                  className="bg-green-500 py-2 px-6 my-2 border-green-500 hover:bg-green-900"
                  onSubmit={(e) => submit(e)}
                >
                  Cadastrar
                </button>
                <button
                  className="bg-red-500 py-2 px-6 mx-2 my-2 border-red-500 hover:bg-red-900"
                  onClick={() => navigate('/dashboard/estabelecimento')}
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

export default AddEstabelecimento;
