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
import { data } from '../../utils/data';

function BurgerConstructor() {}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(typeOfingredient).isRequired,
};

export default BurgerConstructor;
