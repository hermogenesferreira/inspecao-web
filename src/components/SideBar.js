import React, { useState } from 'react';
import logo from '../assets/logo.png';

import {
  ClipboardListIcon,
  CollectionIcon,
  PlusCircleIcon,
  CalendarIcon,
  LogoutIcon,
  HomeIcon,
  OfficeBuildingIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';

const SideBar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="flex float-left">
      <div className="flex float-left">
        <div
          className={`w-72 duration-200 fixed left-0 top-0 px-4 h-screen bg-blue-500`}
        >
          <Link to="/dashboard/">
            <div className="flex gap-x-4 items-center">
              <img
                src={logo}
                alt="logo"
                className={`cursor-pointer py-8 px-2 duration-500`}
              />
              <h1
                className={`text-white origin-left text-2xl duration-300 font-bold`}
              >
                Facility Insp
              </h1>
            </div>
          </Link>
          <ul>
            <Link to="/dashboard">
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
              >
                <HomeIcon className="w-8" />
                <span className={`origin-left duration-200`}>
                  Página Inicial
                </span>
              </li>
            </Link>
            <Link to="/dashboard/forms">
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
              >
                <ClipboardListIcon className="w-8" />
                <span className={`origin-left duration-200`}>
                  Realizar Inspeção
                </span>
              </li>
            </Link>
            <Link to="/dashboard/insps">
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
              >
                <CollectionIcon className="w-8" />
                <span className={`origin-left duration-200`}>
                  Inspeções Realizadas
                </span>
              </li>
            </Link>
            <Link to="/dashboard/agendamentos">
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
              >
                <CalendarIcon className="w-8" />
                <span className={`origin-left duration-200`}>Agendamentos</span>
              </li>
            </Link>
            <Link to="/dashboard/estabelecimento">
              <li
                className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
              >
                <OfficeBuildingIcon className="w-8" />
                <span className={`origin-left duration-200`}>Empresas</span>
              </li>
            </Link>
            <li
              className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
              onClick={handleLogout}
            >
              <LogoutIcon className="w-9" />
              <span className={`origin-left duration-200`}>Sair</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
