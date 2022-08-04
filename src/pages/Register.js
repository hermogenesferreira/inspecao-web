import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';

import { api } from '../services/api';
import HomeLayout from '../components/HomeLayout';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  let navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    api
      .post('users', {
        name: data.name,
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        alert('Usuário Criado com Sucesso!');
        navigate('/entrar');
      })
      .catch((err) => {
        alert('Erro interno!');
      });
  }

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }

  return (
    <HomeLayout>
      <div>
        <div className="grid h-screen place-items-center">
          <div className="max-w-md w-full space-y-8 rounded-md px-4 border-2 border-indigo-200">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
                Formulário de Cadastro
              </h2>
            </div>
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={(e) => submit(e)}
            >
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="Nome" className="sr-only">
                    Nome
                  </label>
                  <input
                    id="name"
                    name="{data.name}"
                    type="text"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Nome"
                    onChange={(e) => handle(e)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    name="{data.email}"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Email"
                    onChange={(e) => handle(e)}
                  />
                </div>
                <div>
                  <label htmlFor="senha" className="sr-only">
                    Senha
                  </label>
                  <input
                    id="senha"
                    name="{data.senha}"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Senha"
                    onChange={(e) => handle(e)}
                  />
                </div>
                <div>
                  <label htmlFor="confirmar" className="sr-only">
                    Confirmar Senha
                  </label>
                  <input
                    id="confirmar"
                    name="{data.confirmar}"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Confirmar Senha"
                    onChange={(e) => handle(e)}
                  />
                </div>
              </div>

              <div className="place-items-center">
                <div className="text-sm text-center">
                  <p>Possui cadastro?</p>
                  <p className="font-medium text-blue-500 hover:text-blue-400">
                    <Link to="/entrar">Fazer Login</Link>
                  </p>
                </div>
              </div>
              <div className="pb-4">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-blue-700 group-hover:text-blue-400"
                      aria-hidden="true"
                    />
                  </span>
                  Cadastrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Register;
