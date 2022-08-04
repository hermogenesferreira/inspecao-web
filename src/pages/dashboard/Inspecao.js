import React, { useContext, useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link, useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { api } from '../../services/api';
import { AuthContext } from '../../contexts/auth';

const Inspecao = () => {
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(false);
  const [dados, setDados] = useState([]);
  const [respostas, setRespostas] = useState([]);
  const [relatorio, setRelatorio] = useState([]);
  const [textArea, setTextArea] = useState('Insira aqui as observações.');
  const [estabelecimento, setEstabelecimento] = useState([]);
  const navigate = useNavigate();
  let { roteiro } = useParams();
  const { user } = useContext(AuthContext);

  const renderError = (message) => <p className="help is-danger">{message}</p>;

  const validationSchema = Yup.object({
    respostas: Yup.string().required(),
    email: Yup.string().email().required(),
    title: Yup.string().required(),
    review: Yup.string().required(),
    rating: Yup.number().min(1).max(10).required(),
    wouldRecommend: Yup.boolean().default(false),
  });

  function handleSubmit(data) {
    var i = 0;
    for (var prop in data.respostas) {
      respostas.push({
        name: Object.entries(data.respostas)[i][0],
        description: Object.entries(data.respostas)[i][1].split(' ')[0],
        perguntaId: Object.entries(data.respostas)[i][1].split(' ')[1],
      });
      i++;
    }
    api
      .post('inspecao', {
        motivo: dados[0],
        estabelecimentoId: dados[1],
        roteiroId: relatorio.id,
        respostas: respostas,
        userId: user.id,
        obs: textArea,
      })
      .then((res) => {
        alert('Inspeção Realizada com Sucesso!');
        navigate('/dashboard/insps');
      })
      .catch((err) => {
        alert('Erro interno!');
      });
  }

  async function fetchData() {
    await api.get(`/roteiro/${roteiro}`).then((response) => {
      setRelatorio(response.data);
    });
  }
  async function fetchData2() {
    await api.get('/estabelecimento/').then((response) => {
      setEstabelecimento(response.data);
    });
  }
  const RecursiveComponent = ({
    id,
    name,
    description,
    cabecalhos,
    perguntas,
  }) => {
    const hasChildren = cabecalhos && cabecalhos.length;
    const hasAsChildren = perguntas && perguntas.length;
    let campos;
    if (
      (typeof name === 'string' && name.includes('c')) ||
      (typeof name === 'string' && name.includes('Rote'))
    ) {
      campos = (
        <tr>
          <td className="border border-white text-center">{description}</td>
        </tr>
      );
    } else {
      campos = (
        <tr className="border border-white">
          <td className="border border-white px-4">{description}</td>
          <td className="border text-center">
            <Field
              type="radio"
              name={`respostas.${name}`}
              value={`Sim ${id}`}
            />
            <ErrorMessage name={`respostas.${name}`} render={renderError} />
          </td>
          <td className="border text-center">
            <Field
              type="radio"
              name={`respostas.${name}`}
              value={`Não ${id}`}
            />
          </td>
          <td className="border text-center">
            <Field type="radio" name={`respostas.${name}`} value={`NA ${id}`} />
          </td>
        </tr>
      );
    }
    return (
      <>
        {campos}
        {hasChildren &&
          cabecalhos.map((item) => (
            <RecursiveComponent key={item.name} {...item} />
          ))}
        {hasAsChildren &&
          perguntas.map((item) => (
            <RecursiveComponent key={item.name} {...item} />
          ))}
      </>
    );
  };

  function multStep(num) {
    switch (num) {
      case 1:
        setOpen1(true);
        setOpen2(false);
        break;
      case 2:
        setOpen2(true);
        setOpen1(false);
        break;
      default:
        break;
    }
  }

  function handleChange(e) {
    let value = e.target.value;
    setDados((dados) => [...dados, value]);
  }

  function handleChangeTextArea(e) {
    setTextArea(e.target.value);
    console.log(e.target.value);
  }

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col pl-80 pt-20">
        <h1 className="font-bold text-3xl pb-8">Realizar Inspeção</h1>
        <h2 className="font-bold text-2xl pb-8">Roteiro: {relatorio.name}</h2>
        <div className="flex flex-col text-white w-[90%]">
          <div className="bg-blue-500 rounded">
            <ul className="flex items-center justify-between text-3xl font-bold p-1">
              <li
                className={`flex justify-center px-6 ${
                  open1 && 'text-yellow-400'
                } `}
                onClick={() => multStep(1)}
              >
                1 . Dados Iniciais
              </li>
              <li
                className={`flex justify-center px-6 ${
                  open2 && 'text-yellow-400'
                } `}
                onClick={() => multStep(2)}
              >
                2 . Formulário
              </li>
            </ul>
          </div>
          <div
            className={`${
              !open1 && 'hidden'
            } duration-200 bg-white font-bold pt-1 rounded`}
          >
            <div className="bg-blue-500 rounded text-2xl px-4">
              <label htmlFor="description">Motivo da Inpeção:</label>
              <select
                name="description"
                className="bg-blue-500 text-2xl font-bold"
                onChange={(e) => handleChange(e)}
              >
                <option>Selecione um Motivo</option>
                <option value="Solicitação de Licença Sanitária">
                  Solicitação de Licença Sanitária
                </option>
                <option value="Verificação ou apuração de denúncia">
                  Verificação ou apuração de denúncia
                </option>
                <option value="Inspeção programada">
                  Inspeção programada{' '}
                </option>
                <option value="Renovação de licença sanitária">
                  Renovação de licença sanitária
                </option>
                <option value="Outros">Outros </option>
              </select>
              <label htmlFor="estabelecimentoId">Estabelecimento:</label>
              <select
                name="estabelecimentoId"
                className="bg-blue-500 text-2xl font-bold"
                onChange={(e) => handleChange(e)}
              >
                <option>Selecione um Estabelecimento</option>
                {estabelecimento.map((item, key) => {
                  return (
                    <option name={item.nomeFantasia} key={key} value={item.id}>
                      {item.nomeFantasia}
                    </option>
                  );
                })}
              </select>
              <p className="mb-4">Observações:</p>
              <textarea
                className="resize rounded-md mb-3  w-full h-44 text-blue-800"
                id="message"
                name="message"
                value={textArea}
                onChange={handleChangeTextArea}
              />
            </div>
          </div>
          <div
            className={`${
              !open2 && 'hidden'
            } duration-200 bg-white font-bold pt-1 rounded`}
          >
            <div className="bg-blue-500 rounded text-2xl mb-6">
              <Formik
                initialValues={{
                  respostas: {},
                }}
                onSubmit={async (values) => {
                  await new Promise((r) => setTimeout(r, 500));
                  handleSubmit(values);
                }}
              >
                <Form>
                  <table className="min-w-full border-collapse border border-white">
                    <thead>
                      <tr>
                        <th className="border border-white px-2">Itens</th>
                        <th className="border border-white px-2">Sim</th>
                        <th className="border border-white px-2">Não</th>
                        <th className="border border-white px-2">NA*</th>
                      </tr>
                    </thead>
                    <tbody>
                      <RecursiveComponent {...relatorio} />
                    </tbody>
                  </table>
                  <div className="flex justify-end font-bold text-2xl">
                    <button
                      type="submit"
                      className="bg-green-500 py-2 px-6 mx-4 my-4 border-green-500"
                    >
                      Enviar
                    </button>
                    <Link to="/dashboard/insps">
                      <button
                        type="button"
                        className="bg-red-500 py-2 px-6 mx-4 my-4  border-red-500"
                      >
                        Cancelar
                      </button>
                    </Link>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inspecao;
