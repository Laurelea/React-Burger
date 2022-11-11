import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { typeOfingredient } from '../../utils/propTypes.js';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgerConstructor from './burger-constructor.module.css';

function BurgerConstructor(props) {
  return (
    <section className={stylesForBurgerConstructor.list}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={props.data[0].image}
      />
      <ul>
        {props.data.slice(1).map((ingredient) => (
          <li key={ingredient._id}>
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={props.data[0].image}
      />
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(typeOfingredient).isRequired,
};

export default BurgerConstructor;
