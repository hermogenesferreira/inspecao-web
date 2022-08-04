import { ClipboardIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import { api } from '../../services/api';

const Forms = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    api.get('categorias/').then((response) => {
      setCategorias(response.data);
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col pl-80 pt-20">
        <h1 className="font-bold text-3xl pb-8">Roteiros para Autoinspeção</h1>
        <h1 className="font-bold text-2xl pb-8">Selecione um roteiro</h1>
        <div className="flex flex-col text-white w-[80%]">
          {categorias.map((categoria, key) => {
            return (
              <div key={key} className="py-1">
                <div className="flex justify-between rounded-md cursor-pointer p-5 bg-blue-700 items-center font-medium gap-x-2">
                  <h1 className="duration-300 font-bold">{categoria.name}</h1>
                </div>
                <div className={`duration-200 bg-white font-bold pt-1 rounded`}>
                  <div className="bg-blue-500">
                    <ul className="duration-200  font-bold">
                      {categoria.roteiros.map((item, i) => {
                        return (
                          <Link key={i} to={`/dashboard/inspecao/${item.id}`}>
                            <li className="flex items-center hover:bg-blue-700">
                              <ClipboardIcon className="w-8" />
                              {item.name}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Forms;
