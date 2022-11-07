import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { typeOfIngridient } from '../../utils/propTypes.js';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgerIngridients from './burger-ingridients.module.css';
import { data } from '../../utils/data';

function BurgerIngridients() {
  const [current, setCurrent] = useState('bun');
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

BurgerIngridients.propTypes = {
  data: PropTypes.arrayOf(typeOfIngridient).isRequired,
};

export default BurgerIngridients;
