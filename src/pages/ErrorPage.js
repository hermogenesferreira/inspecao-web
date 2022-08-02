import React from 'react';
import HomeLayout from '../components/HomeLayout';
import error from '../assets/error.png';

const ErrorPage = () => {
  return (
    <HomeLayout>
      <div className="grid h-screen place-content-center font-bold text-3xl place-items-center">
        <img src={error} alt="/"></img>
        <p>Página não encontrada</p>
      </div>
    </HomeLayout>
  );
};

export default ErrorPage;
