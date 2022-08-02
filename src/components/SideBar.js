import React, { useState } from 'react';
import image from '../assets/control.png';
import logo from '../assets/logo.png';

import {
  ClipboardListIcon,
  CollectionIcon,
  PlusCircleIcon,
  CalendarIcon,
  LogoutIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex float-left ">
      <div
        className={`${
          open ? 'w-72' : 'w-20'
        } duration-200 h-screen p-5 pt-8 bg-blue-500 relative`}
      >
        <img
          src={image}
          alt="/"
          className={`duration-300 absolute overflow-scroll cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-blue-500 ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        />
        <Link to="/dashboard/">
          <div className="flex gap-x-4 items-center">
            <img
              src={logo}
              alt="logo"
              className={`cursor-pointer duration-500 ${
                open && 'rotate-[360deg]'
              }`}
            />
            <h1
              className={`text-white origin-left text-2xl duration-300 font-bold ${
                !open && 'scale-0'
              }`}
            >
              Facility Insp
            </h1>
          </div>
        </Link>
        <ul className="pt-6">
          <Link to="/dashboard/forms">
            <li
              className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
            >
              <ClipboardListIcon className="w-8" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Realizar Inspeção
              </span>
            </li>
          </Link>
          <Link to="/dashboard/insps">
            <li
              className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
            >
              <CollectionIcon className="w-8" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Inspeções Realizadas
              </span>
            </li>
          </Link>
          <li
            className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
          >
            <CalendarIcon className="w-8" />
            <span className={`${!open && 'hidden'} origin-left duration-200`}>
              Inspeções Agendadas
            </span>
          </li>
          <Link to="/dashboard/estabelecimento">
            <li
              className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
            >
              <PlusCircleIcon className="w-8" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Cadastrar Empresa
              </span>
            </li>
          </Link>
          <Link to="/">
            <li
              className={`flex rounded-md p-2 cursor-pointer hover:bg-blue-300 text-white font-medium items-center gap-x-4 mt-2`}
            >
              <LogoutIcon className="w-9" />
              <span className={`${!open && 'hidden'} origin-left duration-200`}>
                Sair
              </span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
