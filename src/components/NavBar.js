import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="w-screen h-[80px] fixed z-10">
      <div className="px-10 flex text-blue-500  font-bold justify-between items-center w-full h-full">
        <Link to="/">
          <h1 className="flex text-3xl  mr-4 sm:text-4xl">Facility Insp</h1>
        </Link>
        <ul className="flex text-2xl">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/sobre">
            <li>Sobre</li>
          </Link>
          <Link to="/contato">
            <li>Contato</li>
          </Link>
          <Link to="/entrar">
            <button className="py-4 flex text-2xl">Acessar</button>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
