import { React, useEffect, useState } from 'react';
// import appStyles from './app.module.css';
import { data } from '../../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Burgeringredients from '../burger-ingredients/burger-ingredients';
import { AppHeader } from '../app-header/app-header';

function App() {
  return (
    <>
      <AppHeader />
      <BurgerConstructor />
      <Burgeringredients data={data} />
    </>
  );
}

export default App;
