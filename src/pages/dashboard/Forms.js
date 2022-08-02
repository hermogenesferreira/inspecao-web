import { ArrowDownIcon, ClipboardIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import api from '../../services/api';

const Forms = () => {
  const [forms, setForms] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState([]);

  async function formsPorCategoria() {
    await api.get(`forms/${categoria._id}`).then((response) => {
      setForms(response.data);
      console.log();
    });
  }

  const handleChange = (e) => {
    console.log(e.target.value);
    setCategoria(e.target.value);
  };

  useEffect(() => {
    api.get('categorias/').then((response) => {
      setCategorias(response.data);
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    api.get(`roteiro`).then((response) => {
      setForms(response.data);
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col pl-8 pt-20">
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
                          <Link to={`/dashboard/inspecao/${item.id}`}>
                            <li
                              key={i}
                              className="flex items-center hover:bg-blue-700"
                            >
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
