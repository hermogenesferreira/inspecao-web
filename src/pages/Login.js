import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/solid';
import { api, CreateSession } from '../services/api';
import HomeLayout from '../components/HomeLayout';
import { AuthContext } from '../contexts/auth';
import { useContext } from 'react';

const Login = () => {
  const { authenticated, user, login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    login(email, password).then().catch(setErro('Email ou senha invalidos!'));
  };

  return (
    <HomeLayout>
      <div>
        <div className="grid h-screen place-items-center">
          <div className="max-w-md w-full space-y-8 rounded-md px-4 border-2 border-indigo-200">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-blue-500">
                Entrar
              </h2>
            </div>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <input
                  name="email"
                  type="email"
                  value={email}
                  required
                  className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  value={password}
                  required
                  className="rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="place-items-center">
              <div className="text-1xl font-bold text-red-500 text-center">
                {erro}
              </div>
              <div className="text-sm text-center">
                <p>Não Possui cadastro?</p>
                <p className="font-medium text-blue-500 hover:text-blue-400">
                  <Link to="/cadastrar">Cadastre-se</Link>
                </p>
              </div>
            </div>
            <div className="pb-4">
              <button
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                onClick={handleLogin}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-blue-700 group-hover:text-blue-400"
                    aria-hidden="true"
                  />
                </span>
                Acessar
              </button>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Login;
