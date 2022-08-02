import { ArrowDownIcon, ClipboardIcon } from '@heroicons/react/outline';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

import api from '../../services/api';

const Insps = () => {
  const [insps, setInsps] = useState([]);

  async function fetchData() {
    await api.get('/inspecao').then((response) => {
      setInsps(response.data);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col pl-8 pt-20">
        <h1 className="font-bold text-2xl pb-8">Inspeções Realizadas:</h1>
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
                    <th className="border border-slate-300 ...">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {insps.map((item, key) => (
                    <tr key={key}>
                      <td className="text-center border ">{item.id}</td>
                      <td className="border px-2 hover:bg-blue-800">
                        <Link to={`/dashboard/insp/${item.id}`}>
                          {item.estabelecimento.nomeFantasia}
                        </Link>
                      </td>
                      <td className="text-center border">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Insps;
