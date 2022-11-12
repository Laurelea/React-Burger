import React from 'react';
import PropTypes from 'prop-types';
import { typeOfingredient } from '../../utils/propTypes.js';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import stylesForBurgeringredient from './burger-ingredient.module.css';

function BurgerIngredient(props) {
  return (
    <div
      onClick={() => {
        props.openModal(props.data);
      }}
    >
      <img
        className={`pr-4 pl-4`}
        src={props.data.image}
        alt={props.data.name}
      />
      <div className={`pt-1 pb-1`}>
        <p className={'text text_type_digits-default'}>{props.data.price}</p>
        <CurrencyIcon type={'primary'} />
      </div>
      <p className={'text text_type_main-default'}>{props.data.name}</p>
    </div>
  );
}

// BurgerIngredient.propTypes = {
//   data: PropTypes.arrayOf(typeOfingredient).isRequired,
// };

export default BurgerIngredient;
