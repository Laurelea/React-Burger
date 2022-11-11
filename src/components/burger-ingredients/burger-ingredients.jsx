import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { typeOfingredient } from '../../utils/propTypes.js';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredients from './burger-ingredients.module.css';
import BurgerIngredient from '../burger-ingredient/burger-ingredient.jsx';

function BurgerIngredients(props) {
  const [current, setCurrent] = useState('bun');

  return (
    <section>
      <h2 className="text text_type_main-large mb-5">Соберите бургер</h2>
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
      <ul className={stylesForBurgeringredients.ingredientsList}>
        <h3>Булки</h3>
        <ul>
          {props.data
            .filter((data) => data.type === 'bun')
            .map((ingredient) => (
              <li key={ingredient._id}>
                <BurgerIngredient data={ingredient} />
              </li>
            ))}
        </ul>
        <h3>Соусы</h3>
        <ul>
          {props.data
            .filter((data) => data.type === 'sauce')
            .map((ingredient) => (
              <li key={ingredient._id}>
                <BurgerIngredient data={ingredient} />
              </li>
            ))}
        </ul>
        <h3>Начинки</h3>
        <ul>
          {props.data
            .filter((data) => data.type === 'main')
            .map((ingredient) => (
              <li key={ingredient._id}>
                <BurgerIngredient data={ingredient} />
              </li>
            ))}
        </ul>
      </ul>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(typeOfingredient).isRequired,
};

export default BurgerIngredients;
