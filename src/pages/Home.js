import React from 'react';
import { Link } from 'react-router-dom';
import imagem from '../assets/19283.jpg';
import HomeLayout from '../components/HomeLayout';

const Home = () => {
  return (
    <HomeLayout>
      <div className="w-full h-screen flex flex-col justify-between">
        <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
          <div className="flex flex-col justify-center md:items-start px-8">
            <h1 className="py-2 text-3xl md:text-3xl font-bold">
              Facilite as <strong>Inspeções Sanitárias</strong>
            </h1>
            <p className="text-1xl">
              Uilizando o <strong>Facility Insp</strong>, você não precisa
              imprimir formulários, todos eles são disponibilizados online, à um
              clique de distância, você tem acesso a todos os dados a qualquer
              momento, utilize já nossa ferramenta.
            </p>
            <Link to="/cadastrar">
              <button className="py-3 px-10 mt-4 font-bold">Cadastre-se</button>
            </Link>
          </div>
          <div className="w-[85%]">
            <img className="w-full hidden sm:block" src={imagem} alt="imagem" />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
};

export default Home;
