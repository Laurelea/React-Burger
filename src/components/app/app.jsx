import { React, useEffect, useState } from 'react';
// import appStyles from './app.module.css';
import { data } from '../../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngridients from '../burger-ingridients/burger-ingridients';
import { AppHeader } from '../app-header/app-header';

function App() {
  return (
    <>
      <AppHeader />
      <BurgerConstructor />
      <BurgerIngridients />
    </>
  );
}

export default App;
